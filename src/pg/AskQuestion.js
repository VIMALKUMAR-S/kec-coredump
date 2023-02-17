// import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router";
import axios from "../api/axios";
// import '../styles/AskQuestion.scss'

const AskQuestion = ({ setIsClicked, isClicked }) => {

    const [question, setQuestion] = useState("");
    const [image, setImage] = useState()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        const formData = new FormData();

        const finalSend = {
            'question': question,
            "tags": "agile,java"
        }
        formData.append('question', JSON.stringify(finalSend));

        formData.append('image', image);
        // formData.append();
        console.log(JSON.stringify(formData))
        axios.post(
            '/save-question',
            formData,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(
            () => {

                setIsClicked(false);
            }
        )


    }
    // useEffect

    return (

        <div className={isClicked ? 'overlay' : 'off-screen'}>
            <div className="popup">


                <button className="close"
                    onClick={() => setIsClicked(false)}
                >&times;</button>
                <textarea className="content"
                    onChange={(event) => {
                        setQuestion(event.target.value);
                    }}
                    placeholder="Type your question here..."
                    value={question}
                >

                </textarea>
                {/* {image && <img src={image.preview} width='100' height='100' />} */}
                <input type='file' name='file' onChange={(event) => {
                    console.log(event.target.files[0])
                    setImage(event.target.files[0])
                }}></input>

                <button onClick={handleSubmit} className="button1">
                    Submit
                </button>

            </div>
        </div>



    )
}

export default AskQuestion