import React from "react";

export default function Table({t, finishHandler}) {
  return (
    <>
      <div className="border mb-3">
        <div>
          <h6>{t.table_name}</h6>
          <p data-table-id-status={t.table_id}>
            {t.reservation_id ? "occupied" : "free"}
          </p>
        </div>
        {t.reservation_id && (
          <button
            className="btn btn-primary"
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
