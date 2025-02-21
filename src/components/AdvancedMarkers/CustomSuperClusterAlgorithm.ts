import { AlgorithmInput, Cluster, SuperClusterAlgorithm, SuperClusterOptions } from '@googlemaps/markerclusterer';

export class CustomSuperClusterAlgorithm extends SuperClusterAlgorithm {
  constructor(options: SuperClusterOptions) {
    super(options);
  }

  cluster(input: AlgorithmInput): Cluster[] {
    const clusters = super.cluster(input) as Cluster[];

    return clusters.filter((cluster) => {
      const center = cluster.position;

      return (
        cluster.markers?.every((marker: any) => {
          const markerPosition = marker.getPosition();
          if (!markerPosition) return false;

          const distance = google.maps.geometry.spherical.computeDistanceBetween(center, markerPosition);
          return distance <= 100;
        }) ?? false
      );
    });
  }
}
