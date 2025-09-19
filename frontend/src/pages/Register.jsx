import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await firebase.signupUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    color: "#fff",
  };

  const animatedBackgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    overflow: "hidden",
  };

  const circleStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    animation: "move 10s infinite ease-in-out",
  };

  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
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
            top: "40%",
            left: "60%",
            animationDuration: "12s",
          }}
        ></div>
        <div
          style={{
            ...circleStyle,
            width: "150px",
            height: "150px",
            top: "70%",
            left: "30%",
            animationDuration: "10s",
          }}
        ></div>
      </div>
      <div style={formContainerStyle}>
        <h2>Create an Account</h2>
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <div className="alert alert-danger">{error}</div>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>
        <div className="mt-3">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
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

export default RegisterPage;
  