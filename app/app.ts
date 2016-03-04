import {App, Platform, MenuController, IonicApp} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {Type} from 'angular2/core';


@App({
  templateUrl: 'build/app.html',
  config: {}
})
export class MyApp {
  rootPage: Type = TabsPage;
  menuLoginPage: LoginPage;
  menuSignupPage: SignupPage;
  constructor(public app: IonicApp, public menu: MenuController, platform: Platform) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      this.menuLoginPage = LoginPage;
      this.menuSignupPage = SignupPage;
    });
  }
  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
