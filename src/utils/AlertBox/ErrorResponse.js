import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./ResponseAlert.css";

function ErrorResponse(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="alertBox">
        <Alert variant="dangerBox" onClose={() => {setShow(false); props.setShowError("");}} dismissible>
          <Alert.Heading className="heading">Whoops!</Alert.Heading>
          <p>{props.message}</p>
        </Alert>
      </div>
    );
  }
 
}

export default ErrorResponse;
