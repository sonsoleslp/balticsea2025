import React from 'react';
// let ESCAPP_LOCALES = {
//   es:{
//     "i.auth_text":"Introduce las credenciales (correo 'usuario@alumnos.upm.es' y contraseña) de tu usuario en la plataforma Escapp. Para que esta autenticación tenga éxito, previamente debes de haberte inscrito con tu usuario a la escape room en la plataforma Escapp.",
//     "i.auth_text_wrong_credentials":"Las credenciales aportadas no son correctas. Debes introducir las credenciales (correo 'usuario@alumnos.upm.es' y contraseña) de tu usuario en la plataforma Escapp. Para que esta autenticación tenga éxito, previamente debes de haberte inscrito con tu usuario a la escape room en la plataforma Escapp.",
//   },
// };
let ESCAPP_LOCALES = {
};


const searchParams = new URL(document.location).searchParams;

   
const ancestryData = [
  { region: 'Eastern European/Russian', percentage: 60, details: 'Predominantly from Russia, Poland, Ukraine, and other Eastern European countries.' },
  { region: 'Ashkenazi Jewish', percentage: 25, details: 'Ancestry linked to the Jewish populations from Central and Eastern Europe.' },
  { region: 'Western European', percentage: 10, details: 'Includes ancestry from France, Germany, Netherlands, and other Western European countries.' },
  { region: 'Southern European', percentage: 3, details: 'Includes ancestry from Italy, Spain, Greece, and other Southern European countries.' },
  { region: 'Northern European', percentage: 2, details: 'Includes ancestry from the UK, Ireland, Scandinavia, and other Northern European countries.' }
];

const riskData = {
  elevatedRisk: [
    { 
      name: 'Colorectal Cancer', 
      confidence: 4, 
      date: 'Jul 16, 2009', 
      details: (
        <div>
          <p>Colorectal cancer is a cancer that starts in the colon or the rectum.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>APC</td>
              <td>APC*I1307K</td>
              <td>Slightly increased risk of colorectal cancer</td>
            </tr>
            <tr>
              <td>MLH1</td>
              <td>MLH1*V600E</td>
              <td>Slightly increased risk of colorectal cancer</td>
            </tr>
            <tr>
              <td>MSH2</td>
              <td>MSH2*P349L</td>
              <td>Slightly increased risk of colorectal cancer</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Restless Legs Syndrome', 
      confidence: 4, 
      date: 'Jul 16, 2009', 
      details: (
        <div>
          <p>Restless Legs Syndrome (RLS) is a condition characterized by an uncontrollable urge to move the legs.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>MEIS1</td>
              <td>MEIS1*PAX6</td>
              <td>Slightly increased risk of RLS</td>
            </tr>
            <tr>
              <td>BTBD9</td>
              <td>BTBD9*RS3923809</td>
              <td>Slightly increased risk of RLS</td>
            </tr>
            <tr>
              <td>MAP2K5</td>
              <td>MAP2K5*RS2300478</td>
              <td>Slightly increased risk of RLS</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Ulcerative Colitis', 
      confidence: 4, 
      date: 'Jul 7, 2009', 
      details: (
        <div>
          <p>Ulcerative colitis is a chronic, inflammatory bowel disease that causes inflammation in the digestive tract.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>NOD2</td>
              <td>NOD2*RS2066844</td>
              <td>Slightly increased risk of ulcerative colitis</td>
            </tr>
            <tr>
              <td>IL23R</td>
              <td>IL23R*RS11209026</td>
              <td>Slightly increased risk of ulcerative colitis</td>
            </tr>
            <tr>
              <td>ATG16L1</td>
              <td>ATG16L1*RS2241880</td>
              <td>Slightly increased risk of ulcerative colitis</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Abdominal Aortic Aneurysm', 
      confidence: 3, 
      date: 'Nov 21, 2008', 
      details: (
        <div>
          <p>An abdominal aortic aneurysm is an enlarged area in the lower part of the aorta, the major blood vessel that supplies blood to the body.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>FBN1</td>
              <td>FBN1*RS2010290</td>
              <td>Slightly increased risk of abdominal aortic aneurysm</td>
            </tr>
            <tr>
              <td>COL3A1</td>
              <td>COL3A1*RS1801186</td>
              <td>Slightly increased risk of abdominal aortic aneurysm</td>
            </tr>
            <tr>
              <td>ELN</td>
              <td>ELN*RS2071307</td>
              <td>Slightly increased risk of abdominal aortic aneurysm</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Bladder Cancer', 
      confidence: 3, 
      date: 'Nov 21, 2008', 
      details: (
        <div>
          <p>Bladder cancer is a common type of cancer that begins in the cells of the bladder.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>FGFR3</td>
              <td>FGFR3*RS121913483</td>
              <td>Slightly increased risk of bladder cancer</td>
            </tr>
            <tr>
              <td>TP53</td>
              <td>TP53*RS1042522</td>
              <td>Slightly increased risk of bladder cancer</td>
            </tr>
            <tr>
              <td>HRAS</td>
              <td>HRAS*RS769412</td>
              <td>Slightly increased risk of bladder cancer</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Brain Aneurysm', 
      confidence: 3, 
      date: 'Nov 21, 2008', 
      details: (
        <div>
          <p>A brain aneurysm is a bulge or ballooning in a blood vessel in the brain.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>COL1A2</td>
              <td>COL1A2*RS42524</td>
              <td>Slightly increased risk of brain aneurysm</td>
            </tr>
            <tr>
              <td>ELN</td>
              <td>ELN*RS2071307</td>
              <td>Slightly increased risk of brain aneurysm</td>
            </tr>
            <tr>
              <td>SOX17</td>
              <td>SOX17*RS9298506</td>
              <td>Slightly increased risk of brain aneurysm</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Chronic Lymphocytic Leukaemia', 
      confidence: 3, 
      date: 'Apr 9, 2008', 
      details: (
        <div>
          <p>Chronic lymphocytic leukemia (CLL) is a type of cancer of the blood and bone marrow.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>ATM</td>
              <td>ATM*RS1800057</td>
              <td>Slightly increased risk of CLL</td>
            </tr>
            <tr>
              <td>TP53</td>
              <td>TP53*RS1042522</td>
              <td>Slightly increased risk of CLL</td>
            </tr>
            <tr>
              <td>NOTCH1</td>
              <td>NOTCH1*RS3124591</td>
              <td>Slightly increased risk of CLL</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Stomach Cancer', 
      confidence: 3, 
      date: 'Jun 18, 2008', 
      details: (
        <div>
          <p>Stomach cancer, also known as gastric cancer, is a type of cancer that begins in the stomach.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>CDH1</td>
              <td>CDH1*RS1801552</td>
              <td>Slightly increased risk of stomach cancer</td>
            </tr>
            <tr>
              <td>MLH1</td>
              <td>MLH1*RS1800734</td>
              <td>Slightly increased risk of stomach cancer</td>
            </tr>
            <tr>
              <td>TP53</td>
              <td>TP53*RS1042522</td>
              <td>Slightly increased risk of stomach cancer</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Cleft Lip and Cleft Palate', 
      confidence: 3, 
      date: 'Jun 18, 2009', 
      details: (
        <div>
          <p>Cleft lip and cleft palate are openings or splits in the upper lip, the roof of the mouth (palate) or both.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>IRF6</td>
              <td>IRF6*RS2235371</td>
              <td>Slightly increased risk of cleft lip and cleft palate</td>
            </tr>
            <tr>
              <td>MSX1</td>
              <td>MSX1*RS12532</td>
              <td>Slightly increased risk of cleft lip and cleft palate</td>
            </tr>
            <tr>
              <td>PAX9</td>
              <td>PAX9*RS2073247</td>
              <td>Slightly increased risk of cleft lip and cleft palate</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Gout', 
      confidence: 2, 
      date: 'Apr 21, 2008', 
      details: (
        <div>
          <p>Gout is a form of inflammatory arthritis characterized by recurrent attacks of a red, tender, hot, and swollen joint.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>SLC2A9</td>
              <td>SLC2A9*RS6855911</td>
              <td>Slightly increased risk of gout</td>
            </tr>
            <tr>
              <td>ABCG2</td>
              <td>ABCG2*RS2231142</td>
              <td>Slightly increased risk of gout</td>
            </tr>
            <tr>
              <td>URAT1</td>
              <td>URAT1*RS3825018</td>
              <td>Slightly increased risk of gout</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Sjogren\'s Syndrome', 
      confidence: 2, 
      date: 'May 6, 2008', 
      details: (
        <div>
          <p>Sjogren's syndrome is a disorder of the immune system identified by its two most common symptoms — dry eyes and a dry mouth.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>STAT4</td>
              <td>STAT4*RS7574865</td>
              <td>Slightly increased risk of Sjogren's syndrome</td>
            </tr>
            <tr>
              <td>IRF5</td>
              <td>IRF5*RS2004640</td>
              <td>Slightly increased risk of Sjogren's syndrome</td>
            </tr>
            <tr>
              <td>IL12A</td>
              <td>IL12A*RS485499</td>
              <td>Slightly increased risk of Sjogren's syndrome</td>
            </tr>
          </table>
        </div>
      ) 
    },
    {
      name: 'Cellular Detoxification', 
      confidence: 3, 
      date: 'Nov 21, 2008', 
      details: (
        <div>
          <p>Glutathione S-transferase (GST) enzymes are responsible for cellular detoxification of many carcinogens and are important anticancer elements.</p>
          <table className="table-container">
            <tr className="subheader">
              <td>Gene</td>
              <td>Genotype</td>
              <td>What it means</td>
            </tr>
            <tr>
              <td>GSTM1</td>
              <td>GSTM1 (-/-)</td>
              <td>Null enzymatic activity</td>
            </tr>
            <tr>
              <td>GSTT1</td>
              <td>GSTT1 (-/-)</td>
              <td>Null enzymatic activity</td>
            </tr>
            <tr>
              <td>GSTP1</td>
              <td>GSTP1*C (I105V, A113V)</td>
              <td>Altered enzymatic activity</td>
            </tr>
          </table>
        </div>
      ) 
    }
  ],
  decreasedRisk: [
    { 
      name: 'Bitter Taste Perception', 
      confidence: 4, 
      date: 'Jun 25, 2009', 
      details: (
        <div>
          <p>Bitter taste perception is the ability to taste bitter compounds in food and drinks.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>TAS2R38</td>
              <td>TAS2R38*RS713598</td>
              <td>Decreased bitter taste perception</td>
            </tr>
            <tr>
              <td>TAS2R38</td>
              <td>TAS2R38*RS1726866</td>
              <td>Decreased bitter taste perception</td>
            </tr>
            <tr>
              <td>TAS2R38</td>
              <td>TAS2R38*RS10246939</td>
              <td>Decreased bitter taste perception</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Multiple Sclerosis', 
      confidence: 4, 
      date: 'Jul 23, 2009', 
      details: (
        <div>
          <p>Multiple sclerosis is a disease in which the immune system eats away at the protective covering of nerves.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>HLA-DRB1</td>
              <td>HLA-DRB1*1501</td>
              <td>Decreased risk of multiple sclerosis</td>
            </tr>
            <tr>
              <td>IL7R</td>
              <td>IL7R*RS6897932</td>
              <td>Decreased risk of multiple sclerosis</td>
            </tr>
            <tr>
              <td>IL2RA</td>
              <td>IL2RA*RS2104286</td>
              <td>Decreased risk of multiple sclerosis</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Atrial Fibrillation', 
      confidence: 3, 
      date: 'Feb 21, 2008', 
      details: (
        <div>
          <p>Atrial fibrillation is an irregular and often very rapid heart rhythm (arrhythmia) that can lead to blood clots in the heart.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>PRRX1</td>
              <td>PRRX1*RS3903239</td>
              <td>Decreased risk of atrial fibrillation</td>
            </tr>
            <tr>
              <td>KCNN3</td>
              <td>KCNN3*RS13376333</td>
              <td>Decreased risk of atrial fibrillation</td>
            </tr>
            <tr>
              <td>PITX2</td>
              <td>PITX2*RS6843082</td>
              <td>Decreased risk of atrial fibrillation</td>
            </tr>
          </table>
        </div>
      ) 
    },
    { 
      name: 'Alcohol Dependence', 
      confidence: 2, 
      date: 'Mar 18, 2009', 
      details: (
        <div>
          <p>Alcohol dependence is a medical condition characterized by an impaired ability to stop or control alcohol use despite adverse social, occupational, or health consequences.</p>
          <table className="table-container">
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>What it means</th>
            </tr>
            <tr>
              <td>ADH1B</td>
              <td>ADH1B*RS1229984</td>
              <td>Decreased risk of alcohol dependence</td>
            </tr>
            <tr>
              <td>ALDH2</td>
              <td>ALDH2*RS671</td>
              <td>Decreased risk of alcohol dependence</td>
            </tr>
            <tr>
              <td>GABRA2</td>
              <td>GABRA2*RS279858</td>
              <td>Decreased risk of alcohol dependence</td>
            </tr>
          </table>
        </div>
      ) 
    }
  ]
};


export let GLOBAL_CONFIG = {
  availableLocales:[  "en" ],
  defaultLocale:"es",
  locale: undefined,
  localStorageKey:"ESCAPP_23",
  restoreState:"AUTO",
  escapp:{
    //endpoint:"https://escapp.dit.upm.es/api/escapeRooms/306",
    localStorageKey: "escapp_23_and_you",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["en"],
      defaultLocale:"en",
      locales:ESCAPP_LOCALES,
    },
    appPuzzleIds:[5],
    notifications:false,
    rtc:true,
    forceValidation:false
  },
  ancestryData,
  riskData
};


