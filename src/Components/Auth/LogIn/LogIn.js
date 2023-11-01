import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LogIn.css";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const LogIn = () => {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //Form Submit Handler :
  const SignInFormSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1PJsw9YLFXSIP6px1hBNPSWCISz1hPUI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully Logged In");
        navigate("/WelcomeScreen");
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem('email',data.email)
        console.log(data);

        // To clr input Fields
        email.current.value = "";
        password.current.value = "";
      } else {
        const data = await response.json();
        setError(true);
        const errorMessage = data.error.message;
        console.log(errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form className="LogInForm">
    //   <div className="form">
    //     <div className="titlee" >LogIn</div>
    //     <div className="Email">
    //       <label>Email</label>
    //       <input type="email" ref={email} />
    //     </div>
    //     <div className="password">
    //       <label>Password</label>
    //       <input type="password" ref={password} />
    //     </div>
    //     {error && <h6>{error}</h6>}
    //     <div className="signUpButton">
    //       <Button onClick={SignInFormSubmitHandler} variant="primary">
    //         LogIn
    //       </Button>
    //     </div>
    //     <Link to="/SignUp">
    //       <div className="info">Create New Account ?</div>
    //     </Link>
    //   </div>
    //   <ToastContainer />
    // </form>
    <form className="LogInForm max-w-md mx-auto  border">
  <div className="form p-8 bg-white shadow-md rounded-md">
    <div className="titlee text-2xl font-serif mb-6">Log In</div>
    <div className="Email mb-4">
      <label className="block text-gray-700 text-sm font-serif mb-2">Email</label>
      <input
        type="email"
        ref={email}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="password mb-4">
      <label className="block text-gray-700 text-sm font-serif mb-2">Password</label>
      <input
        type="password"
        ref={password}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    {error && <h6 className="text-red-500 mb-4">{error}</h6>}
    <div className="signUpButton font-serif">
      <Button onClick={SignInFormSubmitHandler} variant="primary">
        Log In
      </Button>
    </div>
    <Link to="/SignUp" className="block text-sm text-gray-700 mt-2">
      <div className="info">Create New Account?</div>
    </Link>
  </div>
  <ToastContainer />
</form>

  );
};

export default LogIn;
