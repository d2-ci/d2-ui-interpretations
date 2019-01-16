import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import { Editor as RichTextEditor, convertCtrlKey } from '@dhis2/d2-ui-rich-text';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Toolbar from '../Toolbar/Toolbar';
import styles from './styles/NewCommentField.style';

export var NewCommentField = function (_React$Component) {
    _inherits(NewCommentField, _React$Component);

    function NewCommentField(props) {
        _classCallCheck(this, NewCommentField);

        var _this = _possibleConstructorReturn(this, (NewCommentField.__proto__ || _Object$getPrototypeOf(NewCommentField)).call(this, props));

        _this.onInputChange = function (event) {
            if (event.target) {
                _this.setState({ text: event.target.value }, _this.onFocus);
            }
        };

        _this.setNativeInputVal = function (val) {
            var node = _this.textarea.current;
            node.value = val;
        };

        _this.onKeyDown = function (event) {
            convertCtrlKey(event, _this.setNativeInputVal);
            _this.setState({ text: _this.textarea.current.value });
        };

        _this.onClearInput = function () {
            return _this.setState({ text: '' }, _this.onBlur);
        };

        _this.onFocus = function () {
            return _this.setState({ showToolbar: true });
        };

        _this.onBlur = function () {
            return !_this.state.text.length && _this.setState({ showToolbar: false });
        };

        _this.onToolbarClick = function (text, highlightStart, highlightEnd) {
            return _this.setState({ text: text }, function () {
                return _this.focus(highlightStart, highlightEnd);
            });
        };

        _this.onPost = function () {
            var newText = _this.state.text;

            if (newText && newText.trim()) {
                var newComment = _this.props.comment;
                newComment.text = newText;

                _this.props.onPost(newComment);
                _this.setState({ text: '' }, _this.onBlur);
            }
        };

        _this.focus = function (highlightStart, highlightEnd) {
            _this.textarea.current.focus();
            _this.textarea.current.setSelectionRange(highlightStart, highlightEnd);
        };

        _this.renderActionButtons = function () {
            if (_this.state.text.length) {
                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        Button,
                        {
                            className: _this.props.classes.saveButton,
                            color: 'primary',
                            variant: 'contained',
                            onClick: _this.onPost
                        },
                        i18n.t('Save reply')
                    ),
                    React.createElement(
                        Button,
                        {
                            className: _this.props.classes.cancelButton,
                            variant: 'outlined',
                            onClick: _this.props.onCancel || _this.onClearInput
                        },
                        i18n.t('Cancel')
                    )
                );
            } else if (_this.props.comment && _this.props.comment.id) {
                return React.createElement(
                    Button,
                    {
                        className: _this.props.classes.cancelButton,
                        variant: 'outlined',
                        onClick: _this.props.onCancel
                    },
                    i18n.t('Cancel')
                );
            }
        };

        _this.renderToolbar = function () {
            return (_this.state.text.length || _this.state.showToolbar) && React.createElement(Toolbar, { text: _this.state.text, onClick: _this.onToolbarClick, element: document.getElementById(_this.id) });
        };

        _this.textarea = React.createRef();
        _this.id = Math.random().toString(36);
        _this.state = {
            text: _this.props.comment ? _this.props.comment.text : '',
            sharingDialogIsOpen: false,
            showToolbar: false
        };
        return _this;
    }

    _createClass(NewCommentField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this2 = this;

            if (this.props.comment !== newProps.comment) {
                this.setState({ text: newProps.comment.text }, function () {
                    return _this2.textarea.current.focus();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var ActionButtons = this.renderActionButtons();
            var Toolbar = this.renderToolbar();

            return React.createElement(
                WithAvatar,
                { className: this.props.classes.newReply, user: this.context.d2.currentUser },
                React.createElement(
                    MentionsWrapper,
                    { d2: this.context.d2, onUserSelect: this.onInputChange },
                    React.createElement(
                        RichTextEditor,
                        { onEdit: this.onInputChange },
                        React.createElement(
                            ClickAwayListener,
                            { mouseEvent: 'onClick', onClickAway: this.onBlur },
                            React.createElement(
                                'div',
                                { onClick: this.onFocus, className: this.props.classes.inputField, onFocus: this.onFocus },
                                Toolbar,
                                React.createElement('textarea', {
                                    className: this.props.classes.commentArea,
                                    id: this.id,
                                    ref: this.textarea,
                                    placeholder: i18n.t('Write a reply'),
                                    value: this.state.text,
                                    rows: this.state.showToolbar ? 4 : 2,
                                    autoFocus: true,
                                    onChange: this.onInputChange,
                                    onKeyDown: this.onKeyDown
                                })
                            )
                        )
                    )
                ),
                ActionButtons
            );
        }
    }]);

    return NewCommentField;
}(React.Component);;

NewCommentField.contextTypes = {
    d2: PropTypes.object
};

NewCommentField.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};

export default withStyles(styles)(NewCommentField);