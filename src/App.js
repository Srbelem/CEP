import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Listing />
    </BrowserRouter>
  );
}

export default App;