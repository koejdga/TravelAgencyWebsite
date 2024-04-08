import React from "react";
import MyCarousel from "./Carousel";
import Button from "react-bootstrap/Button";
import Testimonials from "./Testimonials";
import "./MainPage.css";
import { api } from "../config";
const Trips = React.lazy(() => import(`../${api}_middleware/Trips`));
// import Trips from "../graphql_middleware/Trips";

function MainPage() {
  return (
    <main>
      <section className="hero">
        <MyCarousel />
        <div style={{ color: "white" }}>
          <h2>We are a digital agency that grows business right</h2>
          <p>
            Серед можливих подорожей є Іспанія, Італія, Таїланд, Туреччина
            Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
            quis viverra ornare, eros dolor interdum nulla.
          </p>
          <Button variant="outline-light">
            <a
              href="#trips"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Переглянути всі
            </a>
          </Button>{" "}
        </div>
      </section>
      <section id="testimonials">
        <h2>Відгуки</h2>
        <Testimonials />
      </section>
      <div className="separator"></div>
      <section id="trips">
        <h2>Поїздки</h2>
        <Trips />
      </section>
    </main>
  );
}

export default MainPage;
