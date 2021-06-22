import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const authContext = createContext({});

// - [x] AuthContext.js bestand aanmaken
// - [x] AuthContext maken met createContext
// - [x] AuthContextProvider functie component bouwen met daarin:
//    - [x] De property children
//    - [x] Het echte AuthContext.Provider component
//    - [x] Een leeg data object
// - [x] Geef het data object mee via de value={} property in de .Provider
// - [x] Exporteer zowel de Context als het zelfgemaakte Provider component
// - [x] Importeer het zelfgemaakte Provider component in index.js en wikkel deze om <App> heen

// - [x] Bedenk welke data je in de context beschikbaar moet stellen
// - [x] Maak de lege functies voor login en logOut
// - [x] Maak de state aan voor de gebruikersdata en de statusdata (user => null en status => 'pending')
// - [x] Maak ook alvast een useEffect functie die de status op 'done' zet als de app gerefreshed wordt (mounting cycle)
// - [x] Zorg ervoor dat we alleen de applicatie (dus de children) laten zien als de status op 'done' staat
// - [x] Plaats de state en lege functies in het data object

function AuthContextProvider(props) {
  const history = useHistory();
  const [authState, setAuthState] = useState({ user: null, status: "pending" });

  useEffect(() => {
    // @todo we proberen automatische in te loggen wanneer we nog een token hebben (later)
    setTimeout(() => setAuthState({ user: null, status: "done" }), 2000);
  }, []);

  async function getUserData(id, token) {
    setAuthState({ user: null, status: "pending" });
    try {
      const response = await axios.get(
        `http://localhost:3000/600/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthState({ user: response.data, status: "done" });
      history.push("/profile");

      // Authorized POST request
      // const response2 = await axios.post(
      //   "http://localhost:3000/600/users",
      //   {
      //     email: "kees@kees.com",
      //     password: "abcd1234",
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // console.log("USER DATA:", response2);
    } catch (error) {}
  }

  async function login(token) {
    // - [x] Zorg ervoor dat de inlogfunctie uit de context de JWT token kan ontvangen
    // - [x] Zet de token in de local storage
    // - [x] Haal alle belangrijke informatie uit de token (dit is voor iedere situatie anders! Sommige backends sturen direct de gebruikersdata mee terug!)
    //    - [x] Installeer jwt-decode
    //    - [x] Importeer jwt-decode
    //    - [x] Decode de token en en haal de user id eruit (die hebben we in ons geval nodig voor de gebruikersdata)
    // -  [x] Haal de gebruikersgegevens op
    //    - [x] Importeer axios
    //    - [x] Maak een aparte asynchrone functie (deze hebben we straks vaker nodig!)
    //    - [x] Roep die functie aan vanuit de login functie
    //    - [x] Maak een try / catch blok
    //    - [x] In de try: maak een axios GET request naar het eindpoint http://localhost:3000/600/users/${id} en stuur de token mee
    //    - [x] De data die we terugkrijgen zetten we in de state, en daarmee ook in de context (user: al die data en status: 'done')
    //    - [x] Link gebruiker door naar de profielpagina
    console.log("DO WE HAVE A TOKEN NAO?", token);
    localStorage.setItem("token", token);
    const dataFromToken = jwt_decode(token);
    console.log("WHAT IS IN THIS TOKEN THIING?", dataFromToken.sub);
    const userId = dataFromToken.sub;
    const userData = await getUserData(userId, token);

    // @todo
    // setAuthState({ user: "rein" });
  }

  function logout() {
    // @todo
  }

  // deze data maken we beschikbaar in de context
  const data = { authState: authState, login: login, logout: logout };

  return (
    <authContext.Provider value={data}>
      {/* Hier komt de rest van onze app */}
      {authState.status === "pending" && <h1>Fetching you data! Hold on</h1>}
      {authState.status === "done" && props.children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
