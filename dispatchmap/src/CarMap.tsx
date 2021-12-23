import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription

  return (
    <LoadScript googleMapsApiKey="NEED_KEY_HERE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }}
        zoom={12}
      >
        {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */}
      </GoogleMap>
    </LoadScript>
  );
};

export default CarMap;
