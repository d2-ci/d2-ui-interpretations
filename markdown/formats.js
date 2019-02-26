export var whitespace = ' ';
var link = 'http://';
var linkPlaceholder = '<link-title>';
var bold = '*';
var boldPlaceholder = 'bold text';
var italic = '_';
var italicPlaceholder = 'italic text';

export var TEXT_START_INDEX = 0;
var WHITESPACE_LENGTH = 1;
var BOLD_LENGTH = 1;
var BOLD_PLACEHOLDER_LENGTH = 9;
var ITALIC_LENGTH = 1;
var ITALIC_PLACEHOLDER_LENGTH = 11;
var EMOTICON_LENGTH = 3;
var LINK_LENGTH = 7;
var LINK_PLACEHOLDER_LENGTH = 19;

export var insertLinkWithSpace = function insertLinkWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(linkPlaceholder)),
        highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + LINK_PLACEHOLDER_LENGTH
    };
};

export var insertLinkWithoutSpace = function insertLinkWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(link.concat(linkPlaceholder)),
        highlightStart: cursorStart + LINK_LENGTH,
        highlightEnd: cursorStart + LINK_PLACEHOLDER_LENGTH
    };
};

export var concatLinkWithSpace = function concatLinkWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(highlightedText)),
        highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + LINK_LENGTH
    };
};

export var concatLinkWithoutSpace = function concatLinkWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(link.concat(highlightedText)),
        highlightStart: cursorStart + LINK_LENGTH,
        highlightEnd: cursorEnd + LINK_LENGTH
    };
};

export var insertBoldWithSpace = function insertBoldWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + boldPlaceholder + bold),
        highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH
    };
};

export var insertBoldWithoutSpace = function insertBoldWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(bold + boldPlaceholder + bold),
        highlightStart: cursorStart + BOLD_LENGTH,
        highlightEnd: cursorStart + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH
    };
};

export var concatBoldWithSpace = function concatBoldWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + highlightedText + bold),
        highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + BOLD_LENGTH
    };
};

export var concatBoldWithoutSpace = function concatBoldWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(bold + highlightedText + bold),
        highlightStart: cursorStart + BOLD_LENGTH,
        highlightEnd: cursorEnd + BOLD_LENGTH
    };
};

export var insertItalicWithSpace = function insertItalicWithSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + italicPlaceholder + italic),
        highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH
    };
};

export var insertItalicWithoutSpace = function insertItalicWithoutSpace(currentInput, cursorStart) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(italic + italicPlaceholder + italic),
        highlightStart: cursorStart + ITALIC_LENGTH,
        highlightEnd: cursorStart + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH
    };
};

export var concatItalicWithSpace = function concatItalicWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + highlightedText + italic),
        highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
        highlightEnd: cursorEnd + WHITESPACE_LENGTH + ITALIC_LENGTH
    };
};

export var concatItalicWithoutSpace = function concatItalicWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd) {
    return {
        text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(italic + highlightedText + italic),
        highlightStart: cursorStart + ITALIC_LENGTH,
        highlightEnd: cursorEnd + ITALIC_LENGTH
    };
};

export var insertEmoticonWithSpace = function insertEmoticonWithSpace(currentInput, cursorStart, emoticon) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + emoticon),
        highlightStart: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH,
        highlightEnd: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH
    };
};

export var insertEmoticonWithoutSpace = function insertEmoticonWithoutSpace(currentInput, cursorStart, emoticon) {
    return {
        text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(emoticon),
        highlightStart: cursorStart + EMOTICON_LENGTH,
        highlightEnd: cursorStart + EMOTICON_LENGTH
    };
};