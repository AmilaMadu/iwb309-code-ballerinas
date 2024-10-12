import { createContext, useState , useEffect} from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const currencySymbol = 'Rs.'
    const backendUrl = "http://localhost:9090"
    const [user_id, setUserId] = useState(null)
    const value ={
        doctors, 
        currencySymbol,
        user_id, setUserId,
        backendUrl
    }
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        console.log('Stored user_id in localStorage:', storedUserId);  // Debugging log
        if (storedUserId) {
          setUserId(storedUserId);
        }
      }, []);

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider