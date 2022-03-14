/**
 * 依存性低めのユーティリティ
 */


/**
 * 改行ごとに区切り、それぞれのRegExpを作成して返す関数
 * @param {String} regexStrings 正規表現を表す文字列
 * @returns 2要素の配列。0番目にはRegExpの配列、1番目にはエラーの配列を格納している。
 */
export function getRegExpFrom(regexStrings) {
    const restrArray = regexStrings.split('\n');
    const errors = [];
    const regexes = [];
    for (const restr of restrArray) {
        if (restr === '') {
            //　空文字は無視する。
            continue;
        }
        try {
            const re = new RegExp(restr, 'mg');
            regexes.push(re);
        } catch (error) {
            errors.push(error);
        }
    }
    return [regexes, errors];
}

/**
 * RegExpから正規表現の文字列だけの配列を作る関数
 * @param {RegExp[]} regExpArray RegExpの配列
 * @returns 正規表現の文字列の配列
 */
export function getRegexStringsFrom(regExpArray) {
    const regexes = [];
    for (let i = 0; i < regExpArray.length; i++) {
        regexes.push(regExpArray[i].source);
    }
    return regexes;
}

const utils = {
    getRegExpFrom,
    getRegexStringsFrom,
};

export default utils;
