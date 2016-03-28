import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {Type} from 'angular2/core';
import {Offers} from './services/OffersService';
import {OffersCategory} from './services/OffersCategories';
import {StatusBar} from 'ionic-native';

@App({
  templateUrl: 'build/app.html',
  providers: [Offers, OffersCategory],
  config: {}
})
export class MyApp {
  rootPage: Type = TabsPage;
  constructor(public app: IonicApp, public menu: MenuController, platform: Platform) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      StatusBar.styleDefault();
    });
  }
}
