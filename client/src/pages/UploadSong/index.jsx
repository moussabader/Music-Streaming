import styles from "./styles.module.scss";
import TextField from "../../components/Inputs/TextField";
import {useContext, useEffect, useRef, useState} from "react";
import Select from "../../components/Inputs/Select";
import Button from "../../components/Button";
import axios from 'axios';
import {toast} from "react-toastify";
import PlayerContext from "../../store/player-context";
import TextArea from "../../components/Inputs/TextArea";

const genres = [
    {name: "HipHop ", value: "HipHop,  "},
    {name: "Trap ", value: "Trap,  "},
    {name: "Country ", value: "Country,  "},
    {name: "Pop ", value: "Pop,  "},
    {name: "Funk ", value: "Funk,  "},
    {name: "Jazz ", value: "Jazz, "},
    {name: "Rock ", value: "Rock,  "},
    {name: "Blues ", value: "Blues,  "},
    {name: "KPop ", value: "KPop,  "},
    {name: "Instrumental ", value: "Instrumental, "},
    {name: "Alternative/Indie ", value: "Alternative/Indie,  "}
];

const UploadSong = () => {
    // const { user } = useSelector((state) => state.user);
    const user = {
        _id: '6268913cf11e47afa44c2e2e' ,
        username: 'usertest1',
        password: 'Password123@',
        email: 'test@gmail.com',
        follows:[] ,
        followers:[],
        accType: 'FREE' ,
        ROLE: 'BASIC_USER'
    }
    const user2 = {
        _id: '6267c66d65570fb4ebd0137b' ,
        username: '2',
        password: 'Password123@',
        email: 'test2@gmail.com',
        follows:[] ,
        followers:[],
        accType: 'FREE' ,
        ROLE: 'BASIC_USER'
    }
    const songRef = useRef();
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");

    const onInputFileChange = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0].type === 'audio/mpeg' ? event.target.files[0] : null);
    };
    const onInputImageChange = (event) => {
        setImage(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' ? event.target.files[0] : null);
    };
    const [data, setData] = useState({
        title: "",
        release: "",
        genre: "",
        artists: [user._id],
        lyrics: ""
    });
    const handleInputState = (name, value) => {
        setData((data) => ({...data, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('song', file)
        formData.append('image', image)
        formData.append('title', data.title)
        formData.append('genre', data.genre)
        formData.append('release', data.release)
        formData.append('artists', data.artists)
        formData.append('lyrics', data.lyrics)

        if (file && image) {
            await axios.post('http://localhost:3002/songs/post/', formData)
                .then((response) => {
                    toast.success('Upload Success');
                    console.log(response.data)
                })
                .catch((e) => {
                    toast.error('Upload Error')
                    console.log(e)
                })

        } else if (!file) {
            toast.error('Please select a proper audio file !')
        } else if (!image) {
            toast.error('Please select a proper image file !')
        }

        // console.log(user._id)

    };
    return (
        <div className={styles.container}>
            <h1>Upload Your Music</h1>
            <div className={styles.scroll__container}>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <div className={styles.input_container}>
                        <TextField
                            label="Title"
                            placeholder="Enter the song title"
                            name="title"
                            handleInputState={handleInputState}
                            value={data.title}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            label="Album Name"
                            placeholder="Enter the song's album "
                            name="release"
                            handleInputState={handleInputState}
                            value={data.release}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <Select
                            name="genre"
                            handleInputState={handleInputState}
                            label="Genre"
                            placeholder="Select your music type"
                            options={genres}
                            value={data.genre}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextArea
                            label="Song Lyrics"
                            placeholder="Enter the song's lyrics "
                            name="lyrics"
                            handleInputState={handleInputState}
                            value={data.lyrics}
                            required={true}
                        />
                    </div>
                    <div>
                        <input
                            accept={".mp3,.wav"}
                            ref={songRef}
                            type="file"
                            onChange={onInputFileChange}
                            style={{display: "none"}}/>
                        <input
                            type={"button"}
                            className={styles.primary_btn}
                            // isFetching={}
                            onClick={() => songRef.current.click()}
                            value={"Upload Song"}
                        />

                        <input
                            accept={".png,.jpg,.jpeg"}
                            ref={imageRef}
                            type="file"
                            onChange={onInputImageChange}
                            style={{display: "none"}}/>
                        <input
                            type={"button"}
                            className={styles.primary_btn}
                            // isFetching={}
                            onClick={() => imageRef.current.click()}
                            value={"Upload Cover"}/>
                    </div>
                    <div className={styles.custom}>
                        {file && (
                            <audio
                                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                controls

                            />
                        )}
                    </div>
                    <Button label="Upload Your Song"
                            style={{width: "18rem", marginBottom: "150px", marginTop: "20px", marginLeft: '130px'}}/>
                </form>
                <div className={styles.custom}>
                    {image && (
                        <img
                            src={typeof image === "string" ? image : URL.createObjectURL(image)}
                            alt="file"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadSong;
