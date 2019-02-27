import { markdownHandler, insertMarkdown } from './markdownHandler';
import { insertLinkWithSpace, insertLinkWithoutSpace, insertBoldWithSpace, insertBoldWithoutSpace, insertItalicWithSpace, insertItalicWithoutSpace, concatLinkWithSpace, concatLinkWithoutSpace, concatBoldWithSpace, concatBoldWithoutSpace, concatItalicWithSpace, concatItalicWithoutSpace, insertEmoticonWithSpace, insertEmoticonWithoutSpace } from './formats';

export var LINK = 'LINK';
export var BOLD = 'BOLD';
export var ITALIC = 'ITALIC';
export var EMOTICON = 'EMOTICON';

export var WITH_SPACE = true;
export var WITHOUT_SPACE = false;

export var getMarkdown = function getMarkdown(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    return currentInput.length ? markdownHandler(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) : insertHelper(TYPE, WITHOUT_SPACE, currentInput, cursorStart);
};

export var getEmoticon = function getEmoticon(emoticon, currentInput, cursorStart) {
    return currentInput.length ? insertMarkdown(EMOTICON, currentInput, cursorStart, emoticon) : insertHelper(EMOTICON, WITHOUT_SPACE, currentInput, cursorStart, emoticon);
};

export var insertHelper = function insertHelper(TYPE, WITH_SPACE, currentInput, cursorStart) {
    var emoticon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    switch (TYPE) {
        case LINK:
            return WITH_SPACE ? insertLinkWithSpace(currentInput, cursorStart) : insertLinkWithoutSpace(currentInput, cursorStart);
        case BOLD:
            return WITH_SPACE ? insertBoldWithSpace(currentInput, cursorStart) : insertBoldWithoutSpace(currentInput, cursorStart);
        case ITALIC:
            return WITH_SPACE ? insertItalicWithSpace(currentInput, cursorStart) : insertItalicWithoutSpace(currentInput, cursorStart);
        case EMOTICON:
            return WITH_SPACE ? insertEmoticonWithSpace(currentInput, cursorStart, emoticon) : insertEmoticonWithoutSpace(currentInput, cursorStart, emoticon);
        default:
            return {};
    };
};

export var concatHelper = function concatHelper(TYPE, WITH_SPACE, currentInput, highlightedText, cursorStart, cursorEnd) {
    switch (TYPE) {
        case LINK:
            return WITH_SPACE ? concatLinkWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) : concatLinkWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd);
        case BOLD:
            return WITH_SPACE ? concatBoldWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) : concatBoldWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd);
        case ITALIC:
            return WITH_SPACE ? concatItalicWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) : concatItalicWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd);
        default:
            return {};
    };
};