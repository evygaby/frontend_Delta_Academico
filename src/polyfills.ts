import '@angular/localize/init';
import 'zone.js';
import 'intersection-observer';
(window as any).global = window;

// Globalize
import Globalize from "globalize";
(window as any).Globalize = Globalize;
// CLDR JSONs
import likelySubtags from "cldr-data/supplemental/likelySubtags.json";
import numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import currencyData from "cldr-data/supplemental/currencyData.json";
import esNumbers from "cldr-data/main/es-EC/numbers.json";
import esCurrencies from "cldr-data/main/es-EC/currencies.json";
import esCaGregorian from 'cldr-data/main/es-EC/ca-gregorian.json';
// Mensajes DevExtreme
import esMessages from "devextreme/localization/messages/es.json";
import { loadMessages, locale } from "devextreme/localization";

// Cargar CLDR en Globalize
Globalize.load(likelySubtags, numberingSystems, currencyData, esNumbers, esCurrencies,esCaGregorian);

// Configurar Globalize
Globalize.locale("es-EC");

// Cargar mensajes DevExtreme
loadMessages(esMessages);
locale("es-EC");
