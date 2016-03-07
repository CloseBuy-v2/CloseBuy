import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {SharePage} from './pages/share/share';
import {LocationPage} from './pages/location/location';
import {Type} from 'angular2/core';


@App({
  templateUrl: 'build/app.html',
  config: {}
})
export class MyApp {
  rootPage: Type = TabsPage;
  menuLoginPage: LoginPage;
  menuSignupPage: SignupPage;
  menuSharePage: SharePage;
  locationService: LocationPage;
  constructor(public app: IonicApp, public menu: MenuController, platform: Platform) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      this.menuLoginPage = LoginPage;
      this.menuSignupPage = SignupPage;
      this.menuSharePage = SharePage;
    });
  }
  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
var locationService = new LocationPage();
locationService.updateLocation();
