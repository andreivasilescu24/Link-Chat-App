import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import "./style.css";
import { useUser } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../services/Auth";

export interface LoginProps {
  history: ReturnType<typeof useHistory>;
}
function Login({ history }: LoginProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { userDetails, setUserDetails } = useUser();

  const proceed = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      usernameRef.current &&
      usernameRef.current.value &&
      passwordRef.current &&
      passwordRef.current.value
    ) {
      try {
        await login(usernameRef.current.value, passwordRef.current.value);
        // success message
        const response = "Successfully logged in!";

        Swal.fire({
          title: response,
          icon: "success",
          showConfirmButton: true,
        }).then(() => history.push("/room"));
      } catch (e: any) {
        // Error message
        Swal.fire({
          title: e.response.data,
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });

        throw e;
      }
    } else {
      setErrorMsg("Fill-in both username and password");
    }
  };

  const goToSignup = async () => {
    history.push("/signup");
  };

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  return (
    <div className="login auth__wrapper">
      <div className="login__area area__wrapper">
        <h1>PLink Login</h1>
        <form>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username or Email"
            required
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
          <Button
            onClick={proceed}
            type="submit"
            variant="contained"
            color="primary"
            className="secondary"
            size="large"
          >
            Proceed
          </Button>
          <p>
            Don't have an account yet?
            <b className="signup__link header__text" onClick={goToSignup}>
              Register here
            </b>
          </p>
        </form>
        {errorMsg && <strong className="error__msg">{errorMsg}</strong>}
      </div>
    </div>
  );
}

export default Login;
