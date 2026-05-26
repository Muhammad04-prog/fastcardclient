import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/layout";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const About = lazy(() => import("./pages/about"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const Products = lazy(() => import("./pages/products"));
const Detail = lazy(() => import("./pages/detail"));
const Cart = lazy(() => import("./pages/cart"));
const Wishlist = lazy(() => import("./pages/wishlist"));
const Account = lazy(() => import("./pages/account"));
const Checkout = lazy(() => import("./pages/checkout"));
const NotFound = lazy(() => import("./pages/notfound"));

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
