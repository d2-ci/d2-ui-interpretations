import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import { Editor as RichTextEditor, Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import Link from '../Link/Link';
import ActionSeparator from '../ActionSeparator/ActionSeparator';
import styles from './styles/CommentText.style';

export var NewComment = function (_React$Component) {
    _inherits(NewComment, _React$Component);

    function NewComment() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NewComment);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewComment.__proto__ || _Object$getPrototypeOf(NewComment)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
        }, _this.renderActionButtons = function () {
            return React.createElement(
                Fragment,
                null,
                React.createElement(Link, {
                    disabled: !_this.state.text,
                    label: _this.props.isEditing ? i18n.t('OK') : i18n.t('Post reply'),
                    onClick: _this.onPost
                }),
                React.createElement(ActionSeparator, null),
                React.createElement(Link, { label: i18n.t('Cancel'), onClick: _this.props.onCancel })
            );
        }, _this.renderRichTextHints = function () {
            return React.createElement(
                RichTextParser,
                { style: styles.richTextHint },
                i18n.t('**bold**    __italics__    http://<link>')
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NewComment, [{
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

            var ActionButtons = this.renderActionButtons();
            var EditorHints = this.renderRichTextHints();

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MentionsWrapper,
                    { d2: this.context.d2, onUserSelect: this.onChange },
                    React.createElement(
                        RichTextEditor,
                        { onEdit: this.onInputChange },
                        React.createElement('textarea', {
                            ref: this.setTextareaRef,
                            className: this.props.classes.commentArea,
                            value: this.state.text,
                            rows: 4,
                            autoFocus: true,
                            onChange: function onChange(event) {
                                return _this3.onChange(event.target.value);
                            }
                        })
                    )
                ),
                ActionButtons,
                EditorHints
            );
        }
    }]);

    return NewComment;
}(React.Component);

NewComment.defaultProps = {
    isEditing: false
};

NewComment.contextTypes = {
    d2: PropTypes.object
};

NewComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditing: PropTypes.bool
};

export default withStyles(styles)(NewComment);