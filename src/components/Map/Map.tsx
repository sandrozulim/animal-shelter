import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import classes from "./Map.module.scss";

function Map() {
  const mapsKey = import.meta.env.VITE_REACT_MAPS_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapsKey,
  });

  if (!isLoaded) return <div>loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName={classes["map-container"]}
    ></GoogleMap>
  );
}

export default Map;
