import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps/ngx';

import { MapInstance } from '../map/map-instance';
import { MapService } from '../map/services/map.service';
import { Platform } from '@ionic/angular';

const MAP_ID = 'REQUESTS_MAP_2';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy, AfterViewInit {

  private mapInstance: MapInstance;

  constructor(private mapService: MapService, private platform: Platform) { }

  ngOnInit() {
    this.loadMap();
    console.log('onInit() Tab 2');
  }

  ngAfterViewInit() {
    console.log('afterViewInit() Tab 2');
  }

  ngOnDestroy() {
    console.log('onDestroy() Tab 2');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter() Tab 2');
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter() Tab 2');
    await this.platform.ready();
    await this.mapInstance.show();

    // await this.mapInstance.nativeMapObject.one(GoogleMapsEvent.MAP_READY);
    console.log('Map ready (Tab 2)');
  }

  async ionViewWillLeave() {
    console.log('ionViewWillLeave() Tab 2');
    await this.mapInstance.hide();
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave() Tab 2');
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

    this.mapInstance = this.mapService.addMap(MAP_ID, 'map_canvas_2', mapOptions);
  }

  public async hideShow() {
    if (this.mapInstance.nativeMapObject.getDiv()) {
      await this.mapInstance.hide();
    } else {
      await this.mapInstance.show();
    }
  }

}
