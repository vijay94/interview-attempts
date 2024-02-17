import { useState } from "react";

const Input = ({ defaultValue, onBlur }) => {
    const [value, setValue] = useState(defaultValue);

    const onValueChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <input className="input" type="text" value={value} onChange={onValueChange} onBlur={onBlur} />
    );
};

export default Input;