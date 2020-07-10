import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps/ngx';

import { MapInstance } from '../map/map-instance';
import { MapService } from '../map/services/map.service';
import { Platform } from '@ionic/angular';

const MAP_ID = 'REQUESTS_MAP_1';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy, AfterViewInit {

  private mapInstance: MapInstance;

  constructor(private mapService: MapService, private platform: Platform) { }

  ngOnInit() {
    console.log('onInit() Tab 1');
    this.loadMap();
  }

  ngAfterViewInit() {
    console.log('afterViewInit() Tab 1');
  }

  ngOnDestroy() {
    console.log('onDestroy() Tab 1');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter() Tab 1');
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter() Tab 1');
    await this.platform.ready();
    await this.mapInstance.show();

    // await this.mapInstance.nativeMapObject.one(GoogleMapsEvent.MAP_READY);
    console.log('Map ready (Tab 1)');
  }

  async ionViewWillLeave() {
    await this.mapInstance.hide();
    console.log('ionViewWillLeave() Tab 1');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave() Tab 1');
  }

  private async loadMap(): Promise<void> {
    await this.platform.ready();

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 52.6539112,
          lng: 8.1361788
        },
        zoom: 8,
        tilt: 0,
      },
    };

    this.mapInstance = this.mapService.addMap(MAP_ID, 'map_canvas_1', mapOptions);
  }

  public async hideShow() {
    if (this.mapInstance.nativeMapObject.getDiv()) {
      await this.mapInstance.hide();
    } else {
      await this.mapInstance.show();
    }
  }

}
