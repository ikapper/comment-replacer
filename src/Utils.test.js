import utils from "./Utils";


test('str to RegExp', () => {
    const regstr = String.raw`[f|F]oobar
newline
a\nb`;
    const [res, err] = utils.getRegExpFrom(regstr);
    expect(res.length).toBe(3);
    expect(err.length).toBe(0);
    expect(res[0].source).toStrictEqual('[f|F]oobar');
    expect(res[1].source).toStrictEqual('newline');
    expect(res[2]).toStrictEqual(new RegExp(/a\nb/mg));
});

test('RegExp to str', () => {
    const regexes = [new RegExp(/^\s*#.*$/), new RegExp(/^[ \t]+(#.*$)/)];
    const regstrs = utils.getRegexStringsFrom(regexes);
    expect(regstrs.length).toBe(2);
    expect(regstrs[0]).toBe(String.raw`^\s*#.*$`);
    expect(regstrs[1]).toBe(String.raw`^[ \t]+(#.*$)`);
});

test('empty str to RegExp', () => {
    const [res, err] = utils.getRegExpFrom('');
    // どちらの配列も空であるべき
    expect(res.length).toBe(0);
    expect(err.length).toBe(0);
});


test('invalid str to RegExp', () => {
    // バックスラッシュをエスケープして1文字だけ渡している
    const [res, err] = utils.getRegExpFrom('\\');
    expect(res.length).toBe(0);
    expect(err.length).toBe(1);
});

test('str to RegExp to str', () => {
    const regstr = String.raw`[f|F]oobar
newline
a\nb`;
    const [res, err] = utils.getRegExpFrom(regstr);
    expect(err.length).toBe(0);
    const actual = utils.getRegexStringsFrom(res).join('\n');
    expect(actual).toStrictEqual(regstr);
});

test('RegExp to str to RegExp', () => {
    const regexes = [new RegExp(/^\s*#.*$/), new RegExp(/^[ \t]+(#.*$)/)];
    const regstrs = utils.getRegexStringsFrom(regexes);
    expect(regstrs.length).toBe(2);
    const [res, err] = utils.getRegExpFrom(regstrs.join('\n'));
    expect(err.length).toBe(0);
    expect(res.length).toBe(2);
    expect(res[0]).toStrictEqual(new RegExp(/^\s*#.*$/mg));
    expect(res[1]).toStrictEqual(new RegExp(/^[ \t]+(#.*$)/mg));
});