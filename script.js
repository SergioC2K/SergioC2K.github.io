document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    let isEnglish = false;

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    });

    function setLanguage(lang) {
        fetch('lang.json')
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                for (const [id, text] of Object.entries(translations)) {
                    document.getElementById(id).textContent = text;
                }
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    langToggle.addEventListener('click', function () {
        if (isEnglish) {
            setLanguage('es');
            langToggle.innerHTML = '<i class="fa-solid fa-language"></i> Inglés';
        } else {
            setLanguage('en');
            langToggle.innerHTML = '<i class="fa-solid fa-language"></i> Spanish';
        }
        isEnglish = !isEnglish;
    });

    // Inicializa con el idioma español
    setLanguage('es');
});
