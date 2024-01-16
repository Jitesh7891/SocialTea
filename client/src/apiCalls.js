import axios from "axios"

export const loginCall = async (userCredential, dispatch) => {

    dispatch({ type: "LOGIN_START" });

    try {
        const res = await axios.post(process.env.REACT_APP_BACKEND+"/api/auth/login", userCredential)

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
        
        dispatch({ type: "LOGIN_FAILURE", payload: error});

    }
}