
import NavBar from "../components/NavBar"
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './Home';
import Question from './Question';


const DashBord = () => {


    const [quesId, setQuesId] = useState();
    return (
        <main className='dash-board'>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home quesId={quesId} setQuesId={setQuesId} />} />
                <Route path="/question" element={<Question quesId={quesId} setQuesId={setQuesId} />} />
            </Routes>
        </main>
    )
}

export default DashBord