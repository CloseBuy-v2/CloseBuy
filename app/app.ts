import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {LocationPage} from './pages/location/location';
import {AboutUsPage} from './pages/aboutUs/aboutUs';
import {SettingsPage} from './pages/settings/settings';
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
  menuLoginPage: LoginPage;
  menuAboutUsPage: AboutUsPage;
  menuSettingsPage: SettingsPage;
  locationService: LocationPage;
  constructor(public app: IonicApp, public menu: MenuController, platform: Platform) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      this.menuLoginPage = LoginPage;
      this.menuAboutUsPage = AboutUsPage;
      this.menuSettingsPage = SettingsPage;
      StatusBar.styleDefault();
    });
  }
  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
