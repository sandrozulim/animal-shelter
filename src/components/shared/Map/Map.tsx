import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../constants/constants";
import classes from "./Map.module.scss";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>loading...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={{ lat: 43.5067, lng: 16.4395 }}
      mapContainerClassName={classes["map"]}
    ></GoogleMap>
  );
}

export default Map;
