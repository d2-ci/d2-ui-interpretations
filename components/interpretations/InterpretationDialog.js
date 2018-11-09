import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash/fp';
import defer from 'lodash/fp/defer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';

var styles = {
    dialog: {
        width: 550
    }
};

var InterpretationDialog = function (_Component) {
    _inherits(InterpretationDialog, _Component);

    function InterpretationDialog() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InterpretationDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InterpretationDialog.__proto__ || _Object$getPrototypeOf(InterpretationDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: _this.props.interpretation.text,
            sharingDialogIsOpen: false,
            savedInterpretation: null
        }, _this.cancel = function () {
            _this.props.onClose();
        }, _this.onChange = function (event) {
            _this.setState({ value: event.target.value });
        }, _this.save = function () {
            return _this._saveInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.props.onClose();
            });
        }, _this.saveAndShare = function () {
            return _this._saveInterpretation().then(function (savedInterpretation) {
                _this.props.onSave(savedInterpretation);
                _this.setState({ savedInterpretation: savedInterpretation, sharingDialogIsOpen: true });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InterpretationDialog, [{
        key: '_saveInterpretation',
        value: function _saveInterpretation() {
            var _props = this.props,
                interpretation = _props.interpretation,
                onSave = _props.onSave;
            var value = this.state.value;

            interpretation.text = value;
            return interpretation.save();
        }
    }, {
        key: 'render',
        value: function render() {
            var d2 = this.context.d2;
            var _props2 = this.props,
                interpretation = _props2.interpretation,
                classes = _props2.classes;
            var _state = this.state,
                value = _state.value,
                sharingDialogIsOpen = _state.sharingDialogIsOpen,
                savedInterpretation = _state.savedInterpretation;

            var isActionEdit = !!interpretation.id;
            var title = isActionEdit ? i18n.t('Edit interpretation') : i18n.t('Create interpretation');
            var buttonProps = { color: 'primary', disabled: !value };

            if (sharingDialogIsOpen) {
                return React.createElement(SharingDialog, {
                    open: true,
                    onRequestClose: this.cancel,
                    d2: d2,
                    id: savedInterpretation.id,
                    type: 'interpretation'
                });
            } else {
                return React.createElement(
                    Dialog,
                    {
                        open: true,
                        onClose: this.cancel,
                        maxWidth: 'md',
                        classes: { paper: classes.dialog }
                    },
                    React.createElement(
                        DialogTitle,
                        null,
                        title
                    ),
                    React.createElement(
                        DialogContent,
                        null,
                        React.createElement(
                            MentionsWrapper,
                            { d2: d2, onUserSelect: this.onChange },
                            React.createElement(
                                FormControl,
                                { fullWidth: true },
                                React.createElement(TextField, {
                                    name: 'interpretation',
                                    value: value,
                                    margin: 'normal',
                                    multiline: true,
                                    rowsMax: 4,
                                    onChange: this.onChange
                                })
                            )
                        )
                    ),
                    React.createElement(
                        DialogActions,
                        null,
                        React.createElement(
                            Button,
                            { color: 'primary', onClick: this.cancel },
                            i18n.t('Cancel')
                        ),
                        !isActionEdit && React.createElement(
                            Button,
                            _extends({}, buttonProps, { onClick: this.saveAndShare }),
                            i18n.t('Save & share')
                        ),
                        React.createElement(
                            Button,
                            _extends({}, buttonProps, { onClick: this.save }),
                            i18n.t('Save')
                        )
                    )
                );
            }
        }
    }]);

    return InterpretationDialog;
}(Component);

InterpretationDialog.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

InterpretationDialog.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default withStyles(styles)(InterpretationDialog);