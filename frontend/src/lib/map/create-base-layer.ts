import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

type BaseLayer =
  | {
      layer: TileLayer<XYZ>;
      provider: "vworld";
    }
  | {
      layer: TileLayer<OSM>;
      provider: "osm";
    };

export function createBaseLayer(apiKey?: string): BaseLayer {
  if (apiKey) {
    return {
      layer: new TileLayer({
        source: new XYZ({
          url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`,
          crossOrigin: "anonymous",
          maxZoom: 19,
        }),
      }),
      provider: "vworld",
    };
  }

  return {
    layer: new TileLayer({
      source: new OSM(),
    }),
    provider: "osm",
  };
}
