'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _misc = require('./misc');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _InterpretationsStyles = require('./InterpretationsStyles.js');

var _InterpretationsStyles2 = _interopRequireDefault(_InterpretationsStyles);

var _d2UiMentionsWrapper = require('@dhis2/d2-ui-mentions-wrapper');

var _d2UiMentionsWrapper2 = _interopRequireDefault(_d2UiMentionsWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentTextarea = function (_React$Component) {
    (0, _inherits3.default)(CommentTextarea, _React$Component);

    function CommentTextarea() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CommentTextarea);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CommentTextarea.__proto__ || (0, _getPrototypeOf2.default)(CommentTextarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            text: _this.props.comment.text || ''
        }, _this.focus = function () {
            var _this2 = _this,
                textarea = _this2.textarea;

            if (textarea) {
                textarea.focus();
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            }
        }, _this.setTextareaRef = function (textarea) {
            _this.textarea = textarea;
            _this.focus();
        }, _this.onChange = function (text) {
            _this.setState({ text: text });
        }, _this.onPost = function () {
            var newText = _this.state.text;
            if (newText && newText.trim()) {
                var newComment = _this.props.comment;
                newComment.text = newText;
                _this.props.onPost(newComment);
                _this.setState({ text: '' });
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CommentTextarea, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.comment !== newProps.comment) {
                this.setState({ text: newProps.comment.text }, this.focus);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                comment = _props.comment,
                onCancel = _props.onCancel;
            var d2 = this.context.d2;
            var text = this.state.text;

            var postText = onCancel ? _d2I18n2.default.t('OK') : _d2I18n2.default.t('Post comment');

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _d2UiMentionsWrapper2.default,
                    { d2: d2, onUserSelect: this.onChange },
                    _react2.default.createElement('textarea', {
                        ref: this.setTextareaRef,
                        style: _InterpretationsStyles2.default.commentArea,
                        value: text,
                        rows: 4,
                        autoFocus: true,
                        onChange: function onChange(event) {
                            return _this3.onChange(event.target.value);
                        }
                    })
                ),
                _react2.default.createElement(_misc.Link, { disabled: !text, label: postText, onClick: this.onPost }),
                onCancel && _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_misc.ActionSeparator, null),
                    _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Cancel'), onClick: onCancel })
                )
            );
        }
    }]);
    return CommentTextarea;
}(_react2.default.Component);

CommentTextarea.contextTypes = {
    d2: _propTypes2.default.object
};

CommentTextarea.propTypes = {
    comment: _propTypes2.default.object.isRequired,
    onPost: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func
};

exports.default = CommentTextarea;