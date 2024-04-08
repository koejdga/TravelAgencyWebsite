import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./TravelCard.css";

const yes = <FontAwesomeIcon icon={faCheck} className="icon checkmark" />;
const no = <FontAwesomeIcon icon={faXmark} className="icon xmark" />;

function TravelCard({ trip }) {
  return (
    <div className="travel-card">
      <h4 className="header">{trip.trip_name}</h4>
      <div className="main">
        <div className="one-line">
          <p className="country">
            {trip.city}, {trip.country}
          </p>
          <p className="price">{trip.price / 100} грн.</p>
        </div>
        <p className="p-with-icon">Готель: {trip.hotel ? yes : no}</p>
        <p className="p-with-icon">Ресторан: {trip.restaurant ? yes : no}</p>
        {trip.desctiption && (
          <>
            <p className="description-header">Опис</p>
            <p>{trip.desctiption}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default TravelCard;
