import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

function Header() {
  const history = useHistory();
  const {
    logout,
    authState: { user },
  } = useContext(authContext);

  return (
    <header>
      <div>
        {!user ? (
          <>
            <button type="button" onClick={() => history.push("/signin")}>
              Log in
            </button>
            <button type="button" onClick={() => history.push("/signup")}>
              Registreren
            </button>
          </>
        ) : (
          <button type="button" onClick={logout}>
            Loguit
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
