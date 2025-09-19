import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase.isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await firebase.singInUserWithEmailAndPass(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    color: "#333",
    overflow: "hidden",
  };

  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    zIndex: 2,
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
  };

  const googleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#db4437",
    borderColor: "#db4437",
    color: "#fff",
  };

  const animatedBackgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  const circleStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    animation: "move 10s infinite ease-in-out",
  };

  return (
    <div style={pageStyle}>
      <div style={animatedBackgroundStyle}>
        <div
          style={{
            ...circleStyle,
            width: "200px",
            height: "200px",
            top: "10%",
            left: "20%",
            animationDuration: "8s",
          }}
        ></div>
        <div
          style={{
            ...circleStyle,
            width: "300px",
            height: "300px",
            top: "50%",
            left: "70%",
            animationDuration: "12s",
          }}
        ></div>
        <div
          style={{
            ...circleStyle,
            width: "150px",
            height: "150px",
            top: "80%",
            left: "30%",
            animationDuration: "10s",
          }}
        ></div>
      </div>
      <div style={formContainerStyle}>
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <Button
            variant="primary"
            type="submit"
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <h5 className="text-center mt-4">or</h5>

        <Button
          onClick={firebase.signinWithGoogle}
          style={googleButtonStyle}
          disabled={loading}
        >
          Sign in with Google
        </Button>
      </div>
      <style>{`
        @keyframes move {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
