import {Page, NavController} from 'ionic-angular';
import {OffersCategory} from '../../services/OffersCategories';
import {OffersPage} from '../offers/offers';

@Page({
  templateUrl: 'build/pages/categories/categories.html',
})
export class CategoriesPage {
  nav: NavController;
  constructor(nav: NavController) {
    this.nav = nav;
  }
  onCatClick(event, _category) {
    this.nav.push(OffersPage, {
      item: _category
    });

  }
}
