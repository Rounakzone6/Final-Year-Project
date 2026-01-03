import { useContext } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import AppContext from "../contexts/AppContext";

const PlaceMap = ({ center }) => {
  const { googleApiKey, mapId } = useContext(AppContext);

  return (
    <APIProvider apiKey={googleApiKey}>
      <Map
        style={{ height: "100%", width: "100%" }}
        defaultCenter={center}
        defaultZoom={15}
        mapId={mapId}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <AdvancedMarker position={center} />
      </Map>
    </APIProvider>
  );
};

export default PlaceMap;
