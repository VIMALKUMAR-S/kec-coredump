import React from 'react'

export const PopUp = (
    { isClicked,
        setIsClicked,
        placeholder,
        handleSubmit,
        title = "",
        inputVal = "",
        setInputVal,
        loading
    }) => {
    return (
        <div className={isClicked ? 'overlay' : 'off-screen'}>
            <div className="popup">
                <h4>
                    {title}
                </h4>

                <button className="close"
                    onClick={() => setIsClicked(false)}
                >&times;</button>
                <textarea className="content"
                    placeholder={placeholder}
                    value={inputVal}
                    onChange={(e) => {
                        setInputVal(e.target.value)
                    }}

                >

                </textarea>
                <button className="button1"
                    disabled={inputVal.length <= 0 || loading}
                    onClick={
                        handleSubmit
                    }

                >
                    Submit
                </button>
            </div>
        </div>
    )
}
export default PopUp;