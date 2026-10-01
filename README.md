# concepts_ — personal DSA/CP blog

Dark minimal blog + GitHub-style activity heatmap. Post likha jay **site er nijer editor theke** — GitHub e giye kichu edit korte hobe na.

## Puro setup (ekbar) — 5 minute

### Step 1 — Repo banao

1. [github.com/new](https://github.com/new) e jao
2. Repository name: **`<tumi-username>.github.io`** (jemon `sowrdfish-81.github.io`) — exactly ei format, tahole site thabe `https://<username>.github.io/`
3. **Public** + **Add a README** unchecked rekhe → **Create repository**

### Step 2 — File upload koro

1. Repo page e **"uploading an existing file"** link e click koro (ba *Add file → Upload files*)
2. Ei folder er 6 ta file drag kore felo: `index.html`, `post.html`, `editor.html`, `style.css`, `app.js`, `github.js` + `activity.json` + puro `posts/` folder
3. **Commit changes** chapo
4. 1 minute por `https://<username>.github.io/` e site dekhbe

### Step 3 — Editor er jonno token (ekbar, 2 min)

Post **site theke publish** korte hole GitHub ekta token dibe (eta diye site tumarpokher hoye repo te post file upload kore):

1. Ei link e jao: [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)
2. Token name: `blog-editor`, Expiration: 1 year (ba jeta chao)
3. **Repository access → Only select repositories** → tomar blog repo select koro
4. **Permissions → Repository permissions → Contents → Read and write** set koro
5. **Generate token** → token copy koro (`github_pat_...` diye shuru hobe)
6. Tomar site e jao: `https://<username>.github.io/editor.html`
7. **Setup** box e: repo name (`username/repo`) + token paste → **Save & Test** → "OK! Connected" dekhle done

Er por theke jekono device/browser e `editor.html` khule likhe **Publish** chaplei post site e upload hoye jabe. Token shudhu oi browser er localStorage e thake.

## Roz roz korbe

- **Notun concept shikhle**: site e `+ new post` → likho → Publish (oi din automatic heatmap e green)
- **Shudhu problem solve korle (post na likhe)**: `editor.html` → **practice log** tab → date + koyta problem → Log koro
- Site dekhte: `https://<username>.github.io/`

## Name/tagline change korte chaile

`index.html` khule edit koro (GitHub website thekeo para jay, pencil icon e click):

- Logo/heading: `concepts_` (sob jaygay search kore replace)
- Tagline: `hero` section er `<p class="tagline">` line
- Footer er username + GitHub link

## File structure

```
index.html          → home (heatmap + post list)
post.html?p=<slug>  → single post
editor.html         → post likhar page (+ practice log + setup)
app.js              → markdown renderer + heatmap + list
github.js           → GitHub API (publish er jonno)
style.css           → theme
posts/index.json    → post list index (editor automatic update kore)
posts/*.md          → ek post = ek file
activity.json       → problem-solve log (heatmap er data)
```
