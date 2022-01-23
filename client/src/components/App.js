import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./pages/Home";
import NewPassword from "./pages/NewPassword";
import Product from "./pages/Products";
import Reset from "./pages/Reset";
import SellProduct from "./pages/SellProduct";
import ShoppingCard from "./pages/ShoppingCard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<ShoppingCard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sellproduct" element={<SellProduct />} />
        <Route path="/product/:catagory" element={<Product />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/reset/:token" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
