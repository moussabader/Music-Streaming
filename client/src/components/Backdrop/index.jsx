import styles from "./styles.module.scss";

const Backdrop = (props) => {
    return(
        <div className={styles.backdrop} onClick={props.onCloseModal}/>
    );
}
export default Backdrop;
