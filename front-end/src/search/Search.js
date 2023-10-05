import React, {useState} from "react";
import {search} from "../utils/api";
import Reservation from "../reservation/Reservation";
import "./search.css";

export default function Search() {
  const [formData, setFormData] = useState("");
  const [result, setResult] = useState([]);
  const changeHandler = (event) => {
    setFormData(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    search(formData).then(setResult);
  };

  function reservationCardClass(reservation) {
    if (reservation.status === "booked") {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  }
  return (
    <div className="container-search">
      <form onSubmit={submitHandler}>
        <h1 className="p-4">Find Reservation</h1>
        <div className="form-group">
          <label htmlFor="mobile_number">Search by Phone Number</label>
          <input
            className="form-control search-input"
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={FormData.mobile_number}
            onChange={changeHandler}
          />
        </div>
        <button className="button button-search mb-4" type="submit">
          Find
        </button>
      </form>
      <div className="d-flex flex-wrap">
        {result.length > 0 ? (
          result.map((r) => (
            <div key={r.reservation_id} className="me-3">
              <Reservation
                reservation={r}
                reservationCardClass={reservationCardClass}
              />
            </div>
          ))
        ) : (
          <p>No reservations found</p>
        )}
      </div>
    </div>
  );
}
