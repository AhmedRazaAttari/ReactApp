import React, { useState } from 'react';
import BackImg from '../assets/arrow.png';
import {
    Link
} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import logo from '../assets/logo1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import SocialButton from '../component/SocialLogin';
import ReactCodeInput from 'react-verification-code-input';
import image from '../assets/image.png';
import firebase from '../Config/FirebaseConfig';
import firebas from 'firebase'
import { Redirect } from 'react-router'

const Signup = ({ }) => {

    const [StepOne, SetStepOne] = useState(true)
    const [StepTwo, SetStepTwo] = useState(false)
    const [StepThree, SetStepThree] = useState(false)

    const [IsUser, SetUser] = useState(false)

    const [randomNumber, SetrandomNumber] = useState(null)
    const [VerificationCode, SetVerificationCode] = useState(null)
    const [email, Setemail] = useState(null)
    const [FirstName, SetFirstName] = useState(null)
    const [LastName, SetLastName] = useState(null)
    const [Password, SetPassword] = useState(null)
    const [Conf_Password, SetConf_Password] = useState(null)

    const [ImageURI, SetImageURI] = useState(null)

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const handleSocialLogin = () => {
        // console.log(user._profile.email)
        // console.log(user._profile.email)
        var provider = new firebas.auth.GoogleAuthProvider();
        // SetImageURI(user._profile.profilePicURL)
        // setURL(user._profile.profilePicURL)
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user)
                console.log(token)
                console.log(credential)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(error.message)
            });

        // Setemail(user._profile.email)
        // SetFirstName(user._profile.firstName)
        // SetLastName(user._profile.lastName)


        // SetUser(true)
    }

    // const handleSocialLoginFailure = (err) => {
    //     console.error(err)
    // }

    const SendEmail = () => {
        var randomNumber = Math.floor(Math.pow(10, 9 - 1) + Math.random() * 9 * Math.pow(10, 9 - 1));
        var VerificationCode = Math.floor(1000 + Math.random() * 9000)
        if (email !== "" && email !== undefined) {
            fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/SendEmail", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: randomNumber,
                    Email: email,
                    VerificationCode: VerificationCode
                })
            }).then(r => r.json().then(data => {
                if (!r.ok) {
                    console.log(data.message)
                }
                else {
                    SetrandomNumber(randomNumber)
                    SetStepOne(false)
                    SetStepTwo(true)
                }
            }))
        }
    }

    const CheckCode = () => {
        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/VerifyCode", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: randomNumber,
                Email: email,
                VerificationCode: VerificationCode
            })
        }).then(r => r.json().then(data => {
            if (!r.ok) {
                alert(data.message)
            }
            else {
                SetStepOne(false)
                SetStepTwo(false)
                SetStepThree(true)
            }
        }))
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                SetImageURI(ev.target.result)
                // this.setState({ imageURI: ev.target.result });
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    // function readURI(e) {
    // if (e.target.files && e.target.files[0]) {
    //     let reader = new FileReader();
    //     reader.onload = function (ev) {
    //         SetImageURI(ev.target.result)
    //         // this.setState({ imageURI: ev.target.result });
    //     }.bind(this);
    //     reader.readAsDataURL(e.target.files[0]);
    // }
    // }

    function RegisterUser() {

        if (FirstName !== "" && FirstName !== undefined && LastName !== "" && LastName !== undefined && email !== "" && email !== undefined
            && Password !== "" && Password !== undefined && Conf_Password !== "" && Conf_Password !== undefined) {

            var ChannelID = Math.floor(100000000 + Math.random() * 900000000);
            if (file) {
                firebase.storage().ref("images/").child("ProfilePics" + "/" + ChannelID).put(file)
                    .then((result) => {
                        result.ref.getDownloadURL()
                            .then((url) => {
                                firebase.auth().createUserWithEmailAndPassword(email, Password)
                                    .then((resolve) => {
                                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/register", {
                                            method: "POST",
                                            headers: {
                                                "content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                OwnerID: resolve.user.uid,
                                                ChannelID: ChannelID,
                                                Email: email,
                                                FirstName: FirstName,
                                                LastName: LastName,
                                                ProfilePic: url,
                                                Password: Password,
                                            })
                                        }).then(r => r.json().then(data => {
                                            if (!r.ok) {
                                                console.log(data)
                                            }
                                            else {
                                                SetUser(true)
                                            }
                                        }))
                                    })

                            })
                    })
            }
            else {
                firebase.auth().createUserWithEmailAndPassword(email, Password)
                    .then((resolve) => {
                        fetch("https://halelujjahgospellivestreaming.herokuapp.com/user/register", {
                            method: "POST",
                            headers: {
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                OwnerID: resolve.user.uid,
                                ChannelID: ChannelID,
                                Email: email,
                                FirstName: FirstName,
                                LastName: LastName,
                                ProfilePic: url ? url : null,
                                Password: Password,
                            })
                        }).then(r => r.json().then(data => {
                            if (!r.ok) {
                                console.log(data)
                                // alert(data.message)
                            }
                            else {
                                SetUser(true)
                            }
                        }))
                    })
            }

        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <div className="Gradient" style={{ height: '100vh', width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "80%", padding: 20, textAlign: "center" }}>
                    <h2 style={{ color: "white", fontFamily: "Arial" }}>SIGN UP FREE</h2>
                    <p style={{ textAlign: "center", fontSize: 18, color: "white", fontFamily: "Arial", lineHeight: "25px" }}>It's a Social platform. Sign-in and Start your live Streaming OR you can join live streamings, Comments, Like, Chat and much more...</p>

                    <img src={BackImg} style={{ width: '90%' }} alt="" />
                </div>
                <p style={{ color: "white" }}>Already Have an Account? <Link to="/login" style={{ color: "#bdf0ef", textDecoration: "none" }}> Sign-in here</Link></p>
            </div>

            <div style={{ height: '100vh', width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <img src={logo} style={{ width: 150 }} alt="" />

                <div style={{ paddingTop: 50, display: "flex", alignItems: "center" }}>
                    <div style={{ height: 30, width: 30, borderRadius: "100%", background: "#ff516b", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ color: "white" }}>1</b>
                    </div>
                    <div style={{ width: 120, border: '1px solid lightgrey', height: 1 }} />
                    <div style={{ height: 30, width: 30, borderRadius: "100%", background: StepTwo ? "#ff516b" : "skyblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ color: "white" }}>{StepTwo ? 2 : <FontAwesomeIcon icon={faLock} />}</b>
                    </div>
                    <div style={{ width: 120, border: '1px solid lightgrey', height: 1 }} />
                    <div style={{ height: 30, width: 30, borderRadius: "100%", background: StepThree ? "#ff516b" : "skyblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <b style={{ color: "white" }}>{StepThree ? 3 : <FontAwesomeIcon icon={faLock} />}</b>
                    </div>
                </div>

                {StepOne && <div>
                    <div style={{ padding: 50, width: "100%" }}>
                        <b style={{ marginLeft: 5 }}>Email Address</b>
                        <Form.Group style={{ width: '100%', marginTop: 10, height: 60 }}>
                            <Form.Control type="email" placeholder="" onChange={(e) => Setemail(e.target.value)} />
                        </Form.Group>
                        <p style={{ fontSize: 10, marginTop: -30 }}>We will send confirmation Code to your email address, should be verify to access platform</p>
                        <small >By signing up, I agree to the 'Hallelujah Gospel live Streaming' Privacy Statement and Terms of Service.</small>
                        <Button className="Gradient" variant="primary" size="lg" onClick={() => SendEmail()} style={{ width: "100%", marginTop: 10, textAlign: "center" }}>
                            Send Link
                        </Button>
                    </div>

                    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        {/* <h6>Or sign in with</h6>

                        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "60%" }}>
                            <SocialButton
                                provider='facebook'
                                appId='516842979669731'
                                // onLoginSuccess={handleSocialLogin}
                                // onLoginFailure={handleSocialLoginFailure}
                            >
                                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 22, color: "blue" }} />
                            </SocialButton>
                            
                            <SocialButton
                                provider='github'
                                gatekeeper='http://localhost:3000'
                                appId='ab7913c4a4b2b26e6157'
                                redirect='http://localhost:3000'
                                // onLoginSuccess={handleSocialLogin}
                                // onLoginFailure={handleSocialLoginFailure}
                            >
                                <FontAwesomeIcon icon={faGithub} style={{ fontSize: 22 }} />
                            </SocialButton>

                            
                            <SocialButton
                                provider='google'
                                appId='578945300490-avv3i2tl7u02dkvpen823ekrk631tgq4.apps.googleusercontent.com'
                                onLoginSuccess={handleSocialLogin}
                                // onLoginFailure={handleSocialLoginFailure}
                            >
                                <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 22, color: "#ff516b" }} />
                            </SocialButton>
                        </div> */}
                    </div>
                </div>}

                {StepTwo && <div style={{ padding: 50, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <ReactCodeInput fields={4} autoFocus={true} onChange={(e) => SetVerificationCode(e)} />
                    <p style={{ fontSize: 14, marginTop: 20 }}>verification Code is sent to your email address. Please enter verification Code</p>
                    <Button className="Gradient" variant="primary" size="lg" onClick={() => CheckCode()} style={{ width: "100%", marginTop: 10, textAlign: "center" }}>
                        Verify
                    </Button>
                </div>}

                {StepThree && <div style={{ padding: 50, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>

                    <label style={{ height: 70, width: 70, borderRadius: 100, background: "snow", marginBottom: 20 }}>
                        <img src={ImageURI ? ImageURI : image} style={{ width: 80, height: 80, borderRadius: 100 }} />
                        <input type="file" name="myfile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    </label>

                    <Form.Group style={{ width: '95%' }}>
                        <Form.Control type="name" placeholder="First Name" value={FirstName} onChange={(e) => SetFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group style={{ width: '95%' }}>
                        <Form.Control type="name" placeholder="Last Name" value={LastName} onChange={(e) => SetLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group style={{ width: '95%' }}>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => SetPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group style={{ width: '95%' }}>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => SetConf_Password(e.target.value)} />
                    </Form.Group>

                    <Button className="Gradient" variant="primary" size="lg" onClick={() => RegisterUser()} style={{ width: "100%", marginTop: 10, textAlign: "center" }}>
                        Sign up
                    </Button>
                </div>}
            </div>
            {IsUser && <Redirect to="/Home" push={true} />}
        </div>
    )
}

export default Signup;