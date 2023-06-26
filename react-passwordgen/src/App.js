import { useEffect, useState } from 'react';
import './App.css';

import Checkbox from './components/Checkbox';

function App() {

  useEffect(()=>{
    console.log('rendering')
  },[])
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false)

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {

    const isAllFieldsFalse = Object.values(passwordGen).slice(1).every(value => value === false);

    if(isAllFieldsFalse){
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);

      return;
    }

    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = ( length, uppercase, lowercase, numbers, symbols) => {
      const availableCharacters = [
        ...(numbers ? numbersArray : []),
        ...(lowercase ? lowerCaseLetters : []),
        ...(symbols ? symbolsArray : []),
        ...(uppercase ? upperCaseLetters : []),
      ];

      // const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const shuffleArray = (array) => {

        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      
      const characters = shuffleArray(availableCharacters).slice(0, length);
      console.log(availableCharacters)
      setHandelText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className="wrapper">
      <div className="container wrapper-box" style={{borderRadius:'20px'}}>
        <div className='' style={{display:'flex', justifyContent:'center',color:'white'}}><h2>Password Generator</h2></div>
        <div className="password-box">
          <input
            type="text"
            value={handelText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandelText(e.target.value)}
            style={{borderRadius:'20px'}}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>
        </div>
        <br />
        <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
              style={{borderRadius:'20px',padding:'5px'}}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include uppercase letters</label>
          </div>
          <div className={error ? 'borderError' : 'noError'}>
            <Checkbox
              value={passwordGen.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include lowercase letters</label>
          </div>
          <div className={error ? 'borderError' : 'noError'}>
            <Checkbox
              value={passwordGen.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div className={error ? 'borderError' : 'noError'}>
            <Checkbox
              value={passwordGen.numbers}
              onChange={handleChangeNumbers}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div className={error ? 'borderError' : 'noError'}>
            <Checkbox
              value={passwordGen.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
