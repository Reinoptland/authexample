import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  // - [x] Installeer axios
  // - [x] Importeer axios
  // - [x] Maak een asynchrone functie
  // - [x] Maak een try / catch blok
  // - [x] In de try: maak een POST request naar het eindpoint: http://localhost:3000/register
  // - [x] Een POST request krijgt altijd de url en het data object mee (in dit geval minimaal email en wachtwoord)
  // - [x] Laat de gebruiker weten dat het registeren is gelukt
  // - [x] Stuur de gebruiker na twee seconden door naar het inlog-formulier
  // - [x] Puntjes op de i: error en laad-tijden implemententeren
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [success, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    console.log("DATA VAN DE GEBRUIKER??", data);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/register", {
        email: data.email,
        username: data.username,
        password: data.password,
      });
      console.log(response);
      setSucces(true);
      setTimeout(() => history.push("/signin"), 2000);
    } catch (error) {
      console.log("OH NO", error);
    }

    setLoading(false);
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>{success && "Registeren is gelukt!"}</p>
      <p>{loading && "Moment geduld aub"}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
        debitis dolor dolore fuga id molestias qui quo unde?
      </p>
      {!success && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
            Email:
            <input
              type="email"
              id="email-field"
              name="email"
              {...register("email")}
            />
          </label>

          <label htmlFor="username-field">
            Gebruikersnaam:
            <input
              type="text"
              id="username-field"
              name="username"
              {...register("username")}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
              type="password"
              id="password-field"
              name="password"
              {...register("password")}
            />
          </label>
          <button disable={loading} type="submit" className="form-button">
            Maak account aan
          </button>
        </form>
      )}
      <p>
        Heb je al een account? Je kunt je <Link to="/signin">hier</Link>{" "}
        inloggen.
      </p>
    </>
  );
}

export default SignUp;
