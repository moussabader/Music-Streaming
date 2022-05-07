import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";


export const login = async (payload, dispatch) => {
	dispatch(loginStart());
	try {
		// const url = process.env.REACT_APP_AUTH_URI + "/auth/login";
		const url ="http://localhost:3001/auth/login";
		const { data } = await axios.post(url, payload);

		const decodeData = jwt_decode(data.accessToken);
		dispatch(loginSuccess({ ...decodeData, token: data.accessToken }));
		toast.success("Welcome");
		window.location = "/home";
		return true;
	} catch (error) {
		dispatch(loginFailure());
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			toast.error("Email or password is incorrect");
		} else {
			console.log(error);
			toast.error("Something went wrong!");
		}
		return false;
	}
};
