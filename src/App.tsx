import Page from "./components/MapComponent/MapComponent";
import { APIProvider } from "@vis.gl/react-google-maps";
// import { ClustererExample } from "./components/markers/ClustererExample";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => {
  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Page />
      </APIProvider>
      {/* <ClustererExample/> */}
      {/*  this is example how to add  marker clustering
      it didn't works when we add new markers to the map */}
    </>
  );
};

export default App;
