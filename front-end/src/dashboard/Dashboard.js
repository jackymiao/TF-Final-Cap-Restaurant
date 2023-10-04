import React from "react";

import ErrorAlert from "../layout/ErrorAlert";
import {previous, next} from "../utils/date-time";
import Reservation from "../reservation/Reservation";
import {finishTable} from "../utils/api";
import Table from "../table/Table";
import "./dashboard.css";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  setDate,
  tables,
  reservations,
  reservationsError,
  tablesError,
  setLoadTrigger,
}) {
  const previousHandler = () => {
    setDate(() => previous(date));
  };
  const nextHandler = () => {
    setDate(() => next(date));
  };

  function finishHandler(table_id) {
    const userConfirmed = window.confirm(
      "Is this table ready to seat new guests?"
    );
    if (userConfirmed) {
      const abortController = new AbortController();
      finishTable(table_id, abortController.signal)
        .then(() => {
          setLoadTrigger((prev) => prev + 1);
        })
        .catch(console.log);
      return () => abortController.abort();
    }
  }

  function reservationCardClass(reservation) {
    if (reservation.status === "booked") {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  }

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      <div className="mb-3">
        <div className="row">
          <h4 className="mb-0 col-6">Reservations Date is {date}</h4>
          <button className="col-1 btn-head me-3" onClick={previousHandler}>
            Previous
          </button>
          <button className="col-1 btn-head" onClick={nextHandler}>
            Next
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-8 ">
            <h2 className="text-center">Reservations</h2>
            <ErrorAlert error={reservationsError} />
            <div className="d-flex justify-content-between flex-wrap">
              {reservations.length > 0 ? (
                reservations.map((r) => (
                  <React.Fragment key={r.reservation_id}>
                    {(r.status === "booked" || r.status === "seated") && (
                      <Reservation
                        reservation={r}
                        setLoadTrigger={setLoadTrigger}
                        reservationCardClass={reservationCardClass}
                      />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <h3>There is no reservation.</h3>
              )}
            </div>
          </div>
          <div className="col-4">
            <h3 className="text-center">Tables</h3>
            <ErrorAlert error={tablesError} />

            <div className="d-flex flex-column">
              {tables &&
                tables.map((t) => (
                  <Table key={t.table_id} t={t} finishHandler={finishHandler} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
