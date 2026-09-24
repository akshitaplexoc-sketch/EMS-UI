import "./Checkbox.css";

function Checkbox({
    id,
    name,
    checked,
    onChange,
    label
}) {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
            />

            <span>{label}</span>
        </label>
    );
}

export default Checkbox;