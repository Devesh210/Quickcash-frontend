import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import runtime from "./config/runtime";

const Home = lazy(() => import("./components/Home"));
const Header = lazy(() => import("./components/common/Header"));
const Services = lazy(() => import("./components/Services/Services"));
const Homebanner = lazy(() => import("./components/Bannerhome/Homebanner"));
const Howitworks = lazy(() => import("./components/Howitworks"));
const Ourpriority = lazy(() => import("./components/Ourpriority"));
const Footer = lazy(() => import("./components/common/Footer"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const Watch = lazy(() => import("./components/Watchservice/Watch"));
const Thankyou = lazy(() => import("./components/Welcome/Thankyou"));
const Bag = lazy(() => import("./components/Bagservice/Bag"));
const Electronics = lazy(() => import("./components/Electronicsservice/Electronics"));
const Sellbuyback = lazy(() => import("./components/SellBuyBack/Sellbuyback"));
const Userdashboard = lazy(() => import("./components/Dashboard/Userdashboard"));
const MyProfile = lazy(() => import("./components/Dashboard/MyProfile"));
const ChangePassword = lazy(() => import("./components/Dashboard/ChangePassword"));
const Viewenquiry = lazy(() => import("./components/Dashboard/Viewenquiry"));
const Termscondition = lazy(() => import("./components/common/Termscondition"));
const Privacypolicy = lazy(() => import("./components/common/Privacypolicy"));
const Faqs = lazy(() => import("./components/common/Faqs"));
const Faq = lazy(() => import("./components/common/Faq"));
const Otpverify = lazy(() => import("./components/Register/Otpverify"));
const ForgotPassword = lazy(() =>
  import("./components/Forgot_Password/Forgotpassword")
);

const PageLoader = () => <div className="page-loader" />;

const routes = [
  { path: "/Header", component: Header },
  { path: "/Homebanner", component: Homebanner },
  { path: "/Services", component: Services },
  { path: "/Howitworks", component: Howitworks },
  { path: "/Ourpriority", component: Ourpriority },
  { path: "/Testimonials", component: Testimonials },
  { path: "/Footer", component: Footer },
  { path: "/Login", component: Login },
  { path: "/ForgotPassword", component: ForgotPassword },
  { path: "/Register", component: Register },
  { path: "/verifyotp", component: Otpverify },
  { path: "/Watch", component: Watch },
  { path: "/Bag", component: Bag },
  { path: "/Electronics", component: Electronics },
  { path: "/Thankyou", component: Thankyou },
  { path: "/Sellbuyback", component: Sellbuyback },
  { path: "/Userdashboard", component: Userdashboard },
  { path: "/MyProfile", component: MyProfile },
  { path: "/ChangePassword", component: ChangePassword },
  { path: "/Viewenquiry", component: Viewenquiry },
  { path: "/Termscondition", component: Termscondition },
  { path: "/Privacypolicy", component: Privacypolicy },
  { path: "/Faqs", component: Faqs },
  { path: "/Faq", component: Faq },
  { path: "/", component: Home, exact: true },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={runtime.routerBaseName}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
