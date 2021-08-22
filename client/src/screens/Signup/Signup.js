import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/mainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/userActions';
import "../Signin/SigninScreen";

function Signup({ history }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo} = userRegister;

    useEffect(() => {
      if (userInfo) {
        history.push("/studypage");
      }
    }, [history, userInfo])

    const submitHandler = (e) => {
      e.preventDefault();

      if(password!== confirmpassword){
        setMessage('Passwords do not match')
      }
      else {
        dispatch(register(username, email, password));
      }
    }

    return (
      <MainScreen>
        <div className="signinContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicconfirmPassword">
              <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>
              <Button variant="primary" type="submit">
              Signup
              </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/signin">Sign In Here</Link>
            </Col>
          </Row>
      </div>
      </MainScreen>
    )
};

export default Signup;