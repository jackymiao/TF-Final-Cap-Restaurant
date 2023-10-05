import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createTable} from "../utils/api";
import "./table.css";
function NewTable({setLoadTrigger}) {
  const history = useHistory();
  const initialData = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialData);

  async function newTable(formData) {
    const abortController = new AbortController();
    await createTable(formData, abortController.signal).catch(console.log);
    return () => abortController.abort();
  }

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    formData.capacity = Number(formData.capacity);
    newTable(formData);
    setLoadTrigger((prev) => prev + 1);
    setFormData(initialData);
    history.push("/dashboard");
  };
  const cancelHandler = (event) => {
    history.goBack();
  };
  //use pattern and min for input to limit the input length and number
  return (
    <div className="container-table">
      <h1 className="m-4">Create a New Table</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name:</label>
          <input
            className="form-control"
            type="text"
            pattern=".{2,}"
            id="table_name"
            name="table_name"
            placeholder="Table Name"
            value={formData.table_name}
            onChange={changeHandler}
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Table Capacity:</label>
          <input
            className="form-control"
            type="number"
            min={1}
            id="capacity"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={changeHandler}
            required
          ></input>
        </div>

        <div className="row justify-content-around">
          <div className="col-lg-5 col-sm-6 mb-4">
            <button className="button button-newtable me-3" type="submit">
              Submit
            </button>
          </div>
          <div className="col-lg-5 col-sm-6">
            <button className="button button-newtable" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
