import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SocketContext } from "../../context/SocketProvider"; // Assuming SocketContext is properly defined
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Checkbox from "@mui/material/Checkbox";
import "./loginpage.css";
import logo from "../../assets/file(2).png";

const LoginPage = () => {
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket && socket.on) {
      // Check if socket is defined and has the on method
      socket.on("login_error", () => {
        errorNotify();
      });
    }
  }, [socket]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const notify = (message, type) => {
    toast[type](message);
  };

  const errorNotify = () => {
    notify("Login unsuccessful", "error");
  };

  const login = async () => {
    try {
      const response = await fetch(`${process.env.BACK_END_URL}/Ezhu/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { userType, user, token } = data;

      setUserData(user);

      // Store user ID and token in localStorage
      localStorage.setItem("userId", user._id);
      localStorage.setItem("token", token);

      if (socket && socket.emit) {
        // Check if socket is defined and has the emit method
        socket.emit("user_logged_in", { userId: user._id });
      }
      switch (userType) {
        case "admin":
          navigate("/dashboard");
          break;
        case "investor":
        case "skilledperson":
          navigate("/skillworkerprofile", { state: { userData: user, token } });
          break;
        default:
          console.error("Unknown userType:", userType);
      }

      notify("Login successful", "success");
    } catch (error) {
      console.error("Login error:", error.message);
      errorNotify();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <>
      <ToastContainer />
      <section className="vh-100 login-container-background">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-space-between">
            <div className="col-md-5 main-container">
              <div className="card login-container">
                <div className="card-body">
                  <h2 className="mb-4 text-center loginHeading">Log in</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-2">
                      <div className="label-container">
                        <label htmlFor="inputEmail" className="label-set">
                          Email address or user name
                        </label>
                      </div>
                      <div>
                        <Input
                          id="inputEmail"
                          className="inputTypeLogin"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-outline form-white mb-2">
                      <div className="label-container">
                        <label htmlFor="inputPassword" className="label-set">
                          Password
                        </label>
                      </div>
                      <div>
                        <Input
                          id="inputPassword"
                          type="password"
                          className="inputTypeLogin"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <p className="small text-end mt-0">
                      <a href="#!" className="text-secondary">
                        Forgot password?
                      </a>
                    </p>
                    <div className="form-check mb-4 label-work">
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <label className="form-check-label ms-2">
                        Remember me
                      </label>
                    </div>
                    <Button
                      className="loginpage-login-Button mb-3"
                      name="Log in"
                      type="submit"
                    />
                  </form>
                  <hr className="hr-line" />
                  <div className="text-center">
                    <p className="mb-3">
                      <span className="span-class">
                        Don't have an account?{" "}
                      </span>
                      <Button
                        className="loginpage-signup-Button mb-3"
                        name="Sign up"
                        onClick={() => navigate("/signup")}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 image-container">
              <div className="text-center">
                <img src={logo} alt="Logo" className="login-logo-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer text-center mt-5 footer-background">
        <p className="mb-0">
          <a href="#help">Help Center</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="mailto:info@ezhu.com">@ezhu.com</a>
        </p>
      </footer>
    </>
  );
};

export default LoginPage;
