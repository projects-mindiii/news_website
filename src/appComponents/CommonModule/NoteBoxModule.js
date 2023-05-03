import React from "react";
import "./CommonModule.css"

function NoteBoxModule(props) {
    console.log("propsprops", props)
  return (
    <section>
      <div className="noteBoxClass">
        <h3>{props.headText}</h3>
        <p>
          <strong>{props.headSubText}</strong>{" - "}
          {props.detailText}
        </p>
      </div>
    </section>
  );
}

export default NoteBoxModule;
