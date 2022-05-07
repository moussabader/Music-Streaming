import styles from "./styles.module.scss";
import Select from "../Inputs/Select";
import TextField from "../Inputs/TextField";
const scopes = [
    {name: "Private", value: "PRIVATE"},
    {name: "Public", value: "PUBLIC"},
    {name: "Friends Only", value: "FRIENDS_ONLY"},
];
const Modal = (props) => {
    return(
        <div className={styles.container}>
            <TextField
                label="Playlist Name"
                name="title"
                handleInputState={props.handler}
                value={props.playlist.title}
                required={true}
            />
            <Select
                name="scope"
                handleInputState={props.handler}
                label="Playlist Availability"
                options={scopes}
                value={props.playlist.scope}
                required={true}
            />
            <button className={styles.btn} onClick={props.onCloseModal}>Cancel</button>
            <button className={styles.btn} onClick={props.onUpdateHandle}>Confirm</button>
        </div>
    );
}
export default Modal;
