/* ============ GitHub API helpers (editor.html theke use hoy) ============ */

const GH = {
  /* session token lives only in memory (admin page sets it after login) */
  _session: "",
  setSessionToken(t) { this._session = t || ""; },

  repo: () => localStorage.getItem("cb_repo") || "",
  token() { return this._session || localStorage.getItem("cb_token") || ""; },
  branch: () => localStorage.getItem("cb_branch") || "",

  save(repo, token, branch) {
    localStorage.setItem("cb_repo", repo.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, ""));
    localStorage.setItem("cb_token", token.trim());
    if (branch) localStorage.setItem("cb_branch", branch.trim());
  },

  configured() { return !!(this.repo() && this.token()); },

  ownerRepo() { return this.repo().split("/"); },

  async api(path, opts = {}) {
    const headers = {
      "Accept": "application/vnd.github+json",
      "Authorization": "Bearer " + this.token(),
    };
    if (opts.body) headers["Content-Type"] = "application/json";
    const r = await fetch("https://api.github.com" + path, { ...opts, headers, cache: "no-store" });
    if (r.status === 401) throw new Error("Token bhul ba expired (401). Notun token banao abar.");
    if (r.status === 403) throw new Error("Permission nei (403) — token e 'Contents: Read and write' ache kina check koro.");
    if (r.status === 404 && opts.expect404) return null;
    if (!r.ok) {
      let msg = "HTTP " + r.status;
      try { msg += ": " + (await r.json()).message; } catch (e) {}
      throw new Error(msg);
    }
    return r.json();
  },

  async defaultBranch() {
    if (this.branch()) return this.branch();
    const [o, r] = this.ownerRepo();
    const info = await this.api("/repos/" + o + "/" + r);
    const b = info.default_branch || "main";
    localStorage.setItem("cb_branch", b);
    return b;
  },

  b64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin);
  },

  unb64(b64) {
    const bin = atob(b64.replace(/\n/g, ""));
    const bytes = new Uint8Array([...bin].map(c => c.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
  },

  /* file content + sha read koro (na thakle null) */
  async getFile(path) {
    const [o, r] = this.ownerRepo();
    const branch = await this.defaultBranch();
    const res = await this.api("/repos/" + o + "/" + r + "/contents/" + path + "?ref=" + branch, { expect404: true });
    if (!res) return null;
    return { sha: res.sha, text: res.encoding === "base64" ? this.unb64(res.content) : res.content };
  },

  /* wait out GitHub's short read-after-write lag */
  sleep(ms) { return new Promise(r => setTimeout(r, ms)); },

  /* file create/update (retries once on sha conflict) */
  async putFile(path, text, message) {
    const [o, r] = this.ownerRepo();
    const branch = await this.defaultBranch();
    const url = "/repos/" + o + "/" + r + "/contents/" + path;
    for (let attempt = 0; ; attempt++) {
      const existing = await this.api(url + "?ref=" + branch, { expect404: true });
      const body = { message, content: this.b64(text), branch };
      if (existing) body.sha = existing.sha;
      try {
        return await this.api(url, { method: "PUT", body: JSON.stringify(body) });
      } catch (e) {
        if (String(e.message).includes("409") && attempt < 2) { await this.sleep(1500); continue; }
        throw e;
      }
    }
  },

  /* file delete (returns false if it was already gone) */
  async deleteFile(path, message) {
    const [o, r] = this.ownerRepo();
    const branch = await this.defaultBranch();
    const url = "/repos/" + o + "/" + r + "/contents/" + path;
    for (let attempt = 0; ; attempt++) {
      const existing = await this.api(url + "?ref=" + branch, { expect404: true });
      if (!existing) return false;
      try {
        return await this.api(url, {
          method: "DELETE",
          body: JSON.stringify({ message, sha: existing.sha, branch }),
        });
      } catch (e) {
        if (String(e.message).includes("409") && attempt < 2) { await this.sleep(1500); continue; }
        throw e;
      }
    }
  },

  async test() {
    const [o, r] = this.ownerRepo();
    const info = await this.api("/repos/" + o + "/" + r);
    await this.defaultBranch();
    return info.full_name;
  },
};
