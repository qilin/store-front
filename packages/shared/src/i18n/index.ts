import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './en-us';
import ruRU from './ru-ru';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      enUS,
      ruRU,
    },
    lng: 'ruRU',
    fallbackLng: 'enUS',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
