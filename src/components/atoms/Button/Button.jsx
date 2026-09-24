import "./Button.css";

function Button({

    children,

    text,

    type="button",

    variant="primary",

    className="",

    ...props

}){

    return(

        <button

            type={type}

            className={`button ${variant} ${className}`}

            {...props}

        >

            {text || children}

        </button>

    );

}

export default Button;