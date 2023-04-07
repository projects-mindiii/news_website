import "./Button.css";
//------Custom Common Button-----

const STYLES = [
    "btn--danger--solid",
];

function CustomBtn({ children, type, onClick, buttonStyle }) {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    return (
        <button onClick={onClick} type={type} className={`btn ${checkButtonStyle}`}>
            {children}
        </button>
    );
}

export default CustomBtn;