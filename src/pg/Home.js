
import axios from '../api/axios';

import QuesCard from '../components/QuesCard';
import SearchBar from '../components/SearchBar';
import AskQuestion from './AskQuestion';
import '../styles/Home.scss'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const Home = ({ quesId, setQuesId }) => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    // const [quesId,setQuesId]=useState(0);

    const [questions, setQuestions] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);
    const [quesAsked, setQuesAsked] = useState(0);
    const [ansPosted, setAnsPosted] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        try {
            const UserResponce = async () => {
                const rep = await axios.get('/get-user-profile',
                    {
                        headers:
                        {
                            'Authorization': "Bearer " + localStorage.getItem("jwt")
                        }
                    }
                )
                // console.log(localStorage.getItem("jwt"));
                setQuesAsked(rep.data.data.no_of_qns_posted);
                setAnsPosted(rep.data.data.no_of_qns_answered);
            };
            const getQuestions = async () => {
                const rep = await axios.get('/get-questions',
                    {
                        headers:
                        {
                            'Authorization': "Bearer " + localStorage.getItem("jwt")
                        }
                    }
                )
                setQuestions(rep.data.data);
                // console.log(questions);
            };
            const getUserQuestions = async () => {

                const rep = await axios.get(
                    '/get-user-questions',
                    {
                        headers:
                        {
                            'Authorization': "Bearer " + localStorage.getItem("jwt")
                        }
                    }

                )
                console.log(rep.data.data)
                setUserQuestions(rep.data.data);

            }
            getQuestions();
            UserResponce();
            getUserQuestions();



        }
        catch (error) {
            console.log(error);
        }
    }, [])


    const content = questions.map((question) => {
        // console.log(searchResult);
        return <QuesCard question={question} quesId={quesId} setQuesId={setQuesId} />
    })
    const UserContent = userQuestions.map((question) => {
        // console.log(searchResult);
        return <QuesCard question={question} quesId={quesId} setQuesId={setQuesId} />
    })
    // console.log("content uh" + content);
    const searchContent = (searchResult) => {
        if (!searchResult)
            return content(questions)

        return searchResult.map((question) => {
            // console.log(searchResult);
            return <QuesCard question={question} quesId={quesId} setQuesId={setQuesId} />
        });

    }
    useEffect(() => {

        searchContent(searchResult)

        // console.log(searchResult)

    }, [searchResult])
    return (
        <section className='body-container-home'>
            <section className={isClicked ? "post-question" : "off-screen"}>
                <AskQuestion setIsClicked={setIsClicked} isClicked={isClicked} />
            </section>
            <section className='left-box'>
                <section className='search-box'>
                    <button className='post-ques-button'
                        onClick={() => {
                            // navigate("../postquestion")
                            setIsClicked(!isClicked)
                        }}
                    >
                        Post Question

                    </button>
                    <SearchBar
                        searchResult={searchResult}
                        setSearchResults={setSearchResult}
                        searchFocus={setSearchFocus}
                        setSearchFocus={setSearchFocus}
                    />
                </section>
                <section className='ques-box' id="top">

                    {searchResult.length != 0 ? searchContent(searchResult) : content}
                    {/* {isFetchingNextPage && <p className="center">Loading More Questions...</p>} */}
                    {/* <p className="center"><a href="#top">Back to Top</a></p> */}


                </section>
            </section>
            <section className='right-box'>
                <section className='tip-box'>

                    <section className='tips'>
                        <h2>Daily Tips !</h2>
                        <br />
                        <h1>{'"Consistency is a key..!"'}</h1>
                    </section>
                    <section className='ques-details'>
                        <h1>Questions asked:{quesAsked}{"|             |"}Answers Posted:{ansPosted}</h1>
                    </section>
                </section>
                <section className='ques-box' id='top'>
                    <h1>Your Questions</h1>
                    {UserContent}
                </section>
            </section>
        </section>
    )
}

export default Home