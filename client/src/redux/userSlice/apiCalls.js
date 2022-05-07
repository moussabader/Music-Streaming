import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import * as actions from "./index";

// const apiUrl = process.env.USER_URI;
const apiUrl = "http://localhost:3003";

export const getUser = async (userId, dispatch) => {
	
	dispatch(actions.getUserStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + `/user/getOne/${userId}`);
		dispatch(actions.getUserSuccess(data.data));
		console.log(data.data)
		
		return data.data;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

export const updateUser = async (payload, dispatch) => {
	dispatch(actions.updateUserStart());
	try {
		const url = apiUrl + `/users/${payload.id}`;
		const { data } = await axiosInstance.put(url, payload.data);
		dispatch(actions.updateUserSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

// export const likeSong = async (payload, dispatch) => {
// 	dispatch(actions.likeSongStart());
// 	try {
// 		const { data } = await axiosInstance.put(apiUrl + `/songs/like/${payload}`);
// 		dispatch(actions.likeSongSuccess(payload));
// 		toast.success(data.message);
// 		return true;
// 	} catch (error) {
// 		dispatch(actions.likeSongFailure());
// 		return false;
// 	}
// };
