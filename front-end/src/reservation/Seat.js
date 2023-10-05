import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {seatReservation, listTables} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./seat.css";

export default function Seat({date, setLoadTrigger}) {
  const history = useHistory();
  //was using useRouteMatch()
  const {reservation_id} = useParams();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [seatError, setSeatError] = useState(null);
  async function seatRes(table_id, reservation_id) {
    const abortController = new AbortController();
    await seatReservation(table_id, reservation_id, abortController.signal)
      .then(() => {
        setLoadTrigger((prev) => prev + 1);
        history.push("/");
      })
      .catch(setSeatError);
    return () => abortController.abort();
  }
  //get table data here, so the link will work reservations/:reservation_id/seat
  useEffect(() => {
    listTables().then((data) => {
      setTables(() => data);
      setSelectedTable(() => data[0].table_id);
    });
  }, [reservation_id]);

  const changeHandler = (event) => {
    setSelectedTable(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    seatRes(selectedTable, reservation_id);
  };

  const cancelHandler = () => {
    history.push(`/reservations?date=${date}`);
  };

  return (
    <>
      <h2>Seat the Reservation</h2>
      <h3>Select a table for this Reservation {reservation_id}</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <select
            className="form-control w-75"
            name="table_id"
            value={selectedTable}
            onChange={changeHandler}
          >
            <option value="" disabled>
              Select a table
            </option>
            {tables &&
              tables.map((t) => (
                <option key={t.table_id} value={t.table_id}>
                  {t.table_name} - {t.capacity}
                </option>
              ))}
          </select>
        </div>

        <div className="row">
          <div className="col-lg-5 col-sm-12 mb-4">
            <button className="button me-3 btn-seat" type="submit">
              Submit
            </button>
          </div>
          <div className="col-lg-5 col-sm-12">
            <button className="button btn-seat" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      {/* error is the variable name to pass and receive */}
      <ErrorAlert error={seatError} />
    </>
  );
}
