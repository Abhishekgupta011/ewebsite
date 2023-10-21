import React , { useEffect , useState} from "react";

export const AuthenticationContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, expiresIn) => {},
    logout: () => {},
    refreshToken: "",
    expiresIn: "",
  });
  
  export const AuthenticationProvider = (props) => {
   
    const storedToken = localStorage.getItem("authToken");
    const [token, setToken] = useState(storedToken);
    const userLoggedIn = !!token;
  
    // Update localStorage when token changes
    useEffect(() => {
        
      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    }, [token]);
  
    const login = (newToken, expiresIn = 300) => {
      setToken(newToken);
      console.log("aaaaaaab")
      const expirationTime = expiresIn * 1000; // Convert expiresIn to milliseconds
      setTimeout(logout, expirationTime); // Set timeout for auto logout
      
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("expirationTime", expirationTime.toString());
    };
  
    const logout = () => {
      setToken(null);
      localStorage.removeItem("email");
      localStorage.removeItem("authToken");
      localStorage.removeItem("expirationTime");
      
    };
  
    const contextValue = {
      token: token,
      isLoggedIn: userLoggedIn,
      login: login,
      logout: logout,
      refreshToken: "",
      expiresIn: "",
    };
  
    return (
      <AuthenticationContext.Provider value={contextValue}>
        {props.children}
      </AuthenticationContext.Provider>
    );
  };
  
  