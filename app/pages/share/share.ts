import {Page, Platform} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/share/share.html',
})
export class SharePage {
	constructor(platform: Platform) {
        this.platform = platform;
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
