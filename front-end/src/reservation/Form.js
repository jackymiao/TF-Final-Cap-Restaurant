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
        if (event.target.name === "people") {
          setFormData({
            ...formData,
            people: Number(event.target.value),
          });
        } else if (event.target.name === "mobile_number") {
          let phonenumber = event.target.value.replace(/\D/g, ""); // Remove all non-digits
          if (phonenumber.length > 3 && phonenumber.length <= 6) {
            phonenumber = phonenumber.slice(0, 3) + "-" + phonenumber.slice(3);
          } else if (phonenumber.length > 6) {
            phonenumber =
              phonenumber.slice(0, 3) +
              "-" +
              phonenumber.slice(3, 6) +
              "-" +
              phonenumber.slice(6, 10);
          }
          setFormData({
            ...formData,
            mobile_number: phonenumber,
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }));
        }
      }
    } else {
      if (event.target.name === "people") {
        setFormData({
          ...formData,
          people: Number(event.target.value),
        });
      } else if (event.target.name === "mobile_number") {
        let phonenumber = event.target.value.replace(/\D/g, ""); // Remove all non-digits
        if (phonenumber.length > 3 && phonenumber.length <= 6) {
          phonenumber = phonenumber.slice(0, 3) + "-" + phonenumber.slice(3);
        } else if (phonenumber.length > 6) {
          phonenumber =
            phonenumber.slice(0, 3) +
            "-" +
            phonenumber.slice(3, 6) +
            "-" +
            phonenumber.slice(6, 10);
        }
        setFormData({
          ...formData,
          mobile_number: phonenumber,
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
              type="tel"
              id="mobile_number"
              name="mobile_number"
              placeholder="XXX-XXX-XXXX"
              pattern="^\d{3}-\d{3}-\d{4}$"
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

        <div className="row justify-content-around">
          <div className="col-lg-3 col-sm-5 mb-4">
            <button className="button button-form" type="submit">
              Submit
            </button>
          </div>
          <div className="col-lg-3 col-sm-5">
            <button
              className="button button-form "
              data-reservation-id-cancel={formData.reservation_id}
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ErrorAlert error={formError} />
    </>
  );
}

export default Form;
