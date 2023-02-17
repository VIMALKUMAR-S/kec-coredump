import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import axios from "../api/axios"
// import '../styles/AnsCard.scss'


const AnsCard = (answer) => {
    const [upVote, setUpvote] = useState(answer.upVote)

    const sendLike = (ansId) => {

        axios.post(
            '/handle-upVote',
            { answerId: ansId },
            {
                headers:
                {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }

            }
        ).then((responce) => {
            setUpvote(upVote + 1);
        })
    }

    return (
        <section className="answer"
            key={answer.id}>
            <button className="like-button"
                onClick={() => { sendLike(answer.id) }}
            ><strong>{upVote ? upVote : ""}</strong><FontAwesomeIcon icon={faThumbsUp} /></button>

            {answer.answer}


        </section>
    )
}

export default AnsCard