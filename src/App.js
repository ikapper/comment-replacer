import './App.css';
import './Preference.css';

import { useState, useEffect } from 'react';
import clipboardJS from 'clipboard';
import Preference from './Preference';
import { DEFAULT_REGEXES } from './Constants';
import myutils from "./Utils";

// TODO: localStorageからブラウザで保存されている正規表現の復元を図る。復元時はDEFAULT_REGEXESを使わないようにする。
const regexString = localStorage.getItem('regexes') ?? '';
const storedRegexes = myutils.getRegExpFrom(regexString)[0];
const regexesToUse = storedRegexes.length > 0 ? storedRegexes : DEFAULT_REGEXES;


function App() {
  const [srcValue, setSrc] = useState("#some code here");
  const [resultValue, setResult] = useState("result here");
  const [isShowOption, setShowOption] = useState(false);
  const [regexes, setRegexes] = useState(regexesToUse);
  useEffect(() => {
    new clipboardJS('.copy-btn');
  }, []);
  return (
    <div className="App">
      <div className="header">
        <h1>コメントアウトなどを削除するツール</h1>
      </div>
      <div className="nav">
        <button className='btn' onClick={() => setShowOption(true)}>設定</button>
        <button className='btn copy-btn' data-clipboard-target="#result">結果をコピー</button>
        <Preference isShow={isShowOption} setShowOption={setShowOption}
          regexes={regexes} setRegexes={setRegexes} />
      </div>
      <div className="flex-container">
        <textarea id="source" onChange={e => {
          setSrc(e.target.value);
          let resultstr = e.target.value;
          for (const re of regexes) {
            resultstr = resultstr.replaceAll(re, '');
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
