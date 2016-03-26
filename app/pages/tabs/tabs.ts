import {Page} from 'ionic-angular';
import {CategoriesPage} from '../categories/categories';
import {LocationPage} from '../location/location';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = CategoriesPage;
  tab2Root: any = LocationPage;
}
