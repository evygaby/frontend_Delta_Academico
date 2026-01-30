import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import 'remixicon/fonts/remixicon.css';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { licenseKey } from './devextreme-license';
import config from 'devextreme/core/config';
if (environment.production) {
  enableProdMode();
}
config({ licenseKey })

// -------------------------
// Configuración de cultura
// -------------------------
import { loadMessages, locale } from 'devextreme/localization';
import Globalize from 'globalize';

// CLDR JSON
import likelySubtags from 'cldr-data/supplemental/likelySubtags.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import currencyData from 'cldr-data/supplemental/currencyData.json';
import esNumbers from 'cldr-data/main/es-EC/numbers.json';
import esCurrencies from 'cldr-data/main/es-EC/currencies.json';

// Mensajes DevExtreme en español
import esMessages from 'devextreme/localization/messages/es.json';

// Cargar CLDR en Globalize
Globalize.load(likelySubtags, numberingSystems, currencyData, esNumbers, esCurrencies);
Globalize.locale('es-EC');

// Cargar mensajes de DevExtreme
loadMessages(esMessages);
locale('es-EC');

// -------------------------
// Arrancar Angular
// -------------------------

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
