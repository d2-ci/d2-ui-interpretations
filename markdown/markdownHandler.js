import { whitespace, TEXT_START_INDEX } from './formats';
import { WITH_SPACE, WITHOUT_SPACE, insertHelper, concatHelper } from './helper';

export var markdownHandler = function markdownHandler(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    return highlightedText.length ? markHighlighted(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) : insertMarkdown(TYPE, currentInput, cursorStart);
};

var markHighlighted = function markHighlighted(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    var formatted = void 0;

    var previousChar = currentInput.substring(cursorStart - 1, cursorStart);
    var nextChar = currentInput.substring(cursorEnd, cursorEnd + 1);

    cursorStart !== TEXT_START_INDEX && previousChar !== whitespace ? formatted = concatHelper(TYPE, WITH_SPACE, currentInput, highlightedText, cursorStart, cursorEnd) : formatted = concatHelper(TYPE, WITHOUT_SPACE, currentInput, highlightedText, cursorStart, cursorEnd);

    cursorEnd !== currentInput.length && nextChar !== whitespace ? formatted.text += whitespace + currentInput.substring(cursorEnd, currentInput.length) : formatted.text += currentInput.substring(cursorEnd, currentInput.length);

    return {
        text: formatted.text,
        highlightStart: formatted.highlightStart,
        highlightEnd: formatted.highlightEnd
    };
};

export var insertMarkdown = function insertMarkdown(TYPE, currentInput, cursorStart) {
    var emoticon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var formatted = void 0;

    var previousChar = currentInput.substring(cursorStart - 1, cursorStart);
    var nextChar = currentInput.substring(cursorStart + 1, cursorStart);

    cursorStart !== TEXT_START_INDEX && previousChar !== whitespace ? formatted = insertHelper(TYPE, WITH_SPACE, currentInput, cursorStart, emoticon) : formatted = insertHelper(TYPE, WITHOUT_SPACE, currentInput, cursorStart, emoticon);

    cursorStart !== currentInput.length && nextChar !== whitespace ? formatted.text += whitespace + currentInput.substring(cursorStart, currentInput.length) : formatted.text += currentInput.substring(cursorStart, currentInput.length);

    return {
        text: formatted.text,
        highlightStart: formatted.highlightStart,
        highlightEnd: formatted.highlightEnd
    };
};