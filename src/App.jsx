import "./styles.css";
import { useState, useCallback, useEffect } from "react";

export default function App() {
  //let [length, setLength] = useState(6);
  const [length, setLength] = useState(8);
  const [alphaNumeric, setAlphaNumeric] = useState(false);
  const [char, setChar] = useState(false);
  const [passwordstate, setpassword] = useState("");

  const passwordGerenerator = useCallback(() => {
    //we use useCallback to store the function in cache so that we can use it in the useEffect
    //by useCallback we can memoize the function
    // this helps to prevent unnecessary re-renders (many function calls)

    let pass = "ABCDEGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (alphaNumeric) {
      pass += "0123456789";
    }
    if (char) {
      pass += "!@#$%^&*()";
    }
    let password = "";
    for (let i = 0; i < length; i++) {
      password += pass.charAt(Math.floor(Math.random() * pass.length));
    }
    setpassword(password);
  }, [alphaNumeric, char, length, setpassword]);

  useEffect(() => {
    //use Effect is used to change the state when a event occurs
    // here the function is called when the state is changed for (length, char, alphaNumeric,passwordGerenerator)
    passwordGerenerator();
  }, [length, char, alphaNumeric, passwordGerenerator]);

  return (
    <div className="App">
      <h1>Password generator</h1>

      <div>
        <input
          id="input"
          type="text"
          placeholder="Password"
          readOnly
          value={passwordstate}
        />
        <button className="btn">Copy</button>
      </div>

      <div className="slider">
        <input
          type="range"
          name="Number"
          id="inputNo"
          min={8}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="inputNo">Length {length} </label>
      </div>

      <div className="slider">
        <label htmlFor="Number"> Number</label>
        <input
          type="checkbox"
          name="Number"
          id="Number"
          defaultChecked={alphaNumeric}
          onChange={() => setAlphaNumeric(!alphaNumeric)}
        />
        <label htmlFor="Characters">Characters</label>
        <input
          type="checkbox"
          name="Characters"
          id="Characters"
          defaultChecked={char}
          onChange={() => setChar(!char)}
        />
      </div>
    </div>
  );
}
