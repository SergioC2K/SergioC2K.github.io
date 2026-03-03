class I18n {
  constructor(callbackCuandoListo) {
    this.currentLang = navigator.language ?? "es"; // Por defecto español
    this.translations = {
      es: null,
      en: null,
    };
    this.observer = []; // Los que están esperando que cambie el idioma
    this.isReady = false;
    // Cargar idioma guardado (si existe)
    const isSaved = localStorage.getItem("lang");
    if (isSaved) this.currentLang = isSaved;

    // Cargar los archivos de traducción
    this.loadTranslations().then(() => {
      this.isReady = true;
      this.notifyAll(); // 🆕 Notificar a todos que ya cargó
      if (callbackCuandoListo) callbackCuandoListo();
    });
  }

  selectedLang() {
    return this.currentLang;
  }

  async loadTranslations() {
    try {
      const translations = await this.loadTranslationsObjects();
      this.translations.es = translations.es;
      this.translations.en = translations.en;
      this.notifyAll();
    } catch (error) {
      console.error("Error loading data");
    }
  }

  async loadTranslationsObjects() {
    const [es, en] = await Promise.all([
      fetch("src/i18n/locales/es.json").then((r) => r.json()),
      fetch("src/i18n/locales/en.json").then((r) => r.json()),
    ]);

    return { es, en };
  }

  translateArray(arrayKey, index, field) {
    const key = `${arrayKey}[${index}].${field}`;
    return this.translateData(key);
  }

  translateData(key) {
    try {
      const parts = key.split(".");
      let result = this.translations[this.currentLang];

      for (let part of parts) {
        if (!result) return key;

        const match = part.match(/(.*?)\[(\d+)\]/);
        if (match) {
          const [_, array, index] = match;
          result = result[array]?.[parseInt(index)];
        } else {
          result = result[part];
        }
      }
      return result || key;
    } catch {
      return key;
    }
  }

  changeLanguage(lang) {
    if (["es", "en"].includes(lang)) {
      this.currentLang = lang;
      window.localStorage.setItem("lang", lang);
      this.notifyAll();
    }
  }

  notifyAll() {
    this.observer.forEach((cb) => cb());
  }

  subscriber(callback) {
    this.observer.push(callback);
    callback();
    return () => {
      this.observer = this.observer.filter((cv) => cv !== callback);
    };
  }
}
