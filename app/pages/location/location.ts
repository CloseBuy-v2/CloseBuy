import {Page} from 'ionic-angular';
import {Offers} from '../../services/OffersService';
declare var Parse: any;

@Page({
  templateUrl: 'build/pages/location/location.html'
})
export class LocationPage {
  offersArray: any;
  constructor(
    public offers: Offers
  ) {
      offers.rxEmitter.subscribe((done) => {
        this.offersArray = this.offers.get();
      });
    }
  doRefresh(refresher) {
    setTimeout(() => {
      this.offersArray = this.offers.get();
      refresher.complete();
   }, 1000);
  }
}
