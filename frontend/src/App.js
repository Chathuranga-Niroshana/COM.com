import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import ProductCategory from "./pages/Product Category/ProductCategory.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import { useParams } from "react-router-dom";
import { CartProvider } from "./context/ProductContext.jsx";

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DefaultLayout>
                  <Profile />
                </DefaultLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <DefaultLayout>
                  <Cart />
                </DefaultLayout>
              }
            />
            <Route
              path="/about"
              element={
                <DefaultLayout>
                  <About />
                </DefaultLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <DefaultLayout>
                  <Contact />
                </DefaultLayout>
              }
            ></Route>
            <Route
              path="/laptop"
              element={
                <DefaultLayout>
                  <ProductCategory category="laptop" />
                </DefaultLayout>
              }
            />
            <Route
              path="/desktop"
              element={
                <DefaultLayout>
                  <ProductCategory category="desktop" />
                </DefaultLayout>
              }
            />
            <Route
              path="/accessories"
              element={
                <DefaultLayout>
                  <ProductCategory category="Accessories" />
                </DefaultLayout>
              }
            />

            <Route
              path="/product"
              element={
                <DefaultLayout>
                  <Product />
                </DefaultLayout>
              }
            >
              <Route
                path=":id"
                element={
                  <DefaultLayout>
                    <Product />
                  </DefaultLayout>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;