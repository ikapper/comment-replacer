// 正規表現の文字列はここで定義する。

export const SHARP_RE_STRINGS = [String.raw`^\s*#.*$`, String.raw`^[ \t]+(#.*$)`];
export const SLASH_RE_STRINGS = [String.raw`^\s*//.*$`, String.raw`^[ \t]+(//.*$)`];
export const MULTILINE_SLASH_ASTERISK_RE_STRINGS = [
    String.raw`(\/\*[\s\S]*?\*\/$)`,
];

export const DEFAULT_REGEXES = [
    new RegExp(SHARP_RE_STRINGS[0], "mg"),  // コメントのみの行にマッチ
    new RegExp(SHARP_RE_STRINGS[1], "mg"),  // 行末などに付与したコメントにマッチ
];

