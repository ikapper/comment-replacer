import { useState } from 'react';
import './Preference.css';
import { SHARP_RE_STRINGS, SLASH_RE_STRINGS, MULTILINE_SLASH_ASTERISK_RE_STRINGS } from './Constants';

// 正規表現を編集できるようにする。
function Preference(props) {
    // 現状の正規表現を改行文字を挟みつつ連結
    const regexes = [];
    for (let i = 0; i < props.regexes.length; i++) {
        regexes.push(props.regexes[i].source);
    }
    const [regexStrings, setRegexStrings] = useState(regexes.join('\n'));
    const [reCompileErrors, setErrors] = useState([]);
    const errorlist = [];
    for (let i = 0; i < reCompileErrors.length; i++) {
        const aError = reCompileErrors[i];
        errorlist.push((
            <div key={i}>
                {aError.name}: {aError.message}
            </div>
        ));
    }
    let errorMsg = null;
    if (errorlist.length > 0) {
        errorMsg = <div className='error-pop'>{errorlist}</div>;
    }

    return (
        <div className={props.isShow ? "pref visible" : "pref hide"}>
            <h3>使用する正規表現の編集</h3>
            <div className='pref-note'>1行につき1つ指定します。/で挟む必要はありません。現状mgオプションを勝手に付与します。</div>
            <div className='preset-container'>
                <button className='btn preset' onClick={() => setRegexStrings(p => {
                    const newv = [p];
                    return newv.concat(SHARP_RE_STRINGS).join('\n');
                })}>#...</button>
                <button className='btn preset' onClick={() => setRegexStrings(p => {
                    const newv = [p];
                    return newv.concat(SLASH_RE_STRINGS).join('\n');
                })}>{"//..."}</button>
                <button className='btn preset' onClick={() => setRegexStrings(p => {
                    const newv = [p];
                    return newv.concat(MULTILINE_SLASH_ASTERISK_RE_STRINGS).join('\n');
                })}>{"/*...*/"}</button>
            </div>
            <textarea className='re-editor' onChange={(e) => setRegexStrings(e.target.value)} value={regexStrings} />
            {/* この辺りにerrorsの表示。テキストエリアの右下あたりにスクロール可能な感じで表示したい */}
            {errorMsg}
            <div className='pref-btn-group'>
                <button className='btn primary' onClick={e => {
                    // 改行で分割して、Appの方をsetする。
                    const restrArray = regexStrings.split('\n');
                    const errors = [];
                    const regexes = [];
                    for (const restr of restrArray) {
                        try {
                            const re = new RegExp(restr, 'mg');
                            regexes.push(re);
                        } catch (error) {
                            errors.push(error);
                        }
                    }
                    // errorsがあれば、stateとしてセット。なければそれまでのerrorsのstateをクリアして、regexpを渡して閉じる。
                    if (errors.length > 0) {
                        setErrors(errors);
                    } else {
                        setErrors([]);
                        props.setRegexes(regexes);
                        props.setShowOption(false);
                    }
                }}>保存</button>
                <button className='btn dangerous' onClick={e => {
                    // 現状の正規表現から上書きし直す。
                    const regexes = [];
                    for (let i = 0; i < props.regexes.length; i++) {
                        regexes.push(props.regexes[i].source);
                    }
                    setRegexStrings(regexes.join('\n'));
                    setErrors([]);
                    props.setShowOption(false);
                }}>変更を破棄</button>
            </div>
        </div>
    );
}


export default Preference;;