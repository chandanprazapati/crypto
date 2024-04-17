import { Routes, Route } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import Exchange from "./components/Exchange";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Coins" element={<Coins />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/Coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
