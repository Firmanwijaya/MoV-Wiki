import "../styles/pages/LandingPage.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../bootstrap/action";

function LandingPage({ users, isLogin, setIsLogin, api }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const { access_token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set isLogin to Local Storage
    localStorage.setItem("isLogin", isLogin);

    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    // Set Access Token to Local Storage
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }
  }, [access_token]);

  return (
    <div className="landing-page">
      <div className="illustration">
        <div className="illustration-image">
          <div className="image-lp"></div>
        </div>
      </div>

      <div className="form">
        <Form
          onSubmit={(event) => {
            event.preventDefault();

            if (password.password !== confirmPassword.confirmPassword) {
              alert("Password dan Confirm Password tidak sesuai");
              return false;
            }

            api
              .post("/login", {
                username: email.email,
                password: password.password,
              })
              .then((res) => {
                dispatch(setAccessToken(res.data.access_token));
              })
              .catch((err) => console.log(err.response.data))
              .then(() => {
                setIsLogin(() => true);
              });
          }}
        >
          <h2>Login</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Email"
              onChange={(event) => {
                setEmail((prev) => ({ ...prev, email: event.target.value }));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              onChange={(event) => {
                setPassword((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setConfirmPass((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }));
              }}
            />
          </Form.Group>

          <div className="button-container">
            <button type="submit">Log In</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LandingPage;
