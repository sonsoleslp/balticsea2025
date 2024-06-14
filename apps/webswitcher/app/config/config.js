export let GLOBAL_CONFIG = {
  availableLocales:["en"],
  locale:undefined,
  defaultLocale:"en",
  locales:{
    es:{
      "i.help":"Pedir pista",
    },
    en:{
      "i.help":"Request hint",
    },
    it:{
      "i.help":"Richiedi indizio",
    },
  },
  localStorageKey:"WEB_SWITCHER_2022",
  webs:{
    en:[
      {name:"BalticSeaBioMed 1", url:"https://vishub.org/ediphy_documents/448.full?nowatermark=1", switchOnPuzzle:0},// Start
      {name:"BalticSeaBioMed 2", url:"https://vishub.org/ediphy_documents/449.full?nowatermark=1", switchOnPuzzle:1},// 23
      {name:"BalticSeaBioMed 3", url:"https://vishub.org/ediphy_documents/450.full?nowatermark=1", switchOnPuzzle:2},// Sauna
      {name:"BalticSeaBioMed 4", url:"https://vishub.org/ediphy_documents/451.full?nowatermark=1", switchOnPuzzle:3},// Plum
      {name:"BalticSeaBioMed 5", url:"https://vishub.org/ediphy_documents/452.full?nowatermark=1", switchOnPuzzle:4},// Fakenew -> password 
      {name:"BalticSeaBioMed 6", url:"https://vishub.org/ediphy_documents/453.full?nowatermark=1", switchOnPuzzle:6},// Doctor name
      {name:"BalticSeaBioMed 6", url:"https://vishub.org/ediphy_documents/454.full?nowatermark=1", switchOnPuzzle:7}// Conversation
    ]
  },
  escapp:{
    //endpoint:"https://escaperoom.maldita.es/escapeRooms/1",
    restoreState:"AUTO",
    localStorageKey:"WEB_SWITCHER_2022",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["en"],
      defaultLocale:"en",
      locales:{},
    },
    appPuzzleIds:[],
    notifications:false,
    rtc:true,
    forceValidation:true,
  },
};

// Autofill appPuzzleIds
let webs = GLOBAL_CONFIG.webs[Object.keys(GLOBAL_CONFIG.webs)[0]];
for(let i = 0; i < webs.length; i++){
  if((typeof webs[i].switchOnPuzzle === "number") && (webs[i].switchOnPuzzle > 0) && (typeof webs[i].url === "string")){
    GLOBAL_CONFIG.escapp.appPuzzleIds.push(webs[i].switchOnPuzzle);
  }
}