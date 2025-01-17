import { createContext, useReducer } from "react";
import AlertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //경고창 메세지를 설정하고 3초 뒤 제거
  const setAlert = (msg, type) => {
    //console.log("setAlert called with: ", msg, type);
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => {
      //console.log("Removing alert");
      dispatch({ type: 'REMOVE_ALERT' });
    }, 3000);
  }

  return (
    <AlertContext.Provider value={{
      alert: state,
      setAlert
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext;