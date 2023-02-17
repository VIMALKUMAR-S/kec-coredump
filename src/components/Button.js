

const Button = ({ type, content, className }) => {
    return (
        <button
            type={type}
            className={className}
        >
            {content}
        </button>
    )
}

export default Button
