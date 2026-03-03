document.addEventListener("DOMContentLoaded", () => {
  const i18n = new I18n();

  const langButtons = document.querySelectorAll(".lang-btn");

  function translateAllValues() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = i18n.translateData(key);
    });
  }

  i18n.subscriber(translateAllValues);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      i18n.changeLanguage(btn.dataset.lang);

      langButtons.forEach((b) => {
        b.classList.toggle("active", b.dataset.lang === i18n.selectedLang());
      });
    });
  });

  document
    .querySelector(`.lang-btn[data-lang="${i18n.selectedLang()}"]`)
    ?.classList.add("active");

  // Funcionalidad de las pestañas
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remover clase active de todas las pestañas
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.remove("active");
      });

      // Añadir clase active a la pestaña clickeada
      tab.classList.add("active");

      // Ocultar todos los contenidos
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Mostrar el contenido correspondiente
      const target = tab.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });
});
