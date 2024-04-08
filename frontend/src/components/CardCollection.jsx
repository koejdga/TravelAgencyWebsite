import React from "react";
import TravelCard from "./TravelCard";
import "./CardCollection.css";

function CardCollection({ trips }) {
  return (
    <div className="collection">
      {trips.map((trip) => (
        <TravelCard trip={trip} key={trip.id} />
      ))}
    </div>
  );
}

export default CardCollection;
