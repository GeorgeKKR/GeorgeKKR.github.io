import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.css";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <HelmetProvider>
      <div className="app-wrapper container-fluid-no-padding">
        <Router basename={process.env.PUBLIC_URL}>
          <div className="cursor__dot">
            <AnimatedCursor
              innerSize={15}
              outerSize={15}
              color="255, 255 ,255"
              outerAlpha={0.4}
              innerScale={0.7}
              outerScale={5}
            />
          </div>
          <ScrollToTop>
            <Headermain />
            <AppRoutes />
          </ScrollToTop>
        </Router>
      </div>
    </HelmetProvider>
  );
}
