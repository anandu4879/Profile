const D = DATA, P = D.projects, $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
const W = 124, H = 46;
let cur = P[0], steps = D.pipeline, busy = false;

/* ---------- static sections from data ---------- */
document.title = `${D.profile.name}, ${D.profile.role}`;
$("#hn").textContent = D.profile.name;
$("#sum").textContent = D.profile.plain;
$("#h1").innerHTML = `Hi, I'm ${D.profile.name.split(" ")[0]}.<span>A ${D.profile.role.toLowerCase()} from ${D.profile.location}.</span>`;
$("#st").textContent = "Open to work in " + D.profile.available;
$("#mail").href = "mailto:" + D.profile.email;
$("#does").innerHTML = D.does.map(d => `<div><h3>${d.h}</h3><p>${d.p}</p><small>${d.tech}</small></div>`).join("");
$("#stk").innerHTML = Object.entries(D.skills).map(([k, v]) => `<div><h3>${k}</h3><p>${v}</p></div>`).join("");
$("#path").innerHTML = D.certs.map(c => `<div><span>${c.status}</span><b>${c.name}</b><p>${c.note || ""}</p></div>`).join("");
$("#ct").innerHTML = `Hiring for DevOps or cloud?<br><a href="mailto:${D.profile.email}">${D.profile.email}</a>
  <small><a href="${D.profile.github}">GitHub</a> &nbsp; <a href="${D.profile.linkedin}">LinkedIn</a> &nbsp; <a href="${D.profile.resume}">Resume PDF</a></small>`;
$("#ft").textContent = `${D.profile.name}, ${new Date().getFullYear()}. Plain HTML, hosted on Vercel.`;
$("#plist").innerHTML = P.map(p => `<div class="proj"><time>${p.kind}</time><div><h3>${p.title}</h3><p>${p.summary}</p>
  <div class="s">${p.stack.join(", ")}</div>
  <div class="l"><button data-id="${p.id}">See architecture</button>${p.repo ? `<a href="${p.repo}">Code</a>` : ""}${p.demo ? `<a href="${p.demo}">Live demo</a>` : ""}</div></div></div>`).join("");
$("#plist").onclick = e => { const b = e.target.closest("button"); if (b) { pick(b.dataset.id); $("#top").scrollIntoView(); } };
$("#rs").innerHTML = `<h3>${D.profile.name}</h3><p>${D.profile.role}, ${D.profile.location}. ${D.profile.email}, ${D.profile.github.replace("https://", "")}</p>
  <h4>Summary</h4><p>${D.profile.summary}</p>
  <h4>Experience</h4>${D.experience.map(e => `<div class="r"><span>${e.role}, ${e.org}</span><span>${e.period}</span></div><ul>${e.points.map(x => `<li>${x}</li>`).join("")}</ul>`).join("")}
  <h4>Projects</h4><ul>${P.map(p => `<li><b>${p.title}.</b> ${p.summary} (${p.stack.join(", ")})</li>`).join("")}</ul>
  <h4>Skills</h4><ul>${Object.entries(D.skills).map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`).join("")}</ul>
  <h4>Certifications</h4><ul>${D.certs.map(c => `<li>${c.name} (${c.status})</li>`).join("")}</ul>`;
$("#pr").onclick = () => { document.body.classList.add("pr"); print(); };
addEventListener("afterprint", () => document.body.classList.remove("pr"));

/* ---------- interactive architecture map ---------- */
function tabs() {
  $("#tabs").innerHTML = P.map(p => `<button role="tab" data-id="${p.id}" class="${p.id === cur.id ? "on" : ""}">${p.title.split(":")[0]}</button>`).join("");
}
$("#tabs").onclick = e => { const b = e.target.closest("button"); if (b) pick(b.dataset.id); };
function pick(id) {
  cur = P.find(p => p.id === id) || cur;
  steps = cur.pipeline || D.pipeline;
  tabs(); map(); resetPipe();
  $("#plain").innerHTML = "<b>In plain words:</b> " + (cur.plain || cur.summary);
}
function map() {
  const N = cur.nodes, svg = $("#map"); let h = "";
  cur.edges.forEach(([a, b, c = ""], i) => {
    const A = N[a], B = N[b]; let x1 = A.x, y1 = A.y, x2 = B.x, y2 = B.y;
    const dx = B.x - A.x, dy = B.y - A.y;
    if (Math.abs(dx) >= Math.abs(dy)) { const s = Math.sign(dx); x1 += s * W / 2; x2 -= s * W / 2; }
    else { const s = Math.sign(dy); y1 += s * H / 2; y2 -= s * H / 2; }
    const p = `M${x1},${y1} L${x2},${y2}`;
    h += `<path class="edge ${c}" d="${p}"/>`;
    if (!c) for (let j = 0; j < 3; j++) h += `<circle class="pk" r="4"><animateMotion dur="2.4s" begin="${j * .8 + i * .25}s" repeatCount="indefinite" path="${p}"/></circle>`;
  });
  for (const k in N) { const n = N[k];
    h += `<g class="node" tabindex="0" role="button" data-k="${k}"><rect x="${n.x - W / 2}" y="${n.y - H / 2}" width="${W}" height="${H}" rx="6"/><text x="${n.x}" y="${n.y + 5}">${n.l}</text></g>`; }
  svg.innerHTML = h;
  if (reduce) svg.pauseAnimations();
  show(Object.keys(N)[1] || Object.keys(N)[0]);
}
function show(k) {
  const n = cur.nodes[k];
  document.querySelectorAll(".node").forEach(g => g.classList.toggle("on", g.dataset.k === k));
  $("#it").textContent = n.t; $("#id").textContent = n.d; $("#ic").textContent = n.c;
}
$("#map").addEventListener("click", e => { const g = e.target.closest(".node"); if (g) show(g.dataset.k); });
$("#map").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { const g = e.target.closest(".node"); if (g) { e.preventDefault(); show(g.dataset.k); } }
});

/* ---------- pipeline demo ---------- */
const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
function resetPipe() {
  if (busy) return;
  $("#steps").innerHTML = steps.map(s => `<li>${s[0]}</li>`).join("");
  $("#log").textContent = `Simulated run for ${cur.title}. Press the button.`;
  $("#go").textContent = "Run the pipeline";
}
$("#go").onclick = async () => {
  const go = $("#go"), lg = $("#log"), L = $("#steps").children;
  busy = true; go.disabled = true; lg.textContent = ""; for (const l of L) l.className = "";
  for (let i = 0; i < steps.length; i++) {
    L[i].className = "run"; lg.textContent += `$ ${steps[i][0].toLowerCase()}\n`; lg.scrollTop = 1e5;
    await wait(650);
    lg.textContent += steps[i][1] + "\n\n"; lg.scrollTop = 1e5; L[i].className = "ok"; await wait(250);
  }
  lg.textContent += "Pipeline passed. Deployed.\n";
  busy = false; go.disabled = false; go.textContent = "Run it again";
};

/* ---------- terminal ---------- */
const out = $("#tout"), inp = $("#tin"), hist = []; let hi = 0;
const say = (t, c) => { const d = document.createElement("div"); d.textContent = t; if (c) d.className = c; out.appendChild(d); out.scrollTop = out.scrollHeight; };
const CMD = {
  help: () => "whoami, projects, open <id>, skills, certs, experience, resume, contact, clear",
  whoami: () => `${D.profile.name}. ${D.profile.role}, ${D.profile.location}. Open to roles in ${D.profile.available}.`,
  projects: () => P.map(p => `${p.id.padEnd(14)} ${p.title}`).join("\n"),
  open: a => { const p = P.find(x => x.id === a); if (!p) return "unknown id. Run projects to list them."; pick(p.id); $("#top").scrollIntoView(); return "opened " + p.title; },
  skills: () => Object.entries(D.skills).map(([k, v]) => `${k}: ${v}`).join("\n"),
  certs: () => D.certs.map(c => `${c.name} (${c.status})`).join("\n"),
  experience: () => D.experience.map(e => `${e.role}, ${e.org}\n  ${e.points.join("\n  ")}`).join("\n"),
  resume: () => { $("#resume").scrollIntoView(); return "scrolling to the resume"; },
  contact: () => `${D.profile.email}\n${D.profile.github}\n${D.profile.linkedin}`,
  clear: () => { out.textContent = ""; return ""; },
  sudo: () => "Nice try. Email me instead."
};
inp.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") { hi = Math.max(0, hi - 1); inp.value = hist[hi] || ""; e.preventDefault(); return; }
  if (e.key !== "Enter") return;
  const v = inp.value.trim(); inp.value = ""; if (!v) return;
  hist.push(v); hi = hist.length; say("$ " + v, "c");
  const [c, ...a] = v.split(/\s+/), f = CMD[c.toLowerCase()];
  const r = f ? f(a.join(" ")) : `command not found: ${c}. Try help.`;
  if (r) say(r);
});
addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#terminal").scrollIntoView(); inp.focus(); } });
say("Type help to see what you can ask.");

pick(P[0].id);

/* ---------- typed intro on the home page ---------- */
(async () => {
  const el = $("#boot"); let skip = false;
  $("#bt").onclick = () => skip = true;
  const w = ms => wait(skip ? 0 : ms);
  for (const [cmd, ans] of D.boot) {
    const l = document.createElement("div");
    l.innerHTML = '<span class="pm">$ </span><span class="cm"></span>';
    el.appendChild(l); const cm = l.querySelector(".cm"); l.classList.add("cur");
    for (const ch of cmd) { cm.textContent += ch; await w(70); }
    await w(260); l.classList.remove("cur");
    const o = document.createElement("div"); o.className = "ou"; el.appendChild(o);
    for (const ch of ans) { o.textContent += ch; await w(16); }
    await w(380);
  }
  const last = document.createElement("div"); last.innerHTML = '<span class="pm">$ </span>'; last.classList.add("cur"); el.appendChild(last);
})();
