import Input from "../../atoms/Input";

import "./FormField.css";

function FormField({

    label,

    type = "text",

    name,

    value,

    onChange,

    placeholder,

    required = false

}) {

    return (

        <div className="form-field">

            <label className="form-label">

                {label}

                {

                    required &&

                    <span className="required">*</span>

                }

            </label>

            <Input

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

            />

        </div>

    );

}

export default FormField;