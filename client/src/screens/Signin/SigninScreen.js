import { React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../components/ErrorMessage';
import  Loading from '../../components/Loading';
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import '../Signin/SigninScreen.css';
import MainScreen from "../../components/mainScreen";
import { signin } from '../../actions/userActions';



function Signin({history}) {

  const [username, setUsername] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo} = userLogin;

 useEffect(() => {
   if (userInfo) {
     history.push("/studypage")
   }
 }, [history, userInfo]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(username, email, password));
  };

  return (
    <MainScreen title='SIGN IN'>
    <div className="signinContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New here? <Link to="/signup">Signup Here</Link>
          </Col>
        </Row>
    </div>
  </MainScreen>
   )
};

export default Signin;