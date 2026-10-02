/* ============ shared helpers ============ */

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMd(s) {
  return s
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function md(src) {
  const lines = esc(src.replace(/\r\n/g, "\n")).split("\n");
  let out = "", inCode = false, codeBuf = [], listBuf = null, olBuf = null;
  const flushList = () => {
    if (listBuf) {
      out += "<ul>" + listBuf.map(x => "<li>" + inlineMd(x) + "</li>").join("") + "</ul>";
      listBuf = null;
    }
    if (olBuf) {
      out += "<ol>" + olBuf.map(x => "<li>" + inlineMd(x) + "</li>").join("") + "</ol>";
      olBuf = null;
    }
  };
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      if (inCode) { out += "<pre><code>" + codeBuf.join("\n") + "</code></pre>"; codeBuf = []; inCode = false; }
      else { flushList(); inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    let m;
    if ((m = line.match(/^###\s*(.*)/))) { flushList(); out += "<h3>" + inlineMd(m[1]) + "</h3>"; }
    else if ((m = line.match(/^##\s*(.*)/))) { flushList(); out += "<h2>" + inlineMd(m[1]) + "</h2>"; }
    else if ((m = line.match(/^#\s*(.*)/))) { flushList(); out += "<h1>" + inlineMd(m[1]) + "</h1>"; }
    else if ((m = line.match(/^[-*]\s+(.*)/))) { if (olBuf) flushList(); if (!listBuf) listBuf = []; listBuf.push(m[1]); }
    else if ((m = line.match(/^\d+[.)]\s+(.*)/))) { if (listBuf) flushList(); if (!olBuf) olBuf = []; olBuf.push(m[1]); }
    else if (line.trim() === "") { flushList(); }
    else { flushList(); out += "<p>" + inlineMd(line) + "</p>"; }
  }
  flushList();
  if (inCode) out += "<pre><code>" + codeBuf.join("\n") + "</code></pre>";
  return out;
}

function stripMd(s) {
  return s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(t) {
  return String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "post";
}

function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function readMinutes(text) {
  return Math.max(1, Math.round((stripMd(text).split(/\s+/).length) / 200));
}

function chipHtml(tags) {
  return (tags || []).map(t => '<span class="chip">' + esc(t) + '</span>').join(" ");
}

/* ============ data loading ============ */

async function loadIndex() {
  try {
    const r = await fetch("posts/index.json", { cache: "no-store" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch (e) { return []; }
}

async function loadActivity() {
  try {
    const r = await fetch("activity.json", { cache: "no-store" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch (e) { return {}; }
}

/* ============ heatmap ============ */

const D = n => new Date(n.getFullYear(), n.getMonth(), n.getDate());

function buildHeatmap(posts, activity) {
  const gridEl = document.getElementById("heatmap-grid");
  const monthsEl = document.getElementById("heatmap-months");
  if (!gridEl) return;

  // count per day: 1 per post + practice log
  const counts = {};
  const postCnt = {}, actCnt = {};
  for (const p of posts) postCnt[p.date] = (postCnt[p.date] || 0) + 1;
  for (const [d, c] of Object.entries(activity || {})) actCnt[d] = c;
  for (const [d, c] of Object.entries(postCnt)) counts[d] = (counts[d] || 0) + c;
  for (const [d, c] of Object.entries(actCnt)) counts[d] = (counts[d] || 0) + c;

  const today = D(new Date());
  const start = D(today); start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // back to Sunday

  // GitHub-style absolute levels: 1 = light green, 4+ = brightest
  const level = c => c === 0 ? 0 : Math.min(4, c);

  // streaks
  const active = d => (counts[d] || 0) > 0;
  const key = dt => dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  let cur = 0, curDate = D(today);
  if (!active(key(curDate))) curDate.setDate(curDate.getDate() - 1);
  while (active(key(curDate))) { cur++; curDate.setDate(curDate.getDate() - 1); }
  let best = 0, run = 0;
  const scan = D(start);
  while (scan <= today) { if (active(key(scan))) { run++; best = Math.max(best, run); } else run = 0; scan.setDate(scan.getDate() + 1); }

  const statsEl = document.getElementById("stats");
  if (statsEl) {
    const total = Object.values(actCnt).reduce((a, b) => a + b, 0);
    statsEl.innerHTML =
      "<span><b>" + posts.length + "</b> posts</span>" +
      "<span><b>" + total + "</b> problems logged</span>" +
      "<span><b>" + cur + "</b> day streak</span>" +
      "<span><b>" + best + "</b> best streak</span>";
  }

  // grid cells + month labels
  let html = "", mHtml = "", prevMonth = -1, lastLabelW = -9;
  const scanD = D(start);
  for (let w = 0; w < 53; w++) {
    const m = scanD.getMonth();
    if (m !== prevMonth) {
      if (prevMonth !== -1 && w < 51 && w - lastLabelW >= 6) {
        mHtml += "<div>" + scanD.toLocaleDateString("en-US", { month: "short" }) + "</div>";
        lastLabelW = w;
      } else {
        mHtml += "<div></div>";
      }
      prevMonth = m;
    }
    for (let r = 0; r < 7; r++) {
      const k = key(scanD);
      if (scanD > today) {
        html += '<span class="cell future"></span>';
      } else {
        const c = counts[k] || 0, lv = level(c);
        const tip = [];
        if (postCnt[k]) tip.push(postCnt[k] + (postCnt[k] > 1 ? " posts" : " post"));
        if (actCnt[k]) tip.push(actCnt[k] + (actCnt[k] > 1 ? " problems" : " problem"));
        html += '<span class="cell' + (lv ? " l" + lv : "") + '" data-tip="' +
          (tip.length ? esc(tip.join(" • ")) : "no activity") + " — " + fmtDate(k) + '"></span>';
      }
      scanD.setDate(scanD.getDate() + 1);
    }
  }
  gridEl.innerHTML = html;
  monthsEl.innerHTML = mHtml;

  // tooltip
  const tipEl = document.getElementById("tooltip");
  gridEl.addEventListener("mousemove", e => {
    const t = e.target.getAttribute("data-tip");
    if (!t) { tipEl.style.display = "none"; return; }
    tipEl.textContent = t;
    tipEl.style.display = "block";
    const x = Math.min(e.clientX + 12, window.innerWidth - tipEl.offsetWidth - 8);
    tipEl.style.left = x + "px";
    tipEl.style.top = (e.clientY - 30) + "px";
  });
  gridEl.addEventListener("mouseleave", () => { tipEl.style.display = "none"; });
}

/* ============ post list ============ */

function renderPostList(posts) {
  const el = document.getElementById("post-list");
  if (!el) return;
  if (!posts.length) {
    el.innerHTML = '<p class="post-desc">No posts yet — new concepts will appear here soon.</p>';
    return;
  }
  el.innerHTML = posts.map(p => {
    const link = "post.html?p=" + encodeURIComponent(p.slug);
    return '<article class="post-item">' +
      '<div class="post-meta"><span>' + fmtDate(p.date) + '</span>' +
      '<span class="cat">' + esc(p.category || "concept") + '</span>' +
      chipHtml(p.tags) +
      '<span>' + (p.minutes || 1) + ' min read</span></div>' +
      '<h3><a href="' + link + '">' + esc(p.title) + '</a></h3>' +
      '<p class="post-desc">' + esc((p.description || "").slice(0, 170)) + '</p>' +
      '<a class="readmore" href="' + link + '">read -&gt;</a>' +
      '</article>';
  }).join("");
}

/* ============ post page ============ */

async function renderPostPage() {
  const wrapEl = document.getElementById("post-body");
  const params = new URLSearchParams(location.search);
  const slug = params.get("p");
  const posts = await loadIndex();
  const meta = posts.find(p => p.slug === slug);
  if (!meta) {
    document.getElementById("post-head").innerHTML =
      '<a class="back" href="index.html">&larr; all posts</a><h1 class="title">post not found</h1>';
    wrapEl.innerHTML = "<p>This post is gone, or the link is wrong.</p>";
    return;
  }
  document.title = meta.title + " — concepts_";
  document.getElementById("post-head").innerHTML =
    '<a class="back" href="index.html">&larr; all posts</a>' +
    '<h1 class="title">' + esc(meta.title) + '</h1>' +
    '<div class="post-meta"><span>' + fmtDate(meta.date) + '</span>' + chipHtml(meta.tags) + '</div>';
  try {
    const r = await fetch("posts/" + meta.file, { cache: "no-store" });
    const text = await r.text();
    wrapEl.innerHTML = md(text);
  } catch (e) {
    wrapEl.innerHTML = "<p>Could not load this post.</p>";
  }
}

/* ============ index page boot ============ */

async function bootIndex() {
  const [posts, activity] = await Promise.all([loadIndex(), loadActivity()]);
  posts.sort((a, b) => b.date.localeCompare(a.date));
  renderPostList(posts);
  buildHeatmap(posts, activity);
}
