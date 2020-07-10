import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps/ngx';

import { MapOptions } from './map-options';

export class MapInstance {

  private options: MapOptions;

  public nativeMapObject: GoogleMap;

  constructor(mapId: string, div: string, options?: GoogleMapOptions) {
    this.options = {
      mapId,
      element: div,
      options: options ? options : null
    };
  }

  public get id(): string {
    return this.options.mapId;
  }

  public get mapOptions(): GoogleMapOptions {
    return this.options.options;
  }

  public set mapOptions(options: GoogleMapOptions) {
    this.options.options = options;
  }

  public async show() {
    console.log(this.options);
    if (this.options) {
      if (this.nativeMapObject) {
        if (!this.nativeMapObject.getDiv()) {
          console.log('set div for map', this.options.element);
          await this.nativeMapObject.setDiv(this.options.element);
        }
      } else {
        console.log('create new map', this.options.element);
        this.nativeMapObject = GoogleMaps.create(this.options.element, this.options.options);
        await this.nativeMapObject.one(GoogleMapsEvent.MAP_READY);
      }
    }
  }

  public async hide() {
    console.log(this.options);
    if (this.options && this.nativeMapObject) {
      console.log('hide map', this.options.element);
      await this.nativeMapObject.setDiv(null);
    }
  }

}
