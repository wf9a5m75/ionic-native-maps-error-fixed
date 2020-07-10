import { Environment, GoogleMapOptions } from '@ionic-native/google-maps/ngx';

import { Injectable } from '@angular/core';
import { MapInstance } from '../map-instance';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private maps: MapInstance[] = [];

  constructor(private platform: Platform) {
    this.setEnvironment();
  }

  private async setEnvironment(): Promise<void> {
    await this.platform.ready();

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: environment.googleMapKey,
      API_KEY_FOR_BROWSER_DEBUG: environment.googleMapKey
    });
  }

  public addMap(mapId: string, element: string, options?: GoogleMapOptions) {
    console.log('MapService.addMap()');
    if (!this.hasMap(mapId)) {
      const mapInst = new MapInstance(mapId, element, options);
      this.maps.push(mapInst);
      return mapInst;
    }
    return this.getMapInstance(mapId);
  }

  public removeMap(map: MapInstance | string) {
    this.maps = this.maps.filter(mapEl => {
      return map instanceof MapInstance ? mapEl !== map : mapEl.id !== map;
    });
  }

  public hasMap(mapId: string): boolean {
    return this.getMapInstance(mapId) !== undefined;
  }

  public getMapInstance(map: MapInstance | string): MapInstance {
    return this.maps.find(mapEl => {
      return map instanceof MapInstance ? mapEl === map : mapEl.id === map;
    });
  }
}
