import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

function Home() {
  const authData = useContext(authContext);
  // console.log("WHAT IS IN THIS DATA?", authData); //
  return (
    <>
      <h1>Homepagina</h1>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
          debitis dolor dolore fuga id molestias qui quo unde?
        </p>
      </section>
      <section>
        <p>
          Als je ingelogd bent, bekijk dan de{" "}
          <Link to="/profile">Profielpagina</Link>
        </p>
        <p>
          Je kunt ook <Link to="/signin">inloggen</Link> of jezelf{" "}
          <Link to="/signup">registeren</Link> als je nog geen account hebt.
        </p>
      </section>
    </>
  );
}

export default Home;
