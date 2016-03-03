import {App, MenuController, IonicApp} from 'ionic/ionic';
import {LoginPage} from 'build/pages/login/login';
//import {SignupPage} from 'signup';

import {Type} from 'angular2/core';

@App({
  //template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'build/pages/login/login.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
  class MyApp {

  constructor(app: IonicApp, menu: MenuController) {
    this.app = app;
    this.menu = menu;
    this.loginPage = LoginPage;
    //this.signupPage = SignupPage;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
