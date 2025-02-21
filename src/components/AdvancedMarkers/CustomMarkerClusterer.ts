import { MarkerClusterer, MarkerClustererOptions } from '@googlemaps/markerclusterer';

export default class CustomMarkerClusterer extends MarkerClusterer {
  constructor(options: MarkerClustererOptions) {
    super(options);
  }

  getClusters() {
    return this.clusters;
  }
}
