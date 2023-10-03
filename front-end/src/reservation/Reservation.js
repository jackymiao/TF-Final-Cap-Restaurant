import React from "react";
import {Link} from "react-router-dom";
import {cancelReservation} from "../utils/api";
import "./reservation.css";

export default function Reservation({
  reservation,
  setLoadTrigger,
  reservationCardClass,
}) {
  function cancelHandler(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      cancelReservation(reservation_id, abortController.signal)
        .then(() => {
          setLoadTrigger((prev) => prev + 1);
        })
        .catch(console.log);
      return () => abortController.abort();
    }
  }
  const background = reservationCardClass(reservation);
  return (
    <div className="card card-res mb-3">
      <h5 className="card-title">
        {reservation.first_name}-{reservation.last_name}
      </h5>
      <div className="card-body">
        <ul className="list group list-group-flush">
          <li className="list-group-item border-top">
            <p>Mobile Number: </p>
            <p>{reservation.mobile_number}</p>
          </li>
          <li className="list-group-item border-top">
            <p>Reservation Date: </p>
            <p>{reservation.reservation_date}</p>
          </li>
          <li className="list-group-item border-top">
            <p>Reservation Time: </p>
            <p>{reservation.reservation_time}</p>
          </li>
          <li className="list-group-item border-top">
            <p>People: {reservation.people}</p>
          </li>
        </ul>
        <div className={`${background}`}>
          <p
            className="text-center text-white"
            data-reservation-id-status={reservation.reservation_id}
          >
            {reservation.status}
          </p>
        </div>
      </div>

      <div className="btn-group">
        {reservation.status === "booked" && (
          <button className="btn btn-primary">
            <Link
              className="text-decoration-none text-white"
              to={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </Link>
          </button>
        )}
        <button className="btn btn-warning">
          <a
            className="text-decoration-none text-white"
            href={`/reservations/${reservation.reservation_id}/edit`}
          >
            Edit
          </a>
        </button>

        <button
          className="btn btn-danger"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={() => cancelHandler(reservation.reservation_id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
