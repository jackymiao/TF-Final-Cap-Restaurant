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
    <div>
      {reservation.status === "booked" && (
        <button className="button me-2">
          <Link
            className="text-decoration-none text"
            to={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </Link>
        </button>
      )}
      <div className="card-res mb-3">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="text mb-0 text-name">
            {reservation.last_name} {reservation.first_name}
          </h5>
          <div className={`${background} rounded m-2`}>
            <p
              className="text-center text-white m-0 px-3"
              data-reservation-id-status={reservation.reservation_id}
            >
              {reservation.status}
            </p>
          </div>
        </div>

        <div className="">
          <ul className="list group list-group-flush">
            <li className="list-group-item border-top">
              <p className="card-text my-0">Mobile Number: </p>
              <p className="card-text my-0">{reservation.mobile_number}</p>
            </li>
            <li className="list-group-item border-top">
              <p className="card-text my-0">Reservation Time: </p>
              <p className="card-text my-0">{reservation.reservation_time}</p>
            </li>
            <li className="list-group-item border-top">
              <p className="card-text my-0">People: {reservation.people}</p>
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-around mx-2">
          <button className="me-2 button">
            <a
              className="text-decoration-none text"
              href={`/reservations/${reservation.reservation_id}/edit`}
            >
              Edit
            </a>
          </button>

          <button
            className="text button"
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={() => cancelHandler(reservation.reservation_id)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
