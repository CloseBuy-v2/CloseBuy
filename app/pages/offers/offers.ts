import {Page, NavController, NavParams} from 'ionic-angular';
import {OffersCategory} from '../../services/OffersCategories';
import {Events} from 'ionic-angular/util/events';
declare var Parse: any;


@Page({
  templateUrl: 'build/pages/offers/offers.html'
})
export class OffersPage {
  selectedItem: any;
  private offersArray: any;
  offers: OffersCategory;
  constructor(private nav: NavController, navParams: NavParams) {
    this.offers = new OffersCategory();
    this.selectedItem = navParams.get('item');
    this.offers.getOffersByCat(this.selectedItem);
    this.offers.rxEmitter.subscribe((done) => {
       this.offersArray = this.offers.get();
    });
  }
  goBack() {
    this.nav.pop();
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.offersArray = this.offers.get();
      refresher.complete();
   }, 1000);
  }
}
