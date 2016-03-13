import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SharePage} from './pages/share/share';
import {LocationPage} from './pages/location/location';
import {AboutUsPage} from './pages/aboutUs/aboutUs';
import {SettingsPage} from './pages/settings/settings';
import {FeedbackPage} from './pages/feedback/feedback';
import {Type} from 'angular2/core';


@App({
  templateUrl: 'build/app.html',
  config: {}
})
export class MyApp {
  rootPage: Type = TabsPage;
  menuLoginPage: LoginPage;
  menuSharePage: SharePage;
  menuAboutUsPage: AboutUsPage;
  menuSettingsPage: SettingsPage;
  menuFeedbackPage: FeedbackPage;
  locationService: LocationPage;
  constructor(public app: IonicApp, public menu: MenuController, platform: Platform) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      this.menuLoginPage = LoginPage;
      this.menuSharePage = SharePage;
      this.menuAboutUsPage = AboutUsPage;
      this.menuSettingsPage = SettingsPage;
      this.menuFeedbackPage = FeedbackPage;


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
