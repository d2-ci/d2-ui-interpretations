'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _fp = require('lodash/fp');

var _defer = require('lodash/fp/defer');

var _defer2 = _interopRequireDefault(_defer);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _styles = require('@material-ui/core/styles');

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiSharingDialog = require('@dhis2/d2-ui-sharing-dialog');

var _d2UiSharingDialog2 = _interopRequireDefault(_d2UiSharingDialog);

var _d2UiMentionsWrapper = require('@dhis2/d2-ui-mentions-wrapper');

var _d2UiMentionsWrapper2 = _interopRequireDefault(_d2UiMentionsWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    dialog: {
        width: 550
    }
};

var InterpretationDialog = function (_Component) {
    (0, _inherits3.default)(InterpretationDialog, _Component);

    function InterpretationDialog() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, InterpretationDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InterpretationDialog.__proto__ || (0, _getPrototypeOf2.default)(InterpretationDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(InterpretationDialog, [{
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
            var title = isActionEdit ? _d2I18n2.default.t('Edit interpretation') : _d2I18n2.default.t('Create interpretation');
            var buttonProps = { color: 'primary', disabled: !value };

            if (sharingDialogIsOpen) {
                return _react2.default.createElement(_d2UiSharingDialog2.default, {
                    open: true,
                    onRequestClose: this.cancel,
                    d2: d2,
                    id: savedInterpretation.id,
                    type: 'interpretation'
                });
            } else {
                return _react2.default.createElement(
                    _Dialog2.default,
                    {
                        open: true,
                        onClose: this.cancel,
                        maxWidth: 'md',
                        classes: { paper: classes.dialog }
                    },
                    _react2.default.createElement(
                        _DialogTitle2.default,
                        null,
                        title
                    ),
                    _react2.default.createElement(
                        _DialogContent2.default,
                        null,
                        _react2.default.createElement(
                            _d2UiMentionsWrapper2.default,
                            { d2: d2, onUserSelect: this.onChange },
                            _react2.default.createElement(
                                _FormControl2.default,
                                { fullWidth: true },
                                _react2.default.createElement(_TextField2.default, {
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
                    _react2.default.createElement(
                        _DialogActions2.default,
                        null,
                        _react2.default.createElement(
                            _Button2.default,
                            { color: 'primary', onClick: this.cancel },
                            _d2I18n2.default.t('Cancel')
                        ),
                        !isActionEdit && _react2.default.createElement(
                            _Button2.default,
                            (0, _extends3.default)({}, buttonProps, { onClick: this.saveAndShare }),
                            _d2I18n2.default.t('Save & share')
                        ),
                        _react2.default.createElement(
                            _Button2.default,
                            (0, _extends3.default)({}, buttonProps, { onClick: this.save }),
                            _d2I18n2.default.t('Save')
                        )
                    )
                );
            }
        }
    }]);
    return InterpretationDialog;
}(_react.Component);

InterpretationDialog.propTypes = {
    interpretation: _propTypes2.default.object.isRequired,
    onSave: _propTypes2.default.func.isRequired,
    onClose: _propTypes2.default.func.isRequired
};

InterpretationDialog.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(InterpretationDialog);