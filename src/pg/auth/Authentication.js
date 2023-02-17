// External imports
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Internal Imports
import axios from '../../api/axios';
import Logo from '../../components/Logo';
import '../../styles/Authentication.scss'

// imports for icons
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Regex declaration
const EMAIL_REGEX = /^([a-z]+\.+\w+(@kongu\.edu))$/;
const ROLLNUM_REGEX = /^(\d{2}[A-Z|a-z]{2,3}\d{3})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;





const Authentication = () => {
    // Hooks declaration

    // Hook for navigation
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);

    // Hooks for User details
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [rollnum, setRollnum] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [otp, setOtp] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    // Hooks for validating roll number
    const [rollnumFocus, setRollnumFocus] = useState(false);
    const [validRollNum, setValidRollNum] = useState(false);
    useEffect(() => {
        setValidRollNum(ROLLNUM_REGEX.test(rollnum));
    }, [rollnum])

    // Hooks for validating email
    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Hooks for validating password
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])


    // Hooks for validating OTP
    const [validOtp, setValidOtp] = useState(false);
    useEffect(
        () => { setValidEmail(EMAIL_REGEX.test(email)) },
        [email]
    )

    // Hooks for error handling
    const [isLoad, setIsLoad] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState("");

    const sendEmail = async (e) => {
        console.log("Sending email...");
        try {
            setIsLoad(true);
            const response = await axios.get(
                `/generate-otp?email=${email}`,
            );
            console.log(response.data.message);
            setErrMsg("");
            setIsLoad(false);
            if (response.data.message === email) { setIsSent(true); }
            else { setErrMsg(response.data.message); }
        }
        catch (err) {
            setIsLoad(false);
            console.log(err);
            setErrMsg(err);
        }
    }
    const sendOtp = async (e) => {
        try {
            console.log("otp sending");
            setIsLoad(true);
            setErrMsg("");
            const response = await axios.post(
                "/verify-otp",
                JSON.stringify({ email, "otp": otp }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            setIsLoad(false);
            if (response.data.message === "Otp verified") { setValidOtp(true); }
            else {
                setValidOtp(false);
                setErrMsg(response.data.message);
            }
        }
        catch (err) {

            setIsLoad(false);
            console.log(err);
            setErrMsg("Invalid OTP");
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting...");
        if (isClicked) {
            try {
                setIsLoad(true);
                const response = await axios.post(
                    "/save",
                    JSON.stringify({ name: name, email: email, password: pwd, rollNo: rollnum, year: year, role: "ADMIN" }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                )
                setIsLoad(false);
                setErrMsg("");
                if (response.data.message === "User added!!!") {
                    setSuccess(true);
                    setIsClicked(false);
                    setSuccessMsg("Please login to continue");
                }
                else {
                    setErrMsg(response.data.message);
                }

            }
            catch (err) {
                setIsLoad(false);
                setErrMsg(err)

            }
        }
        else {
            var response = null
            try {
                setIsLoad(true);
                response = await axios.post(
                    '/login',
                    JSON.stringify({ email: email, password: pwd }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    })

                setIsLoad(false);
                if (response.data.message === "Login Successful") {
                    setSuccess(true);
                    localStorage.setItem("jwt", response.data.data.jwt);
                    localStorage.setItem("refToken", response.data.data.refreshToken);
                    // console.log(localStorage.getItem("jwt"));
                    navigate("/dashboard/home");
                }
                else {
                    console.log(response)
                    setErrMsg(response.data.message);
                }

            }
            catch (error) {
                setErrMsg("Invalid userName or password ;(");
                setIsLoad(false)
            }
        }
    }
    return (
        <>

            <div className='body-container-auth'>
                <div className={isClicked ? "container right-panel-active" : "container"} >
                    <div className="form-container sign-up-container">


                        {/* Sign up form container */}
                        <form onSubmit={handleSubmit}>

                            <h1>Sign Up</h1>
                            {/* Input:Name */}



                            <div className='input-container'>
                                <input
                                    type="text"
                                    // autoComplete="off"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}

                                    value={name}
                                    required
                                />
                                <span className={name.length !== 0 ? "not-empty" : ''}>Name</span>
                            </div>


                            {/* </input> */}

                            {/* Input:Roll number */}
                            <div className='input-container'>
                                <input
                                    type="text"
                                    // autoComplete="off"
                                    onChange={(e) => {
                                        setRollnum(e.target.value);
                                    }}

                                    value={rollnum}
                                    required

                                    onFocus={() => setRollnumFocus(true)}
                                    onBlur={() => setRollnumFocus(false)}
                                />
                                <p id="rollnum-note" className={rollnumFocus && rollnum && !validRollNum ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Enter Your valid rollnumber of length 8
                                    Only Letters and numbers are valid.
                                </p>
                                <span className={rollnum.length !== 0 ? "not-empty" : ''}>Roll number</span>
                            </div>
                            {/* Input :year */}
                            <div className='input-container'>
                                <input
                                    type="number"
                                    min={1}
                                    max={4}
                                    // autoComplete="off"
                                    onChange={(e) => {
                                        setYear(e.target.value);
                                    }}

                                    value={year}
                                    required
                                />
                                <span className={year.length !== 0 ? "not-empty" : ''}>
                                    Year
                                </span>
                            </div>

                            {/* Input: password*/}
                            <div className='input-container'>


                                <input type="password"
                                    // autoComplete="off"
                                    onChange={(e) => {
                                        setPwd(e.target.value);
                                    }}

                                    value={pwd}
                                    required
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)} />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.
                                    Must include uppercase and lowercase letters,
                                    a number and a special character.
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>

                                <span className={pwd.length !== 0 ? "not-empty" : ''}>Password</span>
                            </div>
                            {/* Input:Confirm password */}
                            <div className='input-container'>
                                <input
                                    type="password"

                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                                <span className={matchPwd.length !== 0 ? "not-empty" : ''}>Conform Password</span>
                            </div>
                            {/* Input: Mail id */}
                            <div className='input-container'>

                                <input
                                    type="text"

                                    required
                                    disabled={isSent}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="email-note"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="email-note" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Only kongu mail-ids are allowed case-sensitive
                                </p>
                                <span className={email.length !== 0 ? "not-empty" : ''}>Kongu Mail Id</span>
                            </div>
                            {/* Input: Otp*/}
                            <div className='input-container'>

                                <input
                                    type={"number"}
                                    required
                                    onChange={(e) => { setOtp(e.target.value) }}
                                    value={otp}
                                    disabled={isSent || success ? false : true}
                                />
                                <span className={otp.length !== 0 ? "not-empty" : ''}>OTP</span>
                            </div>
                            <button disabled={!validEmail || isLoad ? true : false}
                                onClick={() => {
                                    if (!isSent) { sendEmail(); }
                                    else if (!validOtp) { sendOtp(); }
                                }
                                }
                            >
                                {
                                    isLoad ? "Loading..." : validOtp ? "Submit" : isSent ? "verify" : "Get otp"
                                }

                            </button>
                        </form>
                    </div>
                    {/* Login form starts */}
                    <div className="form-container sign-in-container">

                        <form onSubmit={handleSubmit}>

                            <h1>Log in</h1>
                            <Logo />
                            <div className='input-container'>
                                <input
                                    type="text"

                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="email-note"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="email-note" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Only kongu mail-ids are allowed case-sensitive
                                </p>
                                <span className={email.length !== 0 ? "not-empty" : ''}>Kongu mail Id</span>
                            </div>
                            <div className='input-container'>
                                <input
                                    type="password"

                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <span className={pwd.length !== 0 ? "not-empty" : ''}>PassWord</span>
                            </div>

                            <button>{isLoad ? "Loading..." : "Login"}</button>
                            <span><a href="#">Forgot your password?</a></span>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <Logo />
                                <h1>Stay Hungry..! Stay Foolish...!</h1>
                                <span>-Steve Jobs</span>
                                <p>To keep learnig login here</p>
                                <button className="ghost" onClick={() => { setIsClicked(false) }}>Login</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Mate !</h1>
                                <p>Enter your personal details and start your journey with core dump :)</p>
                                <button className="ghost" onClick={() => { setIsClicked(true) }}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Authentication