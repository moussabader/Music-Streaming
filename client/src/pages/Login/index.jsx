import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice/apiCalls";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../images/beatzz.png";
import styles from "./styles.module.scss";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	const handleClickShowPassword = () => {
		setData({ ...data, showPassword: !data.showPassword });
	  };
	  
	  const handleMouseDownPassword = (event) => {
		event.preventDefault();
	  };
	  
	  const handlePasswordChange = (prop) => (event) => {
		setData({ ...data, [prop]: event.target.value });
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
		
			 login(data, dispatch);
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo_container}>
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<main className={styles.main}>
				<h1 className={styles.heading}>To continue, log in to BeatzZ.</h1>
				<button
					className={styles.contained_btn}
					style={{ background: "#3b5998" }}
				>
					<FacebookRoundedIcon /> continue with facebook
				</button>
				
				<button className={styles.outline_btn}>
					<GoogleIcon /> continue with google
				</button>
				
				<p className={styles.or_container}>or</p>
				<form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label="Enter your email"
							placeholder="Enter your email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Password"
							placeholder="Password"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							onChange={handlePasswordChange("password")}
							error={errors.password}
							type={data.showPassword ? "text" : "password"}
							required={true}
							endadornment={
								<InputAdornment position="end">
								  <IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								  >
									{data.showPassword ? <Visibility /> : <VisibilityOff />}
								  </IconButton>
								</InputAdornment>
							  }
						/>
					</div>
					<p className={styles.forgot_password}>Forgot your password?</p>
					<div className={styles.form_bottom}>
						<Checkbox label="Remember me" />
						<Button
							type="submit"
							label="LOG IN"
							isFetching={isFetching}
							style={{ color: "white", background: "#1A7E8E", width: "20rem" }}
						/>
					</div>
				</form>
				<h1 className={styles.dont_have_account}>Don't have an account?</h1>
				<Link to="/signup">
					<button className={styles.outline_btn}>sign up for BeatzZ</button>
				</Link>
			</main>
		</div>
	);
};

export default Login;
