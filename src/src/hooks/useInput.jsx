import { useState } from "react";
import "./input.css";

function useInput(type, placeholder = "", minLength=0) {
  const [value, setValue] = useState("");
  const input = (
    <div className="input-wrapper">
      <input
        className="input"
        type={type}
        onChange={(e) => setValue(e.target.value)}
        placeholder=""
        data-placeholder={placeholder}
        value={value}
        minLength={minLength}
        required
      />
      <span className="placeholder">{placeholder}</span>
    </div>
  );
  return { value, input, setValue };
}

export default useInput;
