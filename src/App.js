import './App.css';
import './Preference.css';

import { useState, useEffect } from 'react';
import clipboardJS from 'clipboard';
import Preference from './Preference';
import { DEFAULT_REGEXES } from './Constants';
import myutils from "./Utils";

const regexString = localStorage.getItem('regexes') ?? '';
const storedRegexes = myutils.getRegExpFrom(regexString)[0];
const regexesToUse = storedRegexes.length > 0 ? storedRegexes : DEFAULT_REGEXES;
const storedSubstitutionString = localStorage.getItem('substitution-string') ?? '';


function App() {
  const [srcValue, setSrc] = useState("#some code here");
  const [resultValue, setResult] = useState("result here");
  const [isShowOption, setShowOption] = useState(false);
  const [regexes, setRegexes] = useState(regexesToUse);
  const [substitutionString, setSubstitutionString] = useState(storedSubstitutionString);
  useEffect(() => {
    new clipboardJS('.copy-btn');
  }, []);
  return (
    <div className="App">
      <div className="header">
        <h1>コメントアウトなどを削除するツール</h1>
      </div>
      <div className="nav">
        <input className='replace-to' type='text' id='substitution-str' placeholder='置換する場合はここに置換先テキストを入力…'
          onChange={e => {
            setSubstitutionString(e.target.value);
          }}
          value={substitutionString}
        />
        <button className='btn' onClick={() => setShowOption(true)}>設定</button>
        <button className='btn copy-btn' data-clipboard-target="#result">結果をコピー</button>
        <Preference isShow={isShowOption} setShowOption={setShowOption}
          regexes={regexes} setRegexes={setRegexes}
        />
      </div>
      <div className="flex-container">
        <textarea id="source" onChange={e => {
          setSrc(e.target.value);
          let resultstr = e.target.value;
          for (const re of regexes) {
            resultstr = resultstr.replaceAll(re, substitutionString);
          }
          setResult(resultstr);
        }} value={srcValue}></textarea>
        <div className='right-arrow'>-&gt;</div>
        <textarea id="result" onChange={e => setResult(e.target.value)} value={resultValue}></textarea>
      </div>
      <div className='footer'>
        <p>This app uses <a href="https://create-react-app.dev/">Create React App</a> and <a href="https://clipboardjs.com/">clipboard.js</a></p>
      </div>
    </div>
  );
}

export default App;
