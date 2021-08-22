import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./../Home/Home.css";


function Home ({history}){

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [history, userInfo]);
    
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'> Welcome to</h1> 
                            <h1 className='title'>Study Tracker</h1>
                        </div>
                        <div className='buttonContainer'>
                            <Link to='/signin'>
                                <Button size='lg' className='homebutton'>
                                    Signin
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button size='lg' className='homebutton'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Home;