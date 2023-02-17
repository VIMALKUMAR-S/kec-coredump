
import '../styles/AnsCard.scss'
import AnsCard from './AnsCard.js'
const AnsBox = ({ ans = [] }) => {
    return (
        ans.length > 0 ?
            <section className="ans-box">
                {ans.map((answer) => {
                    return <AnsCard {...answer} />
                    // console.log(an.answer);
                })}
            </section> :
            <section className='ans-box'>
                No Answers posted
            </section>
    )
}

export default AnsBox