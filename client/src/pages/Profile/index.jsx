import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { FormControl, InputAdornment, InputLabel, OutlinedInput  } from "@mui/material";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "Apirl", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "Augest", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" },
];

const genders = ["male", "female"];

const Profile = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		month: "",
		year: "",
		date: "",
		bio:"",
		gender: "",
	});
	// const [errors, setErrors] = useState({});

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	// const handleErrorState = (name, value) => {
	// 	value === ""
	// 		? delete errors[name]
	// 		: setErrors(() => ({ ...errors, [name]: value }));
	// };

	// const schema = {
	// 	name: Joi.string().min(5).max(10).required().label("Name"),
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);
	};
	

  const handleToken = (token) => {
    fetch("http://localhost:3006/payment/subscribes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount : 3000}),
    })
    .then(res => res.json())
    .then(_ => {
      toast.success("Transaction successful, You are now a premium user", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
    }).catch(_ => toast.error("Transaction failed, please try again", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT  }))
  }

	return (
		<div className={styles.container}>
			<h1>Profile</h1>
			<form onSubmit={handleSubmit} className={styles.form_container}>
			
				<div className={styles.input_container}>
					<TextField
						label="What's your first name"
						placeholder="Enter your first name"
						name="firstName"
						handleInputState={handleInputState}
						value={data.firstName}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="What's your last name"
						placeholder="Enter your last name"
						name="lastName"
						handleInputState={handleInputState}
						//schema={schema.name}
						//handleErrorState={handleErrorState}
						value={data.lastName}
						// error={errors.name}
						//required={true}
					/>
				</div>
				<div className={styles.date_of_birth_container}>
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
				</div>
				<div className={styles.input_container}>
						<TextField
							label="Tell us more about you"
							placeholder="Enter your Bio"
							name="bio"
							handleInputState={handleInputState}
							//schema={schema.name}
							//handleErrorState={handleErrorState}
							value={data.bio}
							// error={errors.name}
							//required={true}
						/>
				</div>

				<div className={styles.input_container}>
					<Radio
						label="What's your gender?"
						name="gender"
						handleInputState={handleInputState}
						options={genders}
						value={data.gender}
						required={true}
					/>
				</div>
				<div className={styles.submit_btn_wrapper}>
				<form action="http://localhost:3006/payment/create-checkout-session" method="POST">
				
						<Button
							label="GET BEATZZ PREMIUM"
							style={{ backgroundColor:"#3eaba1",color: "#000", width: "25rem", fontSize: "1.4rem", }}
							type="submit"
						/>
				
				</form>	
				
					<Button label="Update" type="submit" />
				</div>
				
			
			</form>
		</div>
	);
};

export default Profile;
