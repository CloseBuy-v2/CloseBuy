import {Page} from 'ionic-angular';
import {NgZone, Injectable, EventEmitter} from 'angular2/core'; // Remove NgZone
import {Events} from 'ionic-angular/util/events';
import {Geolocation} from 'ionic-native';
declare var Parse: any;

@Injectable()
export class Offers {
  static get parameters(){
    return [NgZone];
  }
  get() {
    return this.offers;
  }
  _emitter: EventEmitter<boolean> = new EventEmitter();
  rxEmitter: any;
  offers: any;
  pointOfInterest = {};
  offersList = [];
  prevLoc: any;
  radius;
  limitResults: number;
  offerUpdateFlag: boolean;
  option: any;
  Offer;
  events: Events;
  private zone;
  constructor(ngZone) { // Remove NgZone Here
    this.rxEmitter = this._emitter;
    this.zone = ngZone;
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
    this.updateLocation();
  }
  getGeoPoint(location) {
    return new Parse.GeoPoint(location);
  }
  getPOI(currentLoc) {
    this.zone.run(() => { // Not sure if I need this zone anymore [try removing it]
      for(var i=0; i < this.offersList[0].length; i++) {
        if( currentLoc.kilometersTo(this.offersList[0][i].get("point"))
                    <= this.offersList[0][i].get("radius") + this.radius.user) {
          this.pointOfInterest[this.offersList[0][i].id] = {
            'id': this.offersList[0][i].id,
            'title': this.offersList[0][i].get('title'),
            'description' : this.offersList[0][i].get('description'),
            'point' : this.offersList[0][i].get('point'),
            'radius' : this.offersList[0][i].get('radius')
          };
        }
      }
      var e = new Events(); // Clean
      e.publish('user:created', currentLoc); // Clean
      this.offers = Object.keys(this.pointOfInterest).map(key => this.pointOfInterest[key]);
      this.rxEmitter.next(true);
    });
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
        this.offersList = result;
        this.getPOI(currentLoc);
      });
      if(currentLoc.kilometersTo(this.prevLoc) >= this.radius.globalR) {
        this.offerUpdateFlag = true;
      }
    })
  }
}
