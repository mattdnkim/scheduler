import React from "react";

import Button from "components/Button";

// import bookInterview from "src/";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button alt="Cancel" onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button alt="Confirm" onClick={props.onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
