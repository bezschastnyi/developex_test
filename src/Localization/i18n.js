import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'Edit comment': 'Edit comment',
                    'NameComment': 'Name',
                    'Email':'Email',
                    'Comment text':'Comment text',
                    'Deleting a comment':'Deleting a comment',
                    'Are you sure you want to delete this comment?':'Are you sure you want to delete this comment?',
                    'Comment Body':'Comment Body',
                    'Edit':'Edit',
                    'Delete':'Delete',
                    'Answer':'Answer'

                },
            },


        },
        lng: 'en', // Язык по умолчанию
        fallbackLng: 'en', // Язык, который будет использоваться, если текущий недоступен
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
