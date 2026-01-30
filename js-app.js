const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const navToggle = $("#navToggle");
const navList = $("#navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}
// ===== Zmiana motywu (CSS) =====
const toggleThemeBtn = $("#toggleThemeBtn");
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", current === "light" ? "" : "light");
  });
}
const slides = $$("#slideshow .slideshow__img");
let slideIndex = 0;
function showSlide(i) {
  if (!slides.length) return;
  slides.forEach((img) => img.classList.remove("is-visible"));
  slideIndex = (i + slides.length) % slides.length;
  const active = slides[slideIndex];
  active.classList.add("is-visible");
  //  rozmyte tło dopasowane do aktualnego slajdu
  const slideshow = document.getElementById("slideshow");
  if (slideshow) {
    slideshow.style.setProperty("--slide-bg", `url("${active.getAttribute("src")}")`);
  }
}
const nextBtn = $("#nextSlide");
const prevBtn = $("#prevSlide");
if (nextBtn) nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));
if (prevBtn) prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
// auto-play
if (slides.length) {
  setInterval(() => showSlide(slideIndex + 1), 6000);
}
// search + filter TABLE
const techSearch = $("#techSearch");
const levelFilter = $("#levelFilter");
const resetFilters = $("#resetFilters");
const techTable = $("#techTable");

function filterTechTable() {
  if (!techTable) return;
  const q = (techSearch?.value || "").trim().toLowerCase();
  const lvl = levelFilter?.value || "all";

  $$("#techTable tbody tr").forEach((row) => {
    const rowText = row.textContent.toLowerCase();
    const rowLevel = row.getAttribute("data-level");
    const matchesSearch = !q || rowText.includes(q);
    const matchesLevel = lvl === "all" || rowLevel === lvl;
    row.style.display = matchesSearch && matchesLevel ? "" : "none";
  });
}

if (techSearch) techSearch.addEventListener("input", filterTechTable);
if (levelFilter) levelFilter.addEventListener("change", filterTechTable);

if (resetFilters) {
  resetFilters.addEventListener("click", () => {
    if (techSearch) techSearch.value = "";
    if (levelFilter) levelFilter.value = "all";
    filterTechTable();
  });
}

// Formularz (Buttons + Forms + DOM) 
const form = $("#contactForm");
const statusEl = $("#formStatus");
const fillDemo = $("#fillDemo");

function setStatus(msg, ok = true) {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.style.color = ok ? "" : "tomato"; // dynamiczna zmiana stylu
}

if (fillDemo) {
  fillDemo.addEventListener("click", () => {
    const name = $("#nameInput");
    const email = $("#emailInput");
    const msg = $("#msgInput");
    if (name) name.value = "Jan";
    if (email) email.value = "jan@email.com";
    if (msg) msg.value = "Cześć! To jest przykładowa wiadomość z formularza.";
    setStatus("Uzupełniono przykładowe dane.");
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#nameInput");
    const email = $("#emailInput");
    const msg = $("#msgInput");

    const valid =
      name?.checkValidity() &&
      email?.checkValidity() &&
      msg?.checkValidity();

    if (!valid) {
      setStatus("Uzupełnij poprawnie wszystkie pola (walidacja HTML).", false);
      // pokaż natywne komunikaty przeglądarki
      form.reportValidity();
      return;
    }

    setStatus("Wiadomość wysłana (demo). Dzięki! ✅");
    form.reset();
  });
}

const projectFilter = $("#projectFilter");
const projectList = $("#projectList");
const shuffleBtn = $("#shuffleBtn");

function filterProjects() {
  if (!projectFilter || !projectList) return;
  const val = projectFilter.value;

  $$("#projectList > li").forEach((li) => {
    const tags = (li.getAttribute("data-tags") || "").split(/\s+/);
    li.style.display = (val === "all" || tags.includes(val)) ? "" : "none";
  });
}

if (projectFilter) projectFilter.addEventListener("change", filterProjects);

// dodatkowa funkcjonalność przyciskiem
function shuffleList(ul) {
  const items = [...ul.children];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach((li) => ul.appendChild(li));
}

if (shuffleBtn && projectList) {
  shuffleBtn.addEventListener("click", () => {
    shuffleList(projectList);
  });
}
