import { GoogleMapOptions } from '@ionic-native/google-maps/ngx';

export interface MapOptions {
  mapId: string;
  element: string;
  options: GoogleMapOptions;
}
