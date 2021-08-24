import { useReducer, createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "61123fa933a8f33c0812c250",
    username: "happyhumza",
    email: "humza@gmail.com",
    profilePicture: "person/5.jpeg",
    coverPitcture: "",
    isAdmin: false,
    city: "Johansan City",
    followers : ["611245ad956e52423027f21e"],
    followings: [],
  },
  isFetching : false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
