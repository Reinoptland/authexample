import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

// - [x] Importeer axios
// - [x] Maak een asynchrone functie
// - [x] Maak een try / catch blok
// - [x] In de try: maak een POST request naar het eindpoint: http://localhost:3000/login
// - [x] Een POST request krijgt altijd de url en het data object mee (in dit geval alleen email en wachtwoord)
// - [x] Bekijk de response. Als het succesvol was, dan:
// - [ ] Moet de JWT worden doorgegeven aan de context vanuit hier:
//    - [ ] Importeeer useContext en AuthContext
//    - [ ] Destructure daar de login functie uit
//    - [ ] Roep deze functie aan als het inloggen succesvol was en geef de JWT token daaraan mee
// - Wanneer alles in de context goed gaat, zullen we ook vanuit daar de gebruiker doorlinken naar de profielpagina.
// - Puntjes op de i: error en laad-tijden inplemententeren (maar dit kun je inmiddels zelf!)

function SignIn() {
  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    try {
      console.log("DATA UIT FORMULIER??", data);
      const response = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response.data.accessToken);
    } catch (error) {
      console.log("Oh no", error);
    }
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
        debitis dolor dolore fuga id molestias qui quo unde?
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email-field">
          Emailadres:
          <input
            type="email"
            id="email-field"
            name="email"
            {...register("email")}
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
        <button type="submit" className="form-button">
          Inloggen
        </button>
      </form>
      <p>
        Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan
        eerst.
      </p>
    </>
  );
}

export default SignIn;
