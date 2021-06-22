import { createContext } from "react";

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

function AuthContextProvider(props) {
  const data = {};

  return (
    <authContext.Provider value={data}>
      {/* Hier komt de rest van onze app */}
      {props.children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
