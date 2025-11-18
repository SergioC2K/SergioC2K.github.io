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
