import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "../api/axios"

const SearchBar = ({ searchResults, setSearchResults, searchFocus, setSearchFocus }) => {
    const handleSubmit = (e) => e.preventDefault()
    const [query, setQuery] = useState();
    const handleSearchChange = (e) => {

        setQuery(e.target.value);
        axios.get(`/search?query=${query}`,
            {
                headers:
                {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then((responce) => {
            // console.log(responce);
            setSearchResults(responce.data.data)
        })
    }


    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search your questions here"
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={setSearchFocus(true)}
                    onBlur={setSearchFocus(false)}
                />
                <button className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header>
    )
}
export default SearchBar;