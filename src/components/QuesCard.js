import React from 'react'
import useCollapse from 'react-collapsed'
import { useNavigate } from 'react-router';
import AnsBox from './AnsBox';


const QuesCard = ({ question, setQuesId }) => {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const navigate = useNavigate();
    const handleSubmit = () => {
        setQuesId(question.id);

        navigate('../question')
    }
    return (
        <div className="question" key={question.id}>

            <div {...getCollapseProps()}>
                <div >
                    <p>{question.question}</p>
                </div>
            </div>
            <div className="toggle" {...getToggleProps()}
            // onMouseOver={isExpanded}
            >
                {isExpanded ?
                    <section >
                        <AnsBox ans={question.answers} />
                        <section className='button-wrapper'>
                            <button onClick={handleSubmit}>
                                Post Your Answer
                            </button>
                            <button>
                                Hide
                            </button>
                        </section>
                    </section> : question.question.split(/\s+/).slice(0, 20).join(" ") + "..."}
            </div>
        </div>

    )


}

export default QuesCard;
