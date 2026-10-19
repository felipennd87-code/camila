const WHATSAPP = "5583981271525";

const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Botões de WhatsApp com mensagem pronta */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
});

/* Ano automático */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* Topo: fundo creme com blur ao rolar, menu no celular */
const topbar = document.querySelector("[data-topbar]");
const menuBtn = document.querySelector("[data-menu-btn]");
const menu = document.getElementById("menu");

const setMenu = (open) => {
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.querySelector(".visually-hidden").textContent = open ? "Fechar menu" : "Abrir menu";
  menu.classList.toggle("is-open", open);
  updateTopbar();
};

function updateTopbar() {
  const solid = window.scrollY > 24 || menu.classList.contains("is-open");
  topbar.classList.toggle("is-solid", solid);
}

menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) {
    setMenu(false);
    menuBtn.focus();
  }
});
window.addEventListener("scroll", updateTopbar, { passive: true });
updateTopbar();

/* Vídeo do hero */
const video = document.querySelector(".hero__video");
const portrait = window.matchMedia("(orientation: portrait)");

if (video) {
  if (portrait.matches) video.poster = video.dataset.posterMobile;

  const syncMotion = () => {
    if (reduceMotion.matches) {
      video.removeAttribute("autoplay");
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };
  syncMotion();
  reduceMotion.addEventListener("change", syncMotion);

  portrait.addEventListener("change", () => {
    video.poster = portrait.matches ? video.dataset.posterMobile : "assets/video/hero-poster.jpg";
    video.load();
    syncMotion();
  });

  new IntersectionObserver(([entry]) => {
    if (reduceMotion.matches) return;
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }).observe(video);
}

/* Botão flutuante depois do hero */
const waFloat = document.querySelector("[data-wa-float]");
const hero = document.querySelector(".hero");
if (waFloat && hero) {
  new IntersectionObserver(([entry]) => {
    waFloat.classList.toggle("is-visible", !entry.isIntersecting);
  }, { threshold: 0 }).observe(hero);
}

/* Entradas suaves */
const revealIO = new IntersectionObserver((entries, io) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-in");
    io.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

document.querySelectorAll(".reveal, .shot, .fio").forEach((el) => revealIO.observe(el));

/* Fio terracota que se desenha ao rolar */
const drawables = [...document.querySelectorAll("[data-draw]")];
let drawTick = false;

const draw = () => {
  drawTick = false;
  const vh = window.innerHeight;
  drawables.forEach((el) => {
    if (reduceMotion.matches) {
      el.style.setProperty("--draw", 1);
      return;
    }
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
    el.style.setProperty("--draw", p.toFixed(3));
  });
};
const queueDraw = () => {
  if (!drawTick) {
    drawTick = true;
    requestAnimationFrame(draw);
  }
};
window.addEventListener("scroll", queueDraw, { passive: true });
window.addEventListener("resize", queueDraw);
draw();

/* Quiz "Qual é o seu projeto?" */
const quiz = document.querySelector("[data-quiz]");

if (quiz) {
  const BABY = "Quarto de bebê ou infantil";
  const steps = [...quiz.querySelectorAll("[data-step]")];
  const bar = quiz.querySelector("[data-quiz-bar]");
  const count = quiz.querySelector("[data-quiz-count]");
  const backBtn = quiz.querySelector("[data-quiz-back]");
  const resetBtn = quiz.querySelector("[data-quiz-reset]");
  const nameInput = quiz.querySelector("#q-nome");
  const nameError = quiz.querySelector("#q-nome-erro");
  const babyField = quiz.querySelector("[data-baby-field]");
  const babySelect = quiz.querySelector("[data-baby-select]");
  const sendBtn = quiz.querySelector("[data-quiz-send]");
  let current = 1;
  let viaPointer = false;

  // Próximos 12 meses para a previsão do bebê
  const monthFmt = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const label = monthFmt.format(d);
    babySelect.add(new Option(label, label));
  }

  const value = (name) => {
    const el = quiz.elements[name];
    return el ? String(el.value || "").trim() : "";
  };

  const buildMessage = () => {
    const lines = [
      "Olá, Camila! Vim pelo site.",
      `Nome: ${value("nome")}`,
      `Projeto: ${value("tipo")} | Fase: ${value("fase")}`,
      `Local: ${value("local")}`,
    ];
    if (value("tipo") === BABY && value("bebe")) lines.push(`Previsão do bebê: ${value("bebe")}`);
    return lines.join("\n");
  };

  const fillSummary = () => {
    quiz.querySelector("[data-sum-nome]").textContent = value("nome");
    quiz.querySelector("[data-sum-tipo]").textContent = value("tipo");
    quiz.querySelector("[data-sum-fase]").textContent = value("fase");
    quiz.querySelector("[data-sum-local]").textContent = value("local");
    const showBaby = value("tipo") === BABY && value("bebe");
    quiz.querySelector("[data-sum-bebe-row]").hidden = !showBaby;
    quiz.querySelector("[data-sum-bebe]").textContent = showBaby ? value("bebe") : "";
    sendBtn.href = waLink(buildMessage());
  };

  const go = (n, { focus = true } = {}) => {
    const back = n < current;
    current = n;
    steps.forEach((step) => {
      const active = Number(step.dataset.step) === n;
      step.hidden = !active;
      step.classList.remove("is-enter", "is-enter-back");
      if (active && !reduceMotion.matches) {
        void step.offsetWidth;
        step.classList.add(back ? "is-enter-back" : "is-enter");
      }
    });

    if (n === 4) babyField.hidden = value("tipo") !== BABY;
    if (n === 5) fillSummary();

    bar.querySelector("span").style.transform = `scaleX(${Math.min(n, 4) / 4})`;
    bar.setAttribute("aria-valuenow", String(n));
    count.textContent = n < 5 ? `Passo ${n} de 4` : "Resumo";
    backBtn.hidden = n === 1;
    resetBtn.hidden = n !== 5;

    if (focus) {
      // No celular o passo novo pode começar acima da tela; traz o topo do quiz de volta
      if (quiz.getBoundingClientRect().top < topbar.offsetHeight) {
        quiz.scrollIntoView({ block: "start", behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
      const step = steps[n - 1];
      const target = n === 5 ? step : step.querySelector("input:checked, input, select");
      if (target) target.focus({ preventScroll: true });
    }
  };

  quiz.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".opt")) viaPointer = true;
  });

  quiz.addEventListener("change", (e) => {
    const input = e.target;
    if (input.type !== "radio") return;
    if (viaPointer) {
      viaPointer = false;
      const n = current;
      setTimeout(() => current === n && go(n + 1), 240);
    }
  });

  // No teclado, as setas só escolhem; Enter ou espaço confirma e avança
  quiz.addEventListener("keydown", (e) => {
    const input = e.target;
    if (input.type !== "radio") return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      input.checked = true;
      go(current + 1);
    }
  });

  quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    if (current !== 4) return;
    if (!value("nome")) {
      nameInput.setAttribute("aria-invalid", "true");
      nameInput.setAttribute("aria-describedby", "q-nome-erro");
      nameError.hidden = false;
      nameInput.focus();
      return;
    }
    nameInput.removeAttribute("aria-invalid");
    nameError.hidden = true;
    go(5);
  });

  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim()) {
      nameInput.removeAttribute("aria-invalid");
      nameError.hidden = true;
    }
  });

  backBtn.addEventListener("click", () => go(Math.max(1, current - 1)));
  resetBtn.addEventListener("click", () => {
    quiz.reset();
    go(1);
  });

  go(1, { focus: false });
}

/* Lightbox da galeria */
const lightbox = document.querySelector("[data-lightbox]");

if (lightbox) {
  const lbImg = lightbox.querySelector("[data-lb-img]");
  const lbCap = lightbox.querySelector("[data-lb-cap]");
  const shots = [...document.querySelectorAll("[data-shot]")]
    .sort((a, b) => a.dataset.shot - b.dataset.shot)
    .map((btn) => {
      const img = btn.querySelector("img");
      return {
        btn,
        full: img.getAttribute("srcset").split(",").pop().trim().split(" ")[0],
        alt: img.alt,
        cap: btn.closest(".shot").querySelector(".shot__cap").textContent,
      };
    });
  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + shots.length) % shots.length;
    const s = shots[index];
    lbImg.src = s.full;
    lbImg.alt = s.alt;
    lbCap.textContent = s.cap;
  };

  shots.forEach((s, i) => {
    s.btn.addEventListener("click", () => {
      opener = s.btn;
      show(i);
      lightbox.showModal();
      document.body.classList.add("is-locked");
      lightbox.querySelector("[data-lb-close]").focus();
    });
  });

  lightbox.querySelector("[data-lb-close]").addEventListener("click", () => lightbox.close());
  lightbox.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1));
  lightbox.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox__fig")) lightbox.close();
  });
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("is-locked");
    if (opener) opener.focus();
  });
}

/* Depoimentos: a seção só aparece quando houver textos reais */
const depo = document.querySelector("[data-depo]");
if (depo) {
  let filled = 0;
  depo.querySelectorAll(".depo__card").forEach((card) => {
    const has = card.querySelector("blockquote").textContent.trim().length > 0;
    card.classList.toggle("is-empty", !has);
    if (has) filled++;
  });
  depo.hidden = filled === 0;
}
