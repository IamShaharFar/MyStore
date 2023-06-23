import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Cart from "./components/Cart"
import "./App.css";
import NavBar from "./components/NavBar";
import AboutUs from './components/AboutUs';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
        </Routes>
      </Router>
      {/* <NavBar />
      <Banner />
      <Products />
      <Benefits /> */}
    </div>
  );
}

export default App;
