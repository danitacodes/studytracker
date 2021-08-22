import React, { useEffect, useState } from "react";
import MainScreen from '../../components/mainScreen';
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createStudyAction } from "../../actions/studyActions"
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


function StudyPage({ history }) {
  const [assignment, setAssignment] = useState('');
  const [minutes, setMinutes] = useState('');
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();

  const studyCreate = useSelector((state) => state.studyCreate);
  const { loading, error, study } = studyCreate;

  console.log(study);

  const resetHandler = () => {
    setAssignment('');
    setMinutes('');
    setSubject('');
    setNotes('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createStudyAction(assignment, minutes, subject, notes));
    if (!assignment || !minutes || !subject || !notes) return;

    resetHandler();
    history.push("/studylist");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Yessir! Log your studying">
      <Card>
        <Card.Header>Create a new Study</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group className="mb-3" controlId="assignment">
              <Form.Label>Assignment</Form.Label>
              <Form.Control
                type="assignment"
                value={assignment}
                placeholder="Enter the assignment"
                onChange={(e) => setAssignment(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                type="content"
                value={minutes}
                placeholder="Enter the minutes"
                onChange={(e) => setMinutes(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="content"
                value={subject}
                placeholder="Enter the subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                value={notes}
                placeholder="Enter the notes"
                rows={4}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Study
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default StudyPage;