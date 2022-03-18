import './App.css';
import './Preference.css';

import { useState, useEffect, useReducer } from 'react';
import clipboardJS from 'clipboard';
import Preference from './Preference';
import { DEFAULT_REGEXES } from './Constants';
import myutils from "./Utils";

const regexString = localStorage.getItem('regexes') ?? '';
const storedRegexes = myutils.getRegExpFrom(regexString)[0];
const regexesToUse = storedRegexes.length > 0 ? storedRegexes : DEFAULT_REGEXES;
const storedSubstitutionString = localStorage.getItem('substitution-string') ?? '';

const initialEditorState = {
  src: "#some code here\nprint('HELLO WORLD')",
  result: 'result here',
  regexes: regexesToUse,
  substitutionString: storedSubstitutionString
};

function editorReducer(state, action) {
  const updateResult = (src, regexes, substitutionString) => {
    let resultstr = src;
    for (const re of regexes) {
      resultstr = resultstr.replaceAll(re, substitutionString);
    }
    return resultstr;
  };
  switch (action.type) {
    case 'changeSrc':
      return {
        ...state,
        src: action.src,
        result: updateResult(action.src, state.regexes, state.substitutionString),
      };
    case 'changeRegexes':
      return {
        ...state,
        regexes: action.regexes,
        result: updateResult(state.src, action.regexes, state.substitutionString),
      };
    case 'changeSubstitutionString':
      return {
        ...state,
        substitutionString: action.substitutionString,
        result: updateResult(state.src, state.regexes, action.substitutionString),
      };
    case 'changeResult':
      return {
        ...state,
        result: action.result,
      };
    // 同時に複数変える場合はさらに実装する。
    default:
      throw new Error('undefined action type assigned');
  }
}

function App() {
  const [editor, dispatchEditor] = useReducer(editorReducer, initialEditorState);
  const [isShowOption, setShowOption] = useState(false);
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
          onChange={e => dispatchEditor({ type: 'changeSubstitutionString', substitutionString: e.target.value })}
          value={editor.substitutionString}
        />
        <button className='btn' onClick={() => setShowOption(true)}>設定</button>
        <button className='btn copy-btn' data-clipboard-target="#result">結果をコピー</button>
        <Preference isShow={isShowOption} setShowOption={setShowOption}
          regexes={editor.regexes} setRegexes={(regexes) => dispatchEditor({ type: 'changeRegexes', regexes })}
        />
      </div>
      <div className="flex-container">
        <textarea id="source"
          onChange={e => dispatchEditor({ type: 'changeSrc', src: e.target.value })}
          value={editor.src}></textarea>
        <div className='right-arrow'>-&gt;</div>
        <textarea id="result"
          onChange={e => dispatchEditor({ type: 'changeResult', result: e.target.value })}
          value={editor.result}></textarea>
      </div>
      <div className='footer'>
        <p>This app uses <a href="https://create-react-app.dev/">Create React App</a> and <a href="https://clipboardjs.com/">clipboard.js</a></p>
      </div>
    </div>
  );
}

export default App;
