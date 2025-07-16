import React, {
  createContext, //a new context that can help share values in components
  useContext, // helps you access context values that are stored in the created context
  useEffect, //
  useState, // helps add state to components, ie values and what the component is at a specific time
} from "react";

// create authentication context to keep authentication values
const AuthenticationNecessities = createContext();

// this function taps into our authentication nacessities like function and values
function useAuthenticationNecessities() {
  return useContext(AuthenticationNecessities);
}

// this function actually serves the values
function AuthenticationNecessitiesProvider({ children }) {
  //
  // create state for authentication state -- starts as false when some one logs in
  const [authenticationState, setAuthenticationState] = useState(false);

  useEffect(
    // the effect function that runs the moment the component is mounted to the DOM
    // in this case it sets the authenication state by accessing the session storage
    // by checking whether the sessionstorage has a user id who logged in earlier

    function initializeAuthentication() {
      const userId = sessionStorage.getItem("userId");
      setAuthenticationState(!!userId);
    },
    []

    /*
        the second param of the useEffect is the dependency array
        it contains values that if they change, the function is run in useEffect is run again

        CASES TO CONSIDER
        
        empty array means it is run onlu once the component is mounted ie the app is start 
        and the component is mounted into the DOM

        no array at all; this means eff-fn is run on every re render 
        THATS BADDDD COMPUTATIONAL POWER TOO MUCH 
    */
  );

  //ADD LOGIN PROCESS
  function login(userId, username) {
    // this keeps the userId that probably comes from
    // a database and stores it in the sessionstorage
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("username", username);

    /* 
    then it sets the authentication to true 
    so that the app knows that youre logged in 
    */
    setAuthenticationState(true);
  }

  // LOGOUT FUNCTION
  function logout() {
    // this REMOVES the userId from the sessionstorage (search it by key just)
    sessionStorage.removeItem("userId");

    // this REMOVES the username from the sessionstorage (search it by key just)
    sessionStorage.removeItem("username");

    /* 
    then it sets the authentication to false 
    */
    setAuthenticationState(false);
  }

  // compile all things you have built and send them out into the wild (i mean your app hahaha)
  return (
    <AuthenticationNecessities.Provider
      value={{ authenticationState, login, logout }}
    >
      {children}
    </AuthenticationNecessities.Provider>
  );
}

export { useAuthenticationNecessities, AuthenticationNecessitiesProvider };
