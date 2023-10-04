import React from "react";
import "./table.css";

export default function Table({t, finishHandler}) {
  return (
    <>
      <div className="mb-3 py-2 text-center table-card">
        <div className="d-flex justify-content-center align-items-center">
          <p className="me-3 mb-0">{t.table_name}</p>
          <p className="mb-0" data-table-id-status={t.table_id}>
            {t.reservation_id ? "occupied" : "free"}
          </p>
        </div>
        {t.reservation_id && (
          <button
            className="button button-table mt-3"
            data-table-id-finish={t.table_id}
            onClick={() => finishHandler(t.table_id)}
          >
            Finish
          </button>
        )}
      </div>
    </>
  );
}
