import React, { useState, useCallback, useEffect, useRef } from 'react';
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let char = "abcdefghijklmnopqrstuvwxyz";
    let specialChar = "!@#$%^&*()_+";
    if (numberAllowed) char += "0123456789";
    if (charAllowed) char += specialChar;
    for (let i = 0; i < length; i++) {
      let str = Math.floor(Math.random() * char.length);
      pass += char.charAt(str);
    }
    setPassword(pass);
  }, [numberAllowed, length, charAllowed]);

  const copyPassToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, numberAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div className="flex justify-center h-screen items-center px-5">
        <div className="max-w-3xl w-full mx-auto my-8 text-orange-200 py-8 rounded-2xl bg-slate-800">
          <div className="pb-6 px-4">
            <h2 className="text-3xl text-center font-semibold uppercase">Password Generator</h2>
          </div>
          <div className="mb-4 mx-6 py-3 rounded-2xl">
            <input
              type="text"
              className="py-2 px-3 rounded-s-2xl outline-0 w-3/4 text-slate-800"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-cyan-800 px-5 py-2 rounded-e-2xl"
              onClick={copyPassToClipBoard}
            >
              Copy
            </button>
          </div>
          <div className="mx-6 flex gap-x-4">
            <div className="flex gap-x-4">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label htmlFor="length">
                Length: {length}
              </label>
            </div>
            <div className="flex gap-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
              />
              <label htmlFor="character">
                Character
              </label>
            </div>
            <div className="flex gap-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
              />
              <label htmlFor="numbers">
                Number
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
