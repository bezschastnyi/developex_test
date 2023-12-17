import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    //  comment
                    'Edit comment': 'Edit comment',
                    'NameComment': 'Name',
                    'Email':'Email',
                    'Comment text':'Comment text',
                    'Deleting a comment':'Deleting a comment',
                    'Are you sure you want to delete this comment?':'Are you sure you want to delete this comment?',
                    'Comment Body':'Comment Body',
                    'Edit':'Edit',
                    'Delete':'Delete',
                    'Answer':'Answer',


                    //     modal
                    'Cancel':'Cancel',
                    'Save':'Save',
                    'DeleteModal':"Delete",
                    'Close':'Close',


                    // posts
                    'Edit post':'Edit',
                    'Delete Post':'Delete',
                    'Hide comments':'Hide comments',
                    'Show comments':'Show comments',
                    'Post Editing':'Post Editing',
                    'Post Title':'Post Title',
                    'Post Text':'Post Text',
                    'Deleting a post':'Deleting a post',
                    'Are you sure you want to delete this post?':'Are you sure you want to delete this post?',
                    'New post':'New post',
                    'New Post Title':'New Post Title',
                    'New Post Text':'New Post Text',
                    'Posts':'Posts',
                    'Search...':'Search...',



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
