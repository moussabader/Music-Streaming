import { useRef } from "react";
import Button from "../../Button";
import styles from "./styles.module.scss";

const FileInput = ({
	name,
	label,
	value,
	icon,
	type,
	handleInputState,
	...rest
}) => {
	const inputRef = useRef();

	return (
		<div className={styles.container}>
			<input
				type="file"
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				value={value}
				{...rest}
			/>
			<Button
				style={{
					width: "15rem",
				}}
				onClick={() => inputRef.current.click()}
				label={label}
			/>
			{type === "image" && value && (
				<img
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					alt="file"
				/>
			)}
			{type === "audio" && value && (
				<audio
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					controls
				/>
			)}

		</div>
	);
};

export default FileInput;
