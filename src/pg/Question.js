import { useState } from "react"
import { useEffect } from "react"
import axios from "../api/axios";

import '../styles/Question.scss'

import AnsBox from "../components/AnsBox";
import PopUp from "../components/PopUp";


const Question = ({ quesId, setQuesId }) => {

    // const navigate = useNavigate();
    const [ans, setAns] = useState([{}]);
    const [ques, setQues] = useState("");
    const [askerId, setAskerId] = useState();
    const [asker, setAsker] = useState({});
    const [postAns, setPostAns] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const handleReport = () => {
        axios.get(
            `/report-question?id=${quesId}`,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(console.log("reported"))
    }
    useEffect(() => {

        if (quesId) {
            localStorage.setItem("quesId", quesId)
        }

        const responce = async () => {
            const rep1 = await axios.get(
                `/get-question-by-id/?id=${quesId}`,
                {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("jwt")
                    }
                }

            );
            console.log("actual obj:" + JSON.stringify(rep1));
            setQues(rep1.data.data.question);
            setAns(rep1.data.data.answers);
            setAskerId(rep1.data.data.userId);
            setImage(rep1.data.data.image);

        }
        const responce2 = async () => {
            const rep1 = await axios.get(
                `/get-question-by-id/?id=${localStorage.getItem('quesId')}`,
                {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("jwt")
                    }
                }

            );
            console.log("actual obj:" + JSON.stringify(rep1));
            setQues(rep1.data.data.question);
            setAns(rep1.data.data.answers);
            setAskerId(rep1.data.data.userId);
            setImage(rep1.data.data.image);

        }


        try {
            // console.log("refreshed" + JSON.stringify(quesId));
            if (quesId) {
                responce();
            }
            else {
                responce2();
            }

        }
        catch (error) {
            console.log(error);
        }
        //return responce;

    }, [])

    useEffect(
        () => {
            const details = async () => {
                console.log("asker id" + askerId)

                const rep = await axios.get(
                    `/get-user-profile/${askerId}`,
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("jwt")
                        }
                    }

                );
                console.log("asker" + JSON.stringify(rep.data.data))
                setAsker(rep.data.data);
            }

            try {
                details();
            }
            catch (error) {
                console.log(error);
            }

        }, [askerId]
    )
    const handleSubmit = () => {
        const formData = new FormData();
        const finalSend = {
            'answer': postAns,
            'questionID': quesId

        }
        formData.append('answer', JSON.stringify(finalSend));
        setLoading(true);
        axios.post(
            '/save-answer',
            formData,
            {
                headers: {

                    'Authorization': "Bearer " + localStorage.getItem("jwt")


                }

            }
        ).then(
            () => {
                setIsClicked(false);
                setLoading(false);
                setAns([...ans, postAns])
            }
        )



    }

    return (
        <main className="main-container-ques" >

            <PopUp
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                placeholder="Type your answer here..."
                handleSubmit={handleSubmit}
                title={ques}
                inputVal={postAns}
                setInputVal={setPostAns}
                loading={loading}
            />
            <section className="ques-page">


                <section className="right-box">
                    <section className="ques-box">

                        <h6>Question</h6>
                        <h1>{ques}</h1>


                    </section>
                    <section className="button-wrapper">
                        <button className="post-answer"
                            onClick={() => setIsClicked(true)}
                        >
                            Post Your answer
                        </button>

                        <button className="report"
                            onClick={() => handleReport()}
                        >
                            Report
                        </button>
                    </section>
                    <AnsBox ans={ans} />

                </section>
                <section className="left-box">
                    <section className="user-datails">
                        <h5>Name:{asker.name}</h5>
                        <h5>Roll Number:{asker.rollNo}</h5>
                        <h5>Year:{asker.year}</h5>
                        <h5>Email:{asker.email}</h5>
                    </section>
                    <section className="image-container" >

                        <img src={image} alt="Related image" width="300" height="300" border='none' />
                    </section>
                </section>

            </section>

        </main>


    )
}

export default Question