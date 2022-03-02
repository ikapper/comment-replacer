import logo from './logo.svg';
import './App.css';
import './Preference.css';

import { useState } from 'react';
import Preference from './Preference';
import { DEFAULT_REGEXES } from './Constants';

function App() {
  const [srcValue, setSrc] = useState("#some code here");
  const [resultValue, setResult] = useState("result here");
  const [isShowOption, setShowOption] = useState(false);
  const [regexes, setRegexes] = useState(DEFAULT_REGEXES);
  return (
    <div className="App">
      <div className="header">
        <h1>コメントアウトなどを削除するツール</h1>
      </div>
      <div className="nav">
        <button className='pref-btn' onClick={() => setShowOption(true)}>設定</button>
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
    </div>
  );
}

export default App;
