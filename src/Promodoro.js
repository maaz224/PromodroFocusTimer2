import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert, Button, Form } from "react-bootstrap";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeOption, setTimeOption] = useState(25);

  function handleStartStop() {
    setIsRunning(!isRunning);
  }

  function handleTimeOptionChange(event) {
    setTimeOption(event.target.value);
    setMinutes(event.target.value);
    setSeconds(0);
  }

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let newMinutes = displayMessage ? 24 : 4;
            let newSeconds = 59;
            setSeconds(newSeconds);
            setMinutes(newMinutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, displayMessage, isRunning]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <Container className="pomodoro text-center mt-5">
      <Alert variant="info" show={displayMessage}>
        Break time! New session starts in:
      </Alert>
      <div className="timer display-4 mb-3">
        {timerMinutes}:{timerSeconds}
      </div>
      <Button
        variant="primary"
        size="lg"
        className="mb-3"
        onClick={handleStartStop}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
      <Form.Group>
        <Form.Control
          as="select"
          size="lg"
          value={timeOption}
          onChange={handleTimeOptionChange}
        >
          <option value="50">50 minutes</option>
          <option value="40">40 minutes</option>
          <option value="30">30 minutes</option>
          <option value="25">25 minutes</option>
          <option value="15">15 minutes</option>
          <option value="5">5 minutes</option>
        </Form.Control>
      </Form.Group>
    </Container>
  );
}
