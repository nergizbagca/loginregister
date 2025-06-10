let translations = {};

let currentLang = 'tr';

const loadTranslations = async () => {
  const enData = await fetch('./locales/en.json').then(response => response.json());
  const trData = await fetch('./locales/tr.json').then(response => response.json());

  translations = {
    en: enData,
    tr: trData
  };

  updateTexts();
};

const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLang = lang;
    updateTexts();
  }
};

const updateTexts = () => {
  document.querySelectorAll('[data-i18n]').forEach(function (element) {
    const key = element.getAttribute('data-i18n');
   
    element.innerText = translations[currentLang][key];

    if ((element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') && translations[currentLang] && translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });
};

document.addEventListener('DOMContentLoaded', loadTranslations);
