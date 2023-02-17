
import Logo from './Logo'
import '../styles/NavBar.scss'
import axios from '../api/axios'
import { useNavigate } from 'react-router';
const NavBar = () => {
    const navigate = useNavigate();
    const handleLogOut = (e) => {
        axios.post(
            '/logout',
            {},
            {
                headers: {

                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }

            }
        ).then(
            () => {
                localStorage.setItem('jwt', "");
                navigate('../auth');

            }
        )
    }
    return (
        <header className='navbar-container'>
            <Logo />

            <button

                onClick={() => { handleLogOut() }} className='logout-button'>
                Logout
            </button>
        </header>
    )
}

export default NavBar
