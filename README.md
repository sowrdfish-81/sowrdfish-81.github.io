# concepts_ — personal DSA/CP blog

A dark minimal blog with a GitHub-style activity heatmap. Fully static (plain HTML/JS, no build tools), hosted free on GitHub Pages.

**Live site:** https://sowrdfish-81.github.io/
**Write posts at:** https://sowrdfish-81.github.io/admin/ (password login — the public site has no posting option)

## How it works

- `posts/index.json` — the list of posts (title, date, tags, description)
- `posts/*.md` — one file per post, written in markdown
- `activity.json` — daily problem-solving counts for the heatmap
- `admin/index.html` — the private admin page (password + GitHub token)
- `app.js` — markdown renderer, heatmap, post list
- `github.js` — GitHub API calls used by the admin page

## First-time setup (per browser, ~2 minutes)

The site is static, so publishing happens straight from your browser to GitHub with a token:

1. Open https://sowrdfish-81.github.io/admin/
2. Create a token at [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new):
   - Name: `blog-editor`, Expiration: 1 year
   - **Repository access → Only select repositories** → pick this repo
   - **Permissions → Repository permissions → Contents → Read and write**
   - Generate token, copy it (`github_pat_...`)
3. In the admin setup form: repo (`username/repo`), paste the token, choose a password → **Save & continue**

The token is stored **encrypted with your password** (AES-GCM via WebCrypto) in this browser's localStorage. It never leaves your device except to call the GitHub API on publish. Repeat this once on any new browser/device. Forgot the password? Use "Reset admin" on the login page and paste the token again.

## Daily use

- **Learned a concept** → open `/admin/`, log in with your password, write the post, **Publish**. That day turns green on the heatmap automatically.
- **Edit or delete a post** → admin → **All posts** tab → **Edit** / **Delete** next to the post.
- **Solved problems without writing a post** → admin → **Practice log** tab → date + count → **Log it**.
- No activity that day → the box stays grey.

## Notes

- New posts go live 1–2 minutes after publishing (GitHub Pages cache).
- Two posts with the same title on the same day are handled automatically (`-2`, `-3`, ... in the filename).
- The admin page is `noindex` and not linked anywhere public — don't share the URL + password together. Anyone can *open* the page, but without your password they cannot get the token, so they cannot publish.
- To change the name/tagline/about: edit `index.html` (site title, hero tagline, about section) and the `concepts_` text in the headers.
