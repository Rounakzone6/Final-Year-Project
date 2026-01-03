import { useContext, useState, useRef, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useApiIsLoaded,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import AppContext from "../contexts/AppContext";

const Search = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  
  const searchRef = useRef(null);
  const { mapId } = useContext(AppContext);
  const apiIsLoaded = useApiIsLoaded();
  const placesLibrary = useMapsLibrary("places");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!apiIsLoaded || !placesLibrary || !searchRef.current) return;
    searchRef.current.innerHTML = "";

    const autocomplete = new placesLibrary.PlaceAutocompleteElement();
    searchRef.current.appendChild(autocomplete);

    const handleSelect = async (event) => {
      const place = await event.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["location", "displayName", "formattedAddress", "rating"],
      });

      if (place.location) {
        const coords = place.location.toJSON();
        setMapCenter(coords);
        setPlaceDetails({
          name: place.displayName,
          address: place.formattedAddress,
          rating: place.rating,
        });
        console.log("Full Place Object:", place);
      }
    };

    autocomplete.addEventListener("gmp-select", handleSelect);

    return () => autocomplete.removeEventListener("gmp-select", handleSelect);
  }, [apiIsLoaded, placesLibrary]);

  return (
    <div
      style={{
        height: "50vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "3px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
        <div
          ref={searchRef}
          style={{ width: "100%", maxWidth: "400px", border: "1px" }}
        />

        {/* Display selected location details */}
        {placeDetails && (
          <div style={{ marginTop: "10px", fontSize: "14px" }}>
            <strong>{placeDetails.name}</strong>
            <p style={{ margin: "4px 0" }}>{placeDetails.address}</p>
            {placeDetails.rating && <span>Rating: {placeDetails.rating}</span>}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <Map
          defaultZoom={15}
          center={mapCenter}
          mapId={mapId}
          // gestureHandling="greedy"
          // disableDefaultUI
        >
          <AdvancedMarker position={mapCenter} />
        </Map>
      </div>
    </div>
  );
};

const Google = () => (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
    <Search />
  </APIProvider>
);

export default Google;
