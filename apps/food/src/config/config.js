// let ESCAPP_LOCALES = {
//   es:{
//     "i.auth_text":"Introduce las credenciales (correo 'usuario@alumnos.upm.es' y contraseña) de tu usuario en la plataforma Escapp. Para que esta autenticación tenga éxito, previamente debes de haberte inscrito con tu usuario a la escape room en la plataforma Escapp.",
//     "i.auth_text_wrong_credentials":"Las credenciales aportadas no son correctas. Debes introducir las credenciales (correo 'usuario@alumnos.upm.es' y contraseña) de tu usuario en la plataforma Escapp. Para que esta autenticación tenga éxito, previamente debes de haberte inscrito con tu usuario a la escape room en la plataforma Escapp.",
//   },
// };
let ESCAPP_LOCALES = {
};


const searchParams = new URL(document.location).searchParams;

   

export let GLOBAL_CONFIG = {
  availableLocales:[  "en" ],
  defaultLocale:"en",
  locale: "en",
  localStorageKey: "ESCAPP_FOOD",
  restoreState:"NEVER",
  escapp:{
    endpoint:"https://escapp.es/api/escapeRooms/309",
    localStorageKey: "FOOD_BALTIC",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["en"],
      defaultLocale:"en",
      locales:ESCAPP_LOCALES,
    },
    appPuzzleIds:[4],
    notifications:false,
    rtc:true,
    forceValidation:false
  },
};
