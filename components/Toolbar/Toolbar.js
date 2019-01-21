import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import InsertLink from '@material-ui/icons/InsertLink';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import { LINK, BOLD, ITALIC, getMarkdown, getEmoticon } from '../../markdown/helper';
import styles from './styles/Toolbar.style';

var smileyFace = ':-)';
var sadFace = ':-(';
var thumbsUp = ':+1';
var thumbsDown = ':-1';

export var Toolbar = function (_Component) {
    _inherits(Toolbar, _Component);

    function Toolbar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Toolbar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || _Object$getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { displayEmoticons: null }, _this.onDisplayEmoticons = function (event) {
            return _this.setState({ displayEmoticons: event.currentTarget });
        }, _this.onCloseEmoticons = function () {
            return _this.setState({ displayEmoticons: null });
        }, _this.onInsertLink = function () {
            return _this.getMarkdown(LINK);
        }, _this.onBoldClick = function () {
            return _this.getMarkdown(BOLD);
        }, _this.onItalicClick = function () {
            return _this.getMarkdown(ITALIC);
        }, _this.onEmoticonClick = function (type) {
            var currentInput = _this.props.text;
            var cursorStart = _this.props.element.selectionStart;
            var newText = getEmoticon(type, currentInput, cursorStart);

            _this.props.onClick(newText.text, newText.highlightStart, newText.highlightEnd);
            _this.onCloseEmoticons();
        }, _this.getMarkdown = function (type) {
            var currentInput = _this.props.text;
            var highlightedText = window.getSelection().toString();
            var cursorStart = _this.props.element.selectionStart;
            var cursorEnd = _this.props.element.selectionEnd;
            var markdown = getMarkdown(type, currentInput, highlightedText, cursorStart, cursorEnd);

            _this.props.onClick(markdown.text, markdown.highlightStart, markdown.highlightEnd);
        }, _this.renderEmoticons = function () {
            return _this.state.displayEmoticons && React.createElement(
                Menu,
                {
                    anchorEl: _this.state.displayEmoticons,
                    open: Boolean(_this.state.displayEmoticons),
                    onClose: _this.onCloseEmoticons,
                    placement: 'top',
                    disableAutoFocusItem: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'center' },
                    MenuListProps: { style: styles.menu }
                },
                React.createElement(
                    MenuItem,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(smileyFace);
                        } },
                    React.createElement(
                        RichTextParser,
                        { style: styles.emoticon },
                        smileyFace
                    )
                ),
                React.createElement(
                    MenuItem,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(sadFace);
                        } },
                    React.createElement(
                        RichTextParser,
                        { style: styles.emoticon },
                        sadFace
                    )
                ),
                React.createElement(
                    MenuItem,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(thumbsUp);
                        } },
                    React.createElement(
                        RichTextParser,
                        { style: styles.emoticon },
                        thumbsUp
                    )
                ),
                React.createElement(
                    MenuItem,
                    { onClick: function onClick() {
                            return _this.onEmoticonClick(thumbsDown);
                        } },
                    React.createElement(
                        RichTextParser,
                        { style: styles.emoticon },
                        thumbsDown
                    )
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Toolbar, [{
        key: 'render',
        value: function render() {
            var Emoticons = this.renderEmoticons();

            return React.createElement(
                'div',
                { className: this.props.classes.toolbarContainer },
                React.createElement(
                    IconButton,
                    { onClick: this.onInsertLink },
                    React.createElement(InsertLink, null)
                ),
                React.createElement(
                    IconButton,
                    { onClick: this.onBoldClick },
                    React.createElement(FormatBold, null)
                ),
                React.createElement(
                    IconButton,
                    { onClick: this.onItalicClick },
                    React.createElement(FormatItalic, null)
                ),
                React.createElement(
                    IconButton,
                    { onClick: this.onDisplayEmoticons },
                    React.createElement(InsertEmoticon, null)
                ),
                Emoticons
            );
        }
    }]);

    return Toolbar;
}(Component);;

export default withStyles(styles)(Toolbar);

Toolbar.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};