import React from 'react';
import BackImg from '../assets/arrow2.png';
import Back from '../assets/back.png';
import Back2 from '../assets/back2.png';
import logo from '../assets/logo1.gif';
import firebase from '../Config/FirebaseConfig';
import {
    Link
} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router'

class LoginScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: null,
            password: null,
            isUser: false,
        }
    }

    LoginUser() {
        const { email, password } = this.state;
        var _ = this;
        if (email !== "" && email !== undefined && password !== "" && password !== undefined) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (resolve) {
                    _.setState({
                        isUser: true
                    })
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <div className="Gradient" style={{ height: '100vh', width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", padding: 20, textAlign: "center" }}>

                        <h1 style={{ color: "white", fontFamily: "Arial" }}>SIGN IN</h1>
                        <h6 style={{ textAlign: "center", fontSize: 18, color: "white", fontFamily: "Arial", lineHeight: "25px" }}>Welcome back!</h6>

                        <img src={BackImg} style={{ width: '100%' }} alt="" />
                    </div>
                    <p style={{ color: "white" }}>Don't Have an account? <Link to="/Signup" style={{ color: "#bdf0ef", textDecoration: "none" }}> Create Account</Link></p>
                </div>

                <div style={{ height: '100vh', width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>

                    <img src={logo} style={{ width: 150 }} alt="" />
                    <div style={{ padding: 25, width: "100%", marginBottom: 20 }}>
                        <img src={Back} style={{ width: 150, position: "absolute", top: 0, right: 0 }} alt="" />

                        <h4 style={{ margin: 20 }}>Sign-in</h4>

                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                            <Form.Group style={{ width: '95%' }}>
                                <Form.Control type="email" placeholder="Email@" onChange={(e) => this.setState({ email: e.target.value })} />
                            </Form.Group>

                            <Form.Group style={{ width: '95%' }}>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                            </Form.Group>
                        </div>
                        <Form.Check inline label="I agree the terms of Services and acknowledge the privacy policy" name="group1" type="checkbox" style={{ margin: 10, marginLeft: 15 }} />
                        <Button className="Gradient" variant="primary" size="lg" style={{ width: "100%" }} onClick={() => this.LoginUser()}>
                            Sign in
                        </Button>

                    </div>
                    <img src={Back2} style={{ width: 200, position: "absolute", bottom: 0, left: 0 }} alt="" />
                </div>
                {this.state.isUser && <Redirect to="/Home" push={true} />}
            </div>
        )
    }
}


export default LoginScreen