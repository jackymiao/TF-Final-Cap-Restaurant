import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createTable} from "../utils/api";

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
    <>
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
        <button className="btn btn-primary me-3" type="submit">
          Submit
        </button>
        <button className="btn btn-primary" onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default NewTable;
