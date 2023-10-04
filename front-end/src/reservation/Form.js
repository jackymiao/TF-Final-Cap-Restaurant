import React, {useState} from "react";

import ErrorAlert from "../layout/ErrorAlert";
import "./form.css";

function Form({submitHandler, cancelHandler, formError, initialFormData}) {
  //test file need it clear after submition, even it is invalid
  //setFormData(()=>initialData)
  const [formData, setFormData] = useState(initialFormData);
  const changeHandler = (event) => {
    if (formData.status) {
      if (formData.status === "booked") {
        setFormData((prevData) => ({
          ...prevData,
          [event.target.name]: event.target.value,
        }));
      }
    } else {
      if (event.target.name === "people") {
        setFormData({
          ...formData,
          people: Number(event.target.value),
        });
      } else {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler(formData);
    //setFormData(() => initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-6">
            <label htmlFor="first_name">First Name: </label>
            <input
              className="form-control"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={changeHandler}
            ></input>
          </div>
          <div className="form-group col-6">
            <label htmlFor="last_name">Last Name:</label>
            <input
              className="form-control"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={changeHandler}
            ></input>
          </div>

          <div className="form-group col-6">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              className="form-control"
              type="text"
              id="mobile_number"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={changeHandler}
            ></input>
          </div>

          <div className="form-group col-6">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              className="form-control"
              type="date"
              id="reservation_date"
              name="reservation_date"
              placeholder="Reservation Date"
              value={formData.reservation_date}
              onChange={changeHandler}
            ></input>
          </div>

          <div className="form-group col-6">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              className="form-control"
              type="time"
              id="reservation_time"
              name="reservation_time"
              placeholder="Reservation Time"
              value={formData.reservation_time}
              onChange={changeHandler}
            ></input>
          </div>

          <div className="form-group col-6">
            <label htmlFor="people">People</label>
            <input
              className="form-control"
              type="text"
              id="people"
              name="people"
              placeholder="People"
              value={formData.people}
              onChange={changeHandler}
            ></input>
          </div>
        </div>

        <button className="button button-form me-4" type="submit">
          Submit
        </button>

        <button
          className="button button-form"
          data-reservation-id-cancel={formData.reservation_id}
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </form>
      <ErrorAlert error={formError} />
    </>
  );
}

export default Form;
