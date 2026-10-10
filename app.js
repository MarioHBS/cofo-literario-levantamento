(function () {
  "use strict";
  const CFG = window.CONFIG, GUIA = window.GUIA, OPTS = window.OPTS || {};
  const ORDER = ["A", "D", "B", "F", "C", "E", "G", "H", "O", "I", "J", "K", "L", "M"];
  const PRIO_ORDER = { "Bloqueia": 0, "Importante": 1, "Depois": 2 };
  const PRIO_LABEL = { "Bloqueia": "Prioridade alta", "Importante": "Importante", "Depois": "Pode esperar" };
  const PRIO_CLASS = { "Bloqueia": "b-bloqueia", "Importante": "b-importante", "Depois": "b-depois" };
  const EFFORT = { P: 1, M: 2, G: 4 };
  const EFFORT_LABEL = { P: "pequeno", M: "médio", G: "grande" };

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ---------- dados mesclados ----------
  const sections = ORDER.map((id) => GUIA.sections.find((s) => s.id === id)).filter(Boolean).map((s) => {
    const qs = s.questions.map((q) => Object.assign({}, q, { sec: s.id }, OPTS[q.id] || {}));
    (window.NEW_QUESTIONS || []).filter((n) => n.sec === s.id).forEach((n) => {
      const idx = qs.findIndex((q) => q.id === n.after);
      qs.splice(idx < 0 ? qs.length : idx + 1, 0, Object.assign({}, n, { isNew: true }));
    });
    return Object.assign({}, s, { questions: qs });
  });
  const allQs = sections.flatMap((s) => s.questions);
  const byId = Object.fromEntries(allQs.map((q) => [q.id, q]));

  // ---------- estado ----------
  let state = { answers: {}, who: { name: "", contact: "" }, authorize: {} };
  try {
    const raw = localStorage.getItem(CFG.STORAGE_KEY);
    if (raw) state = Object.assign(state, JSON.parse(raw));
  } catch (e) { /* sem armazenamento: segue em memória */ }
  function save() { try { localStorage.setItem(CFG.STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }

  const ans = (id) => state.answers[id] || {};
  function isAnswered(q) {
    if (q.sec === "M") return false;
    const a = ans(q.id);
    const hasV = Array.isArray(a.v) ? a.v.length > 0 : !!a.v;
    return hasV || !!(a.text && a.text.trim()) || !!(a.note && a.note.trim());
  }
  const countable = allQs.filter((q) => q.sec !== "M");
  function labelsOf(q) {
    const a = ans(q.id);
    const vals = Array.isArray(a.v) ? a.v : a.v ? [a.v] : [];
    return vals.map((v) => { const o = (q.o || []).find((x) => x[0] === v); return o ? o[1] : v; });
  }
  function prevText(q) { return (q.ans || "").trim(); }

  // ---------- render: perguntas ----------
  function renderKnown() {
    $("#known-list").innerHTML = GUIA.known.map((k) => `<li>${esc(k[0])} <small>(${esc(k[1])})</small></li>`).join("");
  }

  function renderOption(q, o) {
    const a = ans(q.id), type = q.t === "multi" ? "checkbox" : "radio";
    const checked = Array.isArray(a.v) ? a.v.includes(o[0]) : a.v === o[0];
    return `<label class="opt ${checked ? "on" : ""}"><input type="${type}" name="${q.id}" value="${esc(o[0])}" ${checked ? "checked" : ""}><span>${esc(o[1])}</span></label>`;
  }

  function impactHtml(q) {
    const a = ans(q.id);
    const vals = Array.isArray(a.v) ? a.v : a.v ? [a.v] : [];
    const lines = vals.map((v) => (q.o || []).find((x) => x[0] === v)).filter((o) => o && o[2]).map((o) => o[2]);
    return lines.length ? `<p class="impact"><strong>O que isso muda no site:</strong> ${lines.map(esc).join(" ")}</p>` : "";
  }

  function renderQuestion(q) {
    const a = ans(q.id), isText = !q.o;
    const prev = prevText(q);
    let body = "";
    if (q.o) {
      body += `<div class="opts" role="${q.t === "multi" ? "group" : "radiogroup"}">${q.o.map((o) => renderOption(q, o)).join("")}</div>`;
      body += `<label class="note"><span>Quer explicar ou dar outra resposta?</span><textarea data-field="note" rows="2" placeholder="Escreva aqui, se quiser">${esc(a.note || "")}</textarea></label>`;
    } else {
      const val = a.text != null ? a.text : prev;
      body += `<label class="note full"><span class="sr">Sua resposta</span><textarea data-field="text" rows="3" placeholder="Escreva aqui">${esc(val)}</textarea></label>`;
    }
    const prevBox = prev && q.o ? `<p class="prev">Anotado na nossa conversa: <q>${esc(prev)}</q></p>` : "";
    return `<article class="q ${isAnswered(q) ? "done" : ""}" id="q-${q.id}" data-q="${q.id}">
      <header>
        <span class="qid">${q.id}</span>
        <span class="badge ${PRIO_CLASS[q.prio] || ""}">${esc(PRIO_LABEL[q.prio] || q.prio)}</span>
        ${q.isNew ? '<span class="badge b-new">Nova</span>' : ""}
      </header>
      <h4>${esc(q.q).replace(/\n\n/g, "<br><br>")}</h4>
      <p class="why">${esc(q.why)}</p>
      ${prevBox}
      ${body}
      <div class="impact-slot">${impactHtml(q)}</div>
    </article>`;
  }

  function renderMSection(s) {
    const groups = {};
    s.questions.forEach((q) => { (groups[q.who] = groups[q.who] || []).push(q); });
    return Object.entries(groups).map(([who, qs]) => {
      const key = who.replace(/\s*\(.*\)/, "");
      const au = state.authorize[key] || {};
      return `<article class="q m-card" data-m="${esc(key)}">
        <h4>${esc(who)}</h4>
        <p class="why">Eu vou perguntar isto a essa pessoa. Você só precisa autorizar e passar o contato.</p>
        <ul class="mlist">${qs.map((q) => `<li>${esc(q.q)}</li>`).join("")}</ul>
        <label class="opt ${au.ok ? "on" : ""}"><input type="checkbox" data-auth="${esc(key)}" ${au.ok ? "checked" : ""}><span>Autorizo falar com esse profissional</span></label>
        <label class="note"><span>Nome e telefone/e-mail dele(a)</span><textarea data-auth-contact="${esc(key)}" rows="2">${esc(au.contact || "")}</textarea></label>
      </article>`;
    }).join("");
  }

  function sectionProgress(s) {
    if (s.id === "M") return { done: Object.values(state.authorize).filter((a) => a.ok).length, total: 3 };
    const qs = s.questions;
    return { done: qs.filter(isAnswered).length, total: qs.length };
  }

  function renderSections() {
    const open = new Set($$("#sections details[open]").map((d) => d.dataset.sec));
    const first = !$("#sections").children.length;
    $("#sections").innerHTML = sections.map((s, i) => {
      const p = sectionProgress(s);
      const qs = s.id === "M" ? [] : s.questions.slice().sort((a, b) => PRIO_ORDER[a.prio] - PRIO_ORDER[b.prio]);
      const isOpen = first ? i === 0 : open.has(s.id);
      return `<details class="sec" data-sec="${s.id}" ${isOpen ? "open" : ""}>
        <summary><span class="sec-title">${esc(s.title)}</span><span class="sec-prog" data-prog="${s.id}">${p.done}/${p.total}</span></summary>
        <p class="intro">${esc(s.intro)}</p>
        ${s.id === "M" ? renderMSection(s) : qs.map(renderQuestion).join("")}
      </details>`;
    }).join("");
  }

  function updateProgress() {
    const done = countable.filter(isAnswered).length;
    const pct = Math.round((done / countable.length) * 100);
    $("#overall-bar").style.width = pct + "%";
    $("#overall-label").textContent = `${pct}% respondido (${done} de ${countable.length})`;
    sections.forEach((s) => {
      const el = $(`[data-prog="${s.id}"]`);
      if (el) { const p = sectionProgress(s); el.textContent = `${p.done}/${p.total}`; }
    });
  }

  // ---------- decisões / mapa ----------
  function chosen(opt) {
    return Object.entries(opt.when || {}).some(([qid, vals]) => {
      const v = ans(qid).v;
      const arr = Array.isArray(v) ? v : v ? [v] : [];
      return arr.some((x) => vals.includes(x));
    });
  }
  function deriveDecisions() {
    return window.DECISIONS.map((b) => ({
      ramo: b.title, ask: b.ask,
      escolhas: b.options.filter(chosen).map((o) => o.label),
      respondido: b.qs.some((id) => isAnswered(byId[id] || {}))
    }));
  }
  const phaseTag = (p) => `<span class="tag ${p === "MVP" ? "t-mvp" : p === "Fase 2" ? "t-f2" : "t-out"}">${esc(p)}</span>`;

  function renderMap() {
    const picked = [];
    window.DECISIONS.forEach((b) => b.options.filter(chosen).forEach((o) => picked.push({ b, o })));
    const mvp = picked.filter((x) => x.o.phase === "MVP"), f2 = picked.filter((x) => x.o.phase === "Fase 2");
    const effort = picked.reduce((n, x) => n + (EFFORT[x.o.effort] || 0), 0);
    const lgpd = picked.filter((x) => x.o.lgpd);
    const rec = picked.filter((x) => x.o.rec).map((x) => x.o.rec);
    $("#map-summary").innerHTML = picked.length ? `<div class="summary">
      <h3>Pacote que suas respostas formam até agora</h3>
      <div class="sum-grid">
        <div><strong>${mvp.length}</strong><span>itens no 1º lançamento</span></div>
        <div><strong>${f2.length}</strong><span>itens para a 2ª etapa</span></div>
        <div><strong>${effort}</strong><span>pontos de esforço</span></div>
        <div><strong>${lgpd.length}</strong><span>pedem cuidado com dados pessoais</span></div>
      </div>
      ${rec.length ? `<p><strong>Tarefas ou custos que continuam depois:</strong> ${[...new Set(rec)].map(esc).join("; ")}.</p>` : ""}
    </div>` : `<div class="summary empty"><p>Responda às perguntas e este quadro mostra o pacote que suas escolhas formam.</p></div>`;

    $("#map").innerHTML = `<div class="tree"><div class="root">Cofo Literário</div><div class="branches">` +
      window.DECISIONS.map((b) => {
        const anyChosen = b.options.some(chosen);
        return `<details class="branch ${anyChosen ? "hit" : ""}" ${anyChosen ? "open" : ""}>
          <summary><span class="bnode">${esc(b.title)}</span><span class="bask">${esc(b.ask)}</span></summary>
          <div class="leaves">${b.options.map((o) => {
            const on = chosen(o);
            return `<div class="leaf ${on ? "on" : ""}">
              <div class="leaf-head"><strong>${esc(o.label)}</strong>${phaseTag(o.phase)}<span class="tag t-eff">esforço ${EFFORT_LABEL[o.effort] || "—"}</span>${o.lgpd ? '<span class="tag t-lgpd">dados pessoais</span>' : ""}</div>
              <p><span class="gain">Ganha:</span> ${esc(o.gain)}</p>
              <p><span class="cost">Custa/abre mão:</span> ${esc(o.cost)}</p>
              ${o.rec ? `<p class="rec">Continua depois: ${esc(o.rec)}</p>` : ""}
              ${on ? '<p class="mark">Esta é a sua escolha até agora</p>' : ""}
            </div>`;
          }).join("")}</div>
        </details>`;
      }).join("") + `</div></div>`;
  }

  // ---------- revisar e enviar ----------
  function pendingBlock() {
    return countable.filter((q) => q.prio === "Bloqueia" && !isAnswered(q));
  }
  function buildPayload() {
    const items = countable.filter(isAnswered).map((q) => {
      const a = ans(q.id);
      return { id: q.id, secao: q.sec, prioridade: q.prio, pergunta: q.q, respostas: labelsOf(q), valores: a.v || null, texto: a.text || "", observacao: a.note || "" };
    });
    const autorizacoes = Object.entries(state.authorize).filter(([, a]) => a.ok || a.contact).map(([k, a]) => ({ quem: k, autoriza: !!a.ok, contato: a.contact || "" }));
    const decisoes = deriveDecisions();
    const lines = items.map((i) => `${i.id} [${i.prioridade}] ${i.pergunta}\n  → ${[i.respostas.join("; "), i.texto, i.observacao ? "(obs: " + i.observacao + ")" : ""].filter(Boolean).join(" ")}`);
    return {
      _subject: "Levantamento Cofo Literário — " + (state.who.name || "sem nome"),
      versao_guia: CFG.GUIA_VERSION,
      enviado_em: new Date().toISOString(),
      respondente: state.who.name || "",
      contato: state.who.contact || "",
      progresso: `${items.length} de ${countable.length}`,
      pendentes_prioridade_alta: pendingBlock().map((q) => q.id),
      mensagem: lines.join("\n\n"),
      respostas: items, autorizacoes, decisoes
    };
  }

  function renderReview() {
    const pend = pendingBlock();
    const done = countable.filter(isAnswered).length;
    $("#review").innerHTML = `
      <div class="card">
        <h3>Seus dados</h3>
        <label class="note"><span>Seu nome</span><input type="text" data-who="name" value="${esc(state.who.name)}" autocomplete="name"></label>
        <label class="note"><span>WhatsApp ou e-mail para eu te chamar se precisar</span><input type="text" data-who="contact" value="${esc(state.who.contact)}"></label>
        <p class="why">Seus dados serão usados só para este levantamento.</p>
      </div>
      <div class="card">
        <h3>Situação</h3>
        <p>${done} de ${countable.length} perguntas respondidas.</p>
        ${pend.length ? `<p><strong>Faltam ${pend.length} de prioridade alta</strong> (sem elas eu não consigo decidir o que construir):</p>
          <ul class="pend">${pend.map((q) => `<li><a href="#q-${q.id}" data-goto="${q.id}">${q.id}</a> — ${esc(q.q.slice(0, 90))}${q.q.length > 90 ? "…" : ""}</li>`).join("")}</ul>` : "<p>Todas as de prioridade alta estão respondidas. 🎉</p>"}
      </div>
      <div class="card actions">
        <button class="btn primary" id="btn-wpp">Enviar pelo WhatsApp</button>
        <button class="btn" id="btn-mail">Enviar por e-mail</button>
        ${formspreeOn() ? '<button class="btn" id="btn-send">Enviar automático</button>' : ""}
        <button class="btn" id="btn-download">Baixar arquivo</button>
        <button class="btn" id="btn-print">Imprimir / salvar PDF</button>
        <p class="why">No celular, o WhatsApp abre com o arquivo pronto para você enviar. No computador, o arquivo é baixado e o WhatsApp (ou o seu e-mail) abre para você anexá-lo.</p>
        <p id="send-status" role="status"></p>
      </div>`;
  }

  const formspreeOn = () => !!CFG.FORMSPREE_ENDPOINT && !/XXXX/.test(CFG.FORMSPREE_ENDPOINT);

  function buildTextFile() {
    const NL = String.fromCharCode(10);
    const p = buildPayload();
    const head = [
      "LEVANTAMENTO COFO LITERÁRIO",
      "Respondente: " + p.respondente,
      "Contato: " + p.contato,
      "Enviado em: " + p.enviado_em,
      "Progresso: " + p.progresso,
      "Pendentes de prioridade alta: " + (p.pendentes_prioridade_alta.join(", ") || "nenhuma")
    ].join(NL);
    const dec = p.decisoes.filter((d) => d.escolhas.length).map((d) => "- " + d.ramo + ": " + d.escolhas.join("; ")).join(NL);
    const aut = p.autorizacoes.map((x) => "- " + x.quem + ": " + (x.autoriza ? "autoriza" : "não autoriza") + " " + x.contato).join(NL);
    return [head, "", "=== RESPOSTAS ===", "", p.mensagem, "", "=== DECISÕES DO MAPA ===", dec || "(nenhuma ainda)",
      "", "=== AUTORIZAÇÕES ===", aut || "(nenhuma)", "", "=== DADOS (JSON) ===", JSON.stringify(p), ""].join(NL);
  }

  async function shareWhatsApp() {
    const status = $("#send-status");
    if (!state.who.name.trim()) { status.className = "err"; status.textContent = "Escreva seu nome antes de enviar."; return; }
    const text = buildTextFile();
    const name = "respostas-cofo-literario.txt";
    const file = new File([text], name, { type: "text/plain" });
    const msg = `Oi Mário, aqui é ${state.who.name.trim()}. Segue o arquivo com as minhas respostas do levantamento do site.`;
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: msg, title: "Respostas — Cofo Literário" });
        status.className = "ok"; status.textContent = "Escolha o WhatsApp e o contato do Mário na tela que abriu.";
        return;
      }
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
    // Reserva: baixa o arquivo e abre a conversa já com a mensagem
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    window.open(`https://wa.me/${CFG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg + " (vou anexar o arquivo baixado)")}`, "_blank", "noopener");
    status.className = "ok";
    status.textContent = "O arquivo foi baixado e o WhatsApp abriu. Anexe o arquivo “" + name + "” na conversa e envie.";
  }

  // Documento de respostas para imprimir/salvar em PDF (não imprime a tela atual)
  function printAnswers() {
    const status = $("#send-status");
    if (!state.who.name.trim()) { status.className = "err"; status.textContent = "Escreva seu nome antes de gerar o PDF."; return; }
    const p = buildPayload();
    const date = new Date().toLocaleDateString("pt-BR");
    const secHtml = sections.filter((s) => s.id !== "M").map((s) => {
      const items = s.questions.filter(isAnswered);
      if (!items.length) return "";
      return `<h2>${esc(s.id)}. ${esc(s.title)}</h2>` + items.map((q) => {
        const a = ans(q.id);
        const parts = [labelsOf(q).join("; "), a.text || "", a.note ? "Obs.: " + a.note : ""].filter(Boolean);
        return `<div class="pq"><p class="pq-q"><strong>${esc(q.id)}</strong> ${esc(q.q).replace(/\n\n/g, "<br>")}</p><p class="pq-a">${parts.map(esc).join("<br>")}</p></div>`;
      }).join("");
    }).join("");
    const pend = pendingBlock();
    const dec = p.decisoes.filter((d) => d.escolhas.length);
    const aut = p.autorizacoes;
    const html = `<h1>Levantamento — Cofo Literário</h1>
      <p class="pmeta"><strong>${esc(state.who.name)}</strong>${state.who.contact ? " · " + esc(state.who.contact) : ""} · ${esc(date)} · ${esc(p.progresso)} respondidas</p>
      ${secHtml || "<p>Nenhuma pergunta respondida ainda.</p>"}
      ${pend.length ? `<h2>Ainda sem resposta (prioridade alta)</h2><ul>${pend.map((q) => `<li><strong>${esc(q.id)}</strong> ${esc(q.q)}</li>`).join("")}</ul>` : ""}
      ${dec.length ? `<h2>Decisões do mapa</h2><ul>${dec.map((d) => `<li><strong>${esc(d.ramo)}:</strong> ${d.escolhas.map(esc).join("; ")}</li>`).join("")}</ul>` : ""}
      ${aut.length ? `<h2>Autorizações de contato</h2><ul>${aut.map((x) => `<li>${esc(x.quem)}: ${x.autoriza ? "autoriza" : "não autoriza"} ${esc(x.contato)}</li>`).join("")}</ul>` : ""}`;
    let root = $("#print-root");
    if (!root) { root = document.createElement("div"); root.id = "print-root"; document.body.appendChild(root); }
    root.innerHTML = html;
    document.body.classList.add("printing");
    const done = () => { document.body.classList.remove("printing"); window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    window.print();
  }

  function shareEmail() {
    const status = $("#send-status");
    if (!state.who.name.trim()) { status.className = "err"; status.textContent = "Escreva seu nome antes de enviar."; return; }
    const name = "respostas-cofo-literario.txt";
    const file = new File([buildTextFile()], name, { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    const NL = String.fromCharCode(10);
    const body = ["Oi Mário,", "", "Segue em anexo o arquivo com as minhas respostas do levantamento do site (" + name + ").", "",
      "Respondente: " + state.who.name.trim(), "Contato: " + (state.who.contact || "")].join(NL);
    const subject = "Levantamento Cofo Literário — " + state.who.name.trim();
    window.location.href = `mailto:${CFG.EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = "ok";
    status.textContent = "O arquivo foi baixado e seu e-mail abriu. Anexe o arquivo “" + name + "” e envie.";
  }

  async function send() {
    const status = $("#send-status"), btn = $("#btn-send");
    if (!state.who.name.trim()) { status.textContent = "Escreva seu nome antes de enviar."; status.className = "err"; return; }
    const endpoint = CFG.FORMSPREE_ENDPOINT;
    if (!endpoint || /XXXX/.test(endpoint)) {
      status.className = "err";
      status.textContent = "O envio automático ainda não foi configurado. Use o botão do WhatsApp.";
      return;
    }
    btn.disabled = true; status.className = ""; status.textContent = "Enviando…";
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(buildPayload()) });
      if (!r.ok) throw new Error("HTTP " + r.status);
      status.className = "ok"; status.textContent = "Enviado! Obrigado, Martha. Se lembrar de algo, é só alterar e enviar de novo.";
    } catch (e) {
      status.className = "err"; status.textContent = "Não consegui enviar agora. Suas respostas continuam salvas aqui. Baixe o arquivo e mande pelo WhatsApp.";
    } finally { btn.disabled = false; }
  }

  function download() {
    const blob = new Blob([buildTextFile()], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "respostas-cofo-literario.txt";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ---------- eventos ----------
  function setTab(name) {
    $$(".tab").forEach((t) => (t.hidden = t.id !== "tab-" + name));
    $$(".tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    if (name === "mapa") renderMap();
    if (name === "enviar") renderReview();
    window.scrollTo(0, 0);
  }

  function refreshQuestion(qid) {
    const q = byId[qid], el = $(`#q-${qid}`);
    if (!el || !q) return;
    el.classList.toggle("done", isAnswered(q));
    $$(".opt", el).forEach((l) => l.classList.toggle("on", $("input", l).checked));
    $(".impact-slot", el).innerHTML = impactHtml(q);
    updateProgress();
  }

  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".tabs button");
    if (tab) return setTab(tab.dataset.tab);
    const goto = e.target.closest("[data-goto]");
    if (goto) {
      e.preventDefault();
      setTab("perguntas");
      const q = byId[goto.dataset.goto];
      const det = $(`details[data-sec="${q.sec}"]`); if (det) det.open = true;
      const el = $("#q-" + q.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (e.target.id === "btn-wpp") return shareWhatsApp();
    if (e.target.id === "btn-mail") return shareEmail();
    if (e.target.id === "btn-send") return send();
    if (e.target.id === "btn-download") return download();
    if (e.target.id === "btn-print") return printAnswers();
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    const art = t.closest("[data-q]");
    if (art && t.matches('input[type="radio"],input[type="checkbox"]')) {
      const qid = art.dataset.q, q = byId[qid];
      const a = (state.answers[qid] = state.answers[qid] || {});
      if (q.t === "multi") a.v = $$('input:checked', art).map((i) => i.value);
      else a.v = t.value;
      save(); refreshQuestion(qid); return;
    }
    if (t.dataset.auth) {
      const k = t.dataset.auth; state.authorize[k] = Object.assign(state.authorize[k] || {}, { ok: t.checked });
      t.closest(".opt").classList.toggle("on", t.checked); save(); updateProgress();
    }
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    const art = t.closest("[data-q]");
    if (art && t.dataset.field) {
      const qid = art.dataset.q, a = (state.answers[qid] = state.answers[qid] || {});
      a[t.dataset.field] = t.value; save(); refreshQuestion(qid); return;
    }
    if (t.dataset.authContact) {
      const k = t.dataset.authContact; state.authorize[k] = Object.assign(state.authorize[k] || {}, { contact: t.value }); save(); return;
    }
    if (t.dataset.who) { state.who[t.dataset.who] = t.value; save(); }
  });

  // ---------- início ----------
  renderKnown();
  renderSections();
  updateProgress();
})();
