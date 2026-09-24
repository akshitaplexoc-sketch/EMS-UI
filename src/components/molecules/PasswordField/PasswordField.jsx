import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "../../atoms/Input";

import "./PasswordField.css";

function PasswordField({

    label,

    ...props

}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="password-group">

            <label>

                {label}

            </label>

            <div className="password-wrapper">

                <Input

                    {...props}

                    type={

                        showPassword

                            ? "text"

                            : "password"

                    }

                />

                <button

                    type="button"

                    className="password-toggle"

                    onClick={() =>

                        setShowPassword(

                            !showPassword

                        )

                    }

                >

                    {

                        showPassword

                            ? <EyeOff size={20} />

                            : <Eye size={20} />

                    }

                </button>

            </div>

        </div>

    );

}

export default PasswordField;