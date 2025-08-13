let ESCAPP_LOCALES = {
};


// AfterOpen can be "NOTHING", "SHOW_URL", "SHOW_MESSAGE" or "SHOW_MESSAGE_AND_CONTINUE"

export let GLOBAL_CONFIG = {
  availableLocales:["en"],
  locale: undefined,
  defaultLocale:"en",
  localStorageKey:"DESKTOP_2025",
  mailAppLink: "https://vishubcode.org/webappscode/549/index.html?url=https%3A%2F%2Fging.github.io%2FMalditaER%2FFakemail",
  escapp:{
    endpoint:"https://escapp.es/api/escapeRooms/309",
    localStorageKey:"ESCAPP_DESKTOP_2025",
    restoreState:"AUTO",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:[ "en"],
      defaultLocale:"en",
      locales:ESCAPP_LOCALES,
    },
    appPuzzleIds:[7,8],
    notifications:false,
    rtc:true,
    forceValidation2:process.env.NODE_ENV=="production",
    forceValidation: false
  },
};
