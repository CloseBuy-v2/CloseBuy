import {App, Platform, MenuController, IonicApp} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {SharePage} from './pages/share/share';
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


  share(message, subject, file, link) {
        this.platform.ready().then(() => {
            if(window.plugins.socialsharing) {
                window.plugins.socialsharing.share(message, subject, file, link);
            }
        });
    }
 
  shareViaTwitter(message, image, link) {
        this.platform.ready().then(() => {
            if(window.plugins.socialsharing) {
                window.plugins.socialsharing.canShareVia("twitter", message, null, image, link, function(result) {
                    window.plugins.socialsharing.shareViaTwitter(message, image, link);
                }, function(error) {
                    console.error(error);
                });
            }
        });
    }
}
