import {Page} from 'ionic-angular';
import {NgZone, Injectable, EventEmitter} from 'angular2/core';
import {Events} from 'ionic-angular/util/events';
import {Geolocation} from 'ionic-native';
declare var Parse: any;

@Injectable()
export class OffersCategory {
  _emitter: EventEmitter<boolean> = new EventEmitter();
  rxEmitter: any;
  Offer: any;
  offers: any;
  pointOfInterest = {};
  get() {
    return this.offers;
  }
  constructor() {
    this.rxEmitter = this._emitter;
    this.Offer = new Parse.Object.extend("Offer");
  }
  getOffersByCat(category) {
    var e = new Events();
    var query = new Parse.Query(this.Offer);
    query.equalTo("category", category);
    query.find().then(function (results){
        e.publish('offerbycat:queried', results);
    });
    e.subscribe('offerbycat:queried', (results) => {
      for (var i = 0; i < results[0].length; i++) {
        results[0][i].increment("views");
        this.pointOfInterest[results[0][i].id] = {
          'id': results[0][i].id,
          'title': results[0][i].get('title'),
          'description' : results[0][i].get('description'),
          'point' : results[0][i].get('point'),
          'radius' : results[0][i].get('radius'),
          'category' : results[0][i].get('category')
        }
        results[0][i].save();
      }
      console.log(this.pointOfInterest);
      this.offers = Object.keys(this.pointOfInterest).map(key => this.pointOfInterest[key]);
      this.rxEmitter.next(true)
    });
  }
}
