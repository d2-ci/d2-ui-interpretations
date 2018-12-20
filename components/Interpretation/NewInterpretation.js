import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { Editor as RichTextEditor, Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Link from '../Link/Link';
import ActionSeparator from '../ActionSeparator/ActionSeparator';
import styles from './styles/NewInterpretation.style';

export var NewInterpretation = function (_Component) {
    _inherits(NewInterpretation, _Component);

    function NewInterpretation() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NewInterpretation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewInterpretation.__proto__ || _Object$getPrototypeOf(NewInterpretation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            text: _this.props.newInterpretation.text,
            sharingDialogIsOpen: false,
            savedInterpretation: null
        }, _this.onInputChange = function (event) {
            return _this.setState({ text: event.target.value });
        }, _this.onPost = function () {
            return _this.postInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.props.onClose();
            });
        }, _this.onPostAndShare = function () {
            return _this.postInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.setState({ savedInterpretation: savedInterpretation, sharingDialogIsOpen: true });
            });
        }, _this.onCancel = function () {
            return _this.props.onClose();
        }, _this.renderActionButtons = function () {
            return React.createElement(
                Fragment,
                null,
                React.createElement(Link, {
                    disabled: !_this.state.text,
                    label: _this.props.isNew ? i18n.t('Post') : i18n.t('OK'),
                    onClick: _this.onPost
                }),
                _this.props.isNew && React.createElement(
                    Fragment,
                    null,
                    React.createElement(ActionSeparator, null),
                    React.createElement(Link, {
                        disabled: !_this.state.text,
                        label: i18n.t('Post & Share'),
                        onClick: _this.onPostAndShare
                    })
                ),
                React.createElement(ActionSeparator, null),
                React.createElement(Link, { label: i18n.t('Cancel'), onClick: _this.onCancel })
            );
        }, _this.renderRichTextHints = function () {
            return _this.state.text && React.createElement(
                RichTextParser,
                { style: styles.richTextHint },
                '**' + i18n.t('bold') + '** __' + i18n.t('italics') + '__ http://<link>'
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NewInterpretation, [{
        key: 'postInterpretation',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.props.newInterpretation.text = this.state.text;
                                return _context.abrupt('return', this.props.newInterpretation.save(this.context.d2));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function postInterpretation() {
                return _ref2.apply(this, arguments);
            }

            return postInterpretation;
        }()
    }, {
        key: 'render',
        value: function render() {
            var ActionButtons = this.renderActionButtons();
            var EditorHints = this.renderRichTextHints();

            return this.state.sharingDialogIsOpen ? React.createElement(SharingDialog, {
                open: this.state.sharingDialogIsOpen,
                onRequestClose: this.onCancel,
                d2: this.context.d2,
                id: this.state.savedInterpretation.id,
                type: 'interpretation'
            }) : React.createElement(
                Fragment,
                null,
                React.createElement(
                    WithAvatar,
                    { style: styles.newInterpretationSection, user: this.context.d2.currentUser },
                    React.createElement(
                        MentionsWrapper,
                        { d2: this.context.d2, onUserSelect: this.onInputChange },
                        React.createElement(
                            RichTextEditor,
                            { onEdit: this.onInputChange },
                            React.createElement('textarea', {
                                className: this.props.classes.textArea,
                                value: this.state.text,
                                rows: 4,
                                autoFocus: true,
                                onChange: this.onInputChange
                            })
                        )
                    ),
                    ActionButtons,
                    EditorHints
                )
            );
        }
    }]);

    return NewInterpretation;
}(Component);;

NewInterpretation.contextTypes = {
    d2: PropTypes.object.isRequired
};

NewInterpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired
};

export default withStyles(styles)(NewInterpretation);