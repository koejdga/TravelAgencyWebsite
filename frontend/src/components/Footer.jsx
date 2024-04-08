import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div className="container">
        <p>© 2022 Company, Inc</p>

        <div className="socials">
          <a
            href="https://de-de.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </Navbar>
  );
}

export default Footer;
