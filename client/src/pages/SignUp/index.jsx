import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import logo from "../../images/beatzz.png";
import styles from "./styles.module.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "April", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "August", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" },
];

const genders = ["male", "female"];

const SignUp = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		username: "",	
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const history = useHistory();

	const handleInputState = (username, value) => {
		setData((data) => ({ ...data, [username]: value }));
	};

	const handleErrorState = (username, value) => {
		value === ""
			? delete errors[username]
			: setErrors(() => ({ ...errors, [username]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		username: Joi.string().min(4).max(10).required().label("Name"),
		password_confirmation: Joi.any().equal(Joi.ref('password'))
    		.required()
    		.label('Confirm password')
    		.messages({ 'any.only': '{{#label}} does not match' }),

	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			try {
				setIsFetching(true);
				const url = "http://localhost:3001/auth/register";
				await axios.post(url, data);
				setIsFetching(false);
				toast.info("Account created successfully, Please confirm your mail address", { autoClose: 7000 });
				history.push("/login");
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error("Something wrong happened, please try again");
				} else {
					console.log(error);
					toast.error("Something went wrong!");
				}
			}
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img src={logo} alt="logo" />
			</div>
			<h1 className={styles.heading}>Sign up for free to start listening.</h1>
			<div  className={styles.links}>
			<button
					className={styles.contained_btn}
					style={{ background: "#3b5998" }}
				>
					<FacebookRoundedIcon /> continue with facebook
			</button>
				
			<button className={styles.outline_btn}>
				<GoogleIcon /> continue with google
			</button>

			</div>
			
			<p className={styles.or_container}>or</p>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				<h2 className={styles.form_heading}>Sign up with your email address</h2>
				<div className={styles.input_container}>
					<TextField
						label="What's your email?"
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
						label="Create a password"
						placeholder="Create a password"
						name="password"
						handleInputState={handleInputState}
						schema={schema.password}
						handleErrorState={handleErrorState}
						value={data.password}
						error={errors.password}
						type="password"
						required={true}
					/>
				</div>
				{/* <div className={styles.input_container}>
					<TextField
						label="Confirm your password"
						placeholder="Confirm your password"
						name="password_confirmation"
						handleInputState={handleInputState}
						schema={schema.password_confirmation}
						handleErrorState={handleErrorState}
						error={errors.password_confirmation}
						type="password"
						required={true}
						
					/>
				</div> */}
				<div className={styles.input_container}>
					<TextField
						label="What should we call you?"
						placeholder="Enter a username"
						name="username"
						handleInputState={handleInputState}
						schema={schema.username}
						handleErrorState={handleErrorState}
						value={data.username}
						error={errors.username}
						required={true}
					/>
				</div>
				{/* <div className={styles.date_of_birth_container}>
					<p>What's your date of birth?</p>
					<div className={styles.date_of_birth}>
						<div className={styles.month}>
							<Select
								name="month"
								handleInputState={handleInputState}
								label="Month"
								placeholder="Months"
								options={months}
								value={data.month}
								required={true}
							/>
						</div>
						<div className={styles.date}>
							<TextField
								label="Date"
								placeholder="DD"
								name="date"
								value={data.date}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.year}>
							<TextField
								label="Year"
								placeholder="YYYY"
								name="year"
								value={data.year}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
					</div>
				</div> */}
				{/* <div className={styles.input_container}>
					<Radio
						label="What's your gender?"
						name="gender"
						handleInputState={handleInputState}
						options={genders}
						required={true}
					/>
				</div> */}
				
				<p className={styles.terms_condition}>
					By clicking on sign-up, you agree to BeatzZ's{" "}
					<a href="/#">Terms and Conditions of Use.</a>
				</p>
				<p className={styles.terms_condition}>
					To learn more about how BeatzZ collects, uses, shares and protects
					your personal data, please see{" "}
					<a href="/#">BeatzZ's Privacy Policy.</a>
				</p>
				<div className={styles.submit_btn_wrapper}>
					<Button label="Sign Up" type="submit"  isFetching={isFetching}/>
				</div>
				<p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
					Have an account? <Link to="/login"> Log in.</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
