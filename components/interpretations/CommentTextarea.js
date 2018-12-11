import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import i18n from '@dhis2/d2-i18n';
import { Link, ActionSeparator } from './misc';
import styles from './styles/CommentTextarea.style';

export var CommentTextarea = function (_React$Component) {
    _inherits(CommentTextarea, _React$Component);

    function CommentTextarea() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CommentTextarea);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommentTextarea.__proto__ || _Object$getPrototypeOf(CommentTextarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CommentTextarea, [{
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
                classes = _props.classes,
                onCancel = _props.onCancel,
                isNewComment = _props.isNewComment;
            var d2 = this.context.d2;
            var text = this.state.text;

            var postText = isNewComment ? i18n.t('Post reply') : i18n.t('OK');

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MentionsWrapper,
                    { d2: d2, onUserSelect: this.onChange },
                    React.createElement('textarea', {
                        ref: this.setTextareaRef,
                        className: classes.commentArea,
                        value: text,
                        rows: 4,
                        autoFocus: true,
                        onChange: function onChange(event) {
                            return _this3.onChange(event.target.value);
                        }
                    })
                ),
                React.createElement(Link, { disabled: !text, label: postText, onClick: this.onPost }),
                onCancel && React.createElement(
                    'span',
                    null,
                    React.createElement(ActionSeparator, null),
                    React.createElement(Link, { label: i18n.t('Cancel'), onClick: onCancel })
                )
            );
        }
    }]);

    return CommentTextarea;
}(React.Component);

CommentTextarea.defaultProps = {
    isNewComment: false
};

CommentTextarea.contextTypes = {
    d2: PropTypes.object
};

CommentTextarea.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    isNewComment: PropTypes.bool
};

export default withStyles(styles)(CommentTextarea);