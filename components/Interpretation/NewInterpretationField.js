import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { Editor as RichTextEditor, convertCtrlKey } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Toolbar from '../Toolbar/Toolbar';
import SharingInfo from '../SharingInfo/SharingInfo';
import InterpretationModel from '../../models/interpretation';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styles from './styles/NewInterpretationField.style';

export var NewInterpretationField = function (_Component) {
    _inherits(NewInterpretationField, _Component);

    function NewInterpretationField(props) {
        _classCallCheck(this, NewInterpretationField);

        var _this = _possibleConstructorReturn(this, (NewInterpretationField.__proto__ || _Object$getPrototypeOf(NewInterpretationField)).call(this, props));

        _this.updateSharingProps = function () {
            if (_this.props.interpretation) {
                _this.setState({
                    sharingProps: {
                        object: {
                            user: { id: _this.props.interpretation.user.id, name: _this.props.interpretation.user.displayName },
                            displayName: _this.props.model.displayName,
                            userAccesses: _this.props.interpretation.userAccesses,
                            userGroupAccesses: _this.props.interpretation.userGroupAccesses,
                            publicAccess: _this.props.interpretation.publicAccess,
                            externalAccess: _this.props.interpretation.externalAccess,
                            modelId: _this.props.model.id
                        },
                        meta: {
                            allowPublicAccess: _this.props.model.publicAccess.includes('r'),
                            allowExternalAccess: _this.props.model.externalAccess
                        }
                    }
                });
            } else {
                _this.setState({
                    sharingProps: {
                        object: {
                            user: { id: _this.props.model.user.id, name: _this.props.model.user.displayName },
                            displayName: _this.props.model.displayName,
                            userAccesses: _this.props.model.userAccesses,
                            userGroupAccesses: _this.props.model.userGroupAccesses,
                            publicAccess: _this.props.model.publicAccess,
                            externalAccess: _this.props.model.externalAccess,
                            modelId: _this.props.model.id
                        },
                        meta: {
                            allowPublicAccess: _this.props.model.publicAccess.includes('r'),
                            allowExternalAccess: _this.props.model.externalAccess
                        }
                    }
                });
            }
        };

        _this.onInputChange = function (event) {
            if (event.target) {
                _this.setState({ text: event.target.value });
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
            return _this.setState({ text: '' }, function () {
                return _this.textarea.current.focus();
            });
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
            return _this.postInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.setState({ text: '' }, _this.onBlur);
            });
        };

        _this.onUpdate = function () {
            _this.props.interpretation.text = _this.state.text;
            _this.props.interpretation.sharing = _this.state.sharingProps.object;

            _this.props.onUpdate(_this.props.interpretation);
        };

        _this.onOpenSharingDialog = function () {
            return _this.setState({ sharingDialogisOpen: true });
        };

        _this.onCloseSharingDialog = function (sharingProps) {
            var newSharingProps = _Object$assign({}, _this.state.sharingProps, { object: sharingProps });

            sharingProps ? _this.setState({ sharingDialogisOpen: false, sharingProps: newSharingProps }) : _this.setState({ sharingDialosIsOpen: false });
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
                            onClick: _this.props.interpretation ? _this.onUpdate : _this.onPost
                        },
                        i18n.t('Save interpretation')
                    ),
                    React.createElement(
                        Button,
                        {
                            className: _this.props.classes.cancelButton,
                            variant: 'outlined',
                            onClick: _this.props.onClose || _this.onClearInput
                        },
                        i18n.t('Cancel')
                    )
                );
            } else if (_this.props.interpretation) {
                return React.createElement(
                    Button,
                    {
                        className: _this.props.classes.cancelButton,
                        variant: 'outlined',
                        onClick: _this.props.onClose
                    },
                    i18n.t('Cancel')
                );
            }
        };

        _this.renderToolbar = function () {
            return (_this.state.text.length || _this.state.showToolbar) && React.createElement(Toolbar, { text: _this.state.text, onClick: _this.onToolbarClick, element: document.getElementById(_this.id) });
        };

        _this.renderSharingInfo = function () {
            return !!_this.state.text && React.createElement(SharingInfo, { interpretation: _this.state.sharingProps.object, onClick: _this.onOpenSharingDialog });
        };

        _this.renderSharingDialog = function () {
            return _this.state.sharingDialogisOpen && React.createElement(SharingDialog, {
                open: _this.state.sharingDialogisOpen,
                type: _this.props.type,
                d2: _this.context.d2,
                id: _this.props.interpretation ? _this.props.interpretation.id : _this.props.model.id,
                doNotPost: !_this.props.interpretation ? true : false,
                sharedObject: !_this.props.interpretation ? _this.state.sharingProps : null,
                onConfirm: _this.onCloseSharingDialog,
                onRequestClose: _this.onCloseSharingDialog
            });
        };

        _this.textarea = React.createRef();
        _this.id = Math.random().toString(36);
        _this.state = {
            text: _this.props.interpretation ? _this.props.interpretation.text : '',
            showToolbar: false,
            sharingDialogisOpen: false,
            sharingProps: {}
        };
        return _this;
    }

    _createClass(NewInterpretationField, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.interpretation && this.state.sharingProps.object && this.props.model.id !== this.state.sharingProps.object.modelId) {
                this.updateSharingProps();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateSharingProps();
        }
    }, {
        key: 'postInterpretation',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var newInterpretation;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                newInterpretation = new InterpretationModel(this.props.model, {});

                                newInterpretation.text = this.state.text;
                                newInterpretation.sharing = this.state.sharingProps.object;

                                return _context.abrupt('return', newInterpretation.save(this.context.d2));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function postInterpretation() {
                return _ref.apply(this, arguments);
            }

            return postInterpretation;
        }()
    }, {
        key: 'render',
        value: function render() {
            var ActionButtons = this.renderActionButtons();
            var Toolbar = this.renderToolbar();
            var Sharing = this.renderSharingInfo();
            var SharingDialog = this.renderSharingDialog();

            return React.createElement(
                WithAvatar,
                { className: this.props.classes.newInterpretation, firstName: this.context.d2.currentUser.firstName, surname: this.context.d2.currentUser.surname },
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
                                { className: this.props.classes.inputField, onFocus: this.onFocus },
                                Toolbar,
                                React.createElement('textarea', {
                                    className: this.props.classes.textArea,
                                    id: this.id,
                                    ref: this.textarea,
                                    value: this.state.text,
                                    placeholder: i18n.t('Write an interpretation'),
                                    rows: this.state.showToolbar || this.state.text.length ? 4 : 2,
                                    onChange: this.onInputChange,
                                    onKeyDown: this.onKeyDown
                                })
                            )
                        )
                    )
                ),
                Sharing,
                ActionButtons,
                SharingDialog
            );
        }
    }]);

    return NewInterpretationField;
}(Component);;

NewInterpretationField.contextTypes = {
    d2: PropTypes.object.isRequired
};

NewInterpretationField.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretation: PropTypes.object,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func,
    onClose: PropTypes.func
};

export default withStyles(styles)(NewInterpretationField);