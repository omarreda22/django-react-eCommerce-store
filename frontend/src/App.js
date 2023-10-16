import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer"

import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileChangePassword from "./pages/ProfileChangePassword";
import Shipping from "./pages/Shipping";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Header/>
      <div className="container main p-5">
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/product/:slug" Component={ProductDetails}/>
          <Route path="/cart/:slug?" Component={Cart}/>
          <Route path="/shipping" Component={Shipping}/>
          <Route path="/checkout" Component={Checkout}/>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/profile" Component={Profile}/>
          <Route path="/settings" Component={ProfileSettings} />
          <Route path="/change_password" Component={ProfileChangePassword}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
