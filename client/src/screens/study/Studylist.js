import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/mainScreen";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteStudyAction, listStudy } from "../../actions/studyActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function StudyList({ history }) {
  const dispatch = useDispatch();

  const studyList = useSelector((state) => state.studyList);
  const { loading, error, study } = studyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const studyDelete = useSelector((state) => state.studyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studyDelete;

  const studyCreate = useSelector((state) => state.studyCreate);
  const { success: successCreate } = studyCreate;

  const studyUpdate = useSelector((state) => state.studyUpdate);
  const { success: successUpdate } = studyUpdate;

  useEffect(() => {
    dispatch(listStudy());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStudyAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.username}`}>
      {console.log(study)}
      <Link to="/studypage">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create a new study
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {study &&
        study.reverse().map((study) => (
          <Accordion>
            <Card style={{ margin: 10 }} key={study._id}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {study.assignment}
                  </Accordion.Toggle>
                </span>

                <div>
                  <Button href={`/study/${study._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(study._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>Subject - {study.subject}</p>
                    <p>Minutes - {study.minutes}</p>
                    <p>Notes - {study.notes}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {study.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default StudyList;
