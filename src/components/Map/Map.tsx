import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../constants/constants";
import classes from "./Map.module.scss";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName={classes["map"]}
    ></GoogleMap>
  );
}

export default Map;
