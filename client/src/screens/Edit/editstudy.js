import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainScreen";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudyAction,
  deleteStudyAction,
} from "../../actions/studyActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function EditStudy({ match, history }) {
  const [assignment, setAssignment] = useState();
  const [minutes, setMinutes] = useState();
  const [subject, setSubject] = useState();
  const [notes, setNotes] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const studyUpdate = useSelector((state) => state.studyUpdate);
  const { loading, error } = studyUpdate;

  const studyDelete = useSelector((state) => state.studyDelete);
  const { loading: loadingDelete, error: errorDelete } = studyDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStudyAction(id));
    }
    history.push("/studylist");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`study/${match.params.id}`);

      setAssignment(data.assignment);
      setMinutes(data.minutes);
      setSubject(data.subject);
      setNotes(data.notes);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setAssignment("");
    setMinutes("");
    setSubject("");
    setNotes("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStudyAction(match.params.id, assignment, minutes, subject, notes)
    );
    if (!assignment || !minutes || !subject || !notes) return;

    resetHandler();
    history.push("/studylist");
  };

  return (
    <MainScreen title="Edit Study Session">
      <Card>
        <Card.Header>Edit your study session</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="assignment">
              <Form.Label>Assignment</Form.Label>
              <Form.Control
                type="assignment"
                placeholder="Enter the assignment"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter your notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Study Session
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Study Session
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default EditStudy;
