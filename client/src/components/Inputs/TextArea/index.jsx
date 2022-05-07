import Joi from "joi";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";

const TextArea = ({
	label,
	error,
	handleInputState,
	handleErrorState,
	schema,
	...rest
}) => {
	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const inputSchema = Joi.object({ [name]: schema });
		const { error } = inputSchema.validate(obj);
		return error ? error.details[0].message : "";
	};

	const handleChange = ({ currentTarget: input }) => {
		if (schema) {
			const errorMessage = validateProperty(input);
			if (handleErrorState) handleErrorState(input.name, errorMessage);
		}
		handleInputState(input.name, input.value);
	};

	return (
		<div className={styles.container}>
			<p>{label}</p>
			<textarea
				{...rest}
				onChange={handleChange}
				className={
					error ? `${styles.textarea} ${styles.error}` : `${styles.textarea} `
				}
			/>
			{error && (
				<p className={styles.error_msg}>
					<ClearIcon /> {error}
				</p>
			)}
		</div>
	);
};

export default TextArea;
