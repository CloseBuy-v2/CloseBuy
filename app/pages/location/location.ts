import {Page} from 'ionic-angular';
import {Events} from 'ionic-angular/util/events';
import {Geolocation} from 'ionic-native';
declare var Parse: any;

@Page({
  templateUrl: 'build/pages/location/location.html',
})
export class LocationPage {
  offers = [];
  pointOfInterest = {};
  offersList = [];
  prevLoc: any;
  radius;
  limitResults: number;
  offerUpdateFlag: boolean;
  option: any;
  Offer;
  events: Events;
  constructor() {
    this.offers = [];
    this.option = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
    };
    this.radius = {
        user: 0.050,
        globalR: 0.1
    };
    this.offerUpdateFlag = true;
    this.limitResults = 20;
    this.offersList = [];
    this.Offer = new Parse.Object.extend("Offer");
    this.events = new Events();
  }
  getGeoPoint(location) {
    return new Parse.GeoPoint(location);
  }
  getPOI(currentLoc) {
    for(var i=0; i < this.offersList.length; i++) {
      if( currentLoc.kilometersTo(this.offersList[i].get("point"))
                  <= this.offersList[i].get("radius") + this.radius.user) {
        this.pointOfInterest[this.offersList[i].id] = {
          'id': this.offersList[i].id,
          'title': this.offersList[i].get('title'),
          'description' : this.offersList[i].get('description'),
          'point' : this.offersList[i].get('point'),
          'radius' : this.offersList[i].get('radius')
        };
      }
    }
  }
  updateLocation() {
    Geolocation.watchPosition(this.option).subscribe((data) => {
      var e = new Events();
      var currentLoc = new Parse.GeoPoint([data.coords.latitude, data.coords.longitude]);
      if (this.offerUpdateFlag) {
          this.offerUpdateFlag = !this.offerUpdateFlag;
          this.prevLoc = currentLoc;
          var query = new Parse.Query(this.Offer);
          query.withinKilometers("point", currentLoc, this.radius.globalR);
          query.limit(this.limitResults);
          query.find().then(function (result){
            e.publish('offer:queried', result);
          });
      }
      e.subscribe('offer:queried', (result) => {
        console.log(result);
        this.offersList = result;
        this.getPOI(currentLoc);
      });
      if(currentLoc.kilometersTo(this.prevLoc) >= this.radius.globalR) {
        this.offerUpdateFlag = true;
      }
    })
  }
}
