import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm, RegisterFrom } from "./components";
import Homepage from "./container/Homepage";
import Collection from "./container/Collection";
import CollectionTest from "./container/CollectionTest";
import { LoadingProvider } from "./components/LoadingContext";
import Products from "./container/Products";
import CartPage from "./container/CartPage";
import CustomerShipping from "./container/CustomerShipping";
import PaymentPage from "./container/PaymentPage";
import Account from "./container/Account";
const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <Routes>
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterFrom />} />
          <Route path="/Collection/" element={<Collection />} />
          <Route
            path="/collection/:category/:nameCategory"
            element={<Collection />}
          />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/LoginUser" element={<LoginForm />} />
          <Route path="/Products/:id" element={<Products />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/Customer" element={<CustomerShipping />} />
          <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
          <Route path="/Account" element={<Account></Account>}></Route>
          <Route
            path="/CollectionTest"
            element={<CollectionTest></CollectionTest>}
          ></Route>
        </Routes>
      </LoadingProvider>
    </Router>
  );
};

export default App;
