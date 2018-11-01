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

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ChevronLeft = require('@material-ui/icons/ChevronLeft');

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _Add = require('@material-ui/icons/Add');

var _Add2 = _interopRequireDefault(_Add);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _orderBy = require('lodash/fp/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _CollapsibleCard = require('../CollapsibleCard');

var _CollapsibleCard2 = _interopRequireDefault(_CollapsibleCard);

var _InterpretationDialog = require('./InterpretationDialog');

var _InterpretationDialog2 = _interopRequireDefault(_InterpretationDialog);

var _Interpretation = require('./Interpretation');

var _Interpretation2 = _interopRequireDefault(_Interpretation);

var _interpretation = require('../../models/interpretation');

var _interpretation2 = _interopRequireDefault(_interpretation);

var _InterpretationsStyles = require('./InterpretationsStyles.js');

var _InterpretationsStyles2 = _interopRequireDefault(_InterpretationsStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInterpretationsList = function getInterpretationsList(props) {
    var d2 = props.d2,
        model = props.model,
        interpretations = props.interpretations,
        setCurrentInterpretation = props.setCurrentInterpretation,
        onChange = props.onChange;

    var getUserUrl = function getUserUrl(user) {
        return baseurl + '/dhis-web-messaging/profile.action?id=' + user.id;
    };

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { style: { fontStyle: "italic", marginLeft: 15 } },
            interpretations.length === 0 && _react2.default.createElement(
                'span',
                null,
                _d2I18n2.default.t('No interpretations')
            )
        ),
        interpretations.map(function (interpretation) {
            return _react2.default.createElement(
                'div',
                {
                    key: interpretation.id,
                    style: _InterpretationsStyles2.default.interpretation,
                    className: 'interpretation-box',
                    onClick: function onClick() {
                        return setCurrentInterpretation(interpretation.id);
                    }
                },
                _react2.default.createElement(_Interpretation2.default, {
                    d2: d2,
                    model: model,
                    interpretation: interpretation,
                    onChange: onChange,
                    extended: false
                })
            );
        })
    );
};

var getInterpretationDetails = function getInterpretationDetails(props) {
    var d2 = props.d2,
        model = props.model,
        interpretation = props.interpretation,
        onChange = props.onChange;

    var comments = (0, _orderBy2.default)(["created"], ["desc"], interpretation.comments);

    return _react2.default.createElement(_Interpretation2.default, {
        d2: d2,
        model: model,
        interpretation: interpretation,
        onChange: onChange,
        extended: true
    });
};

var getInterpretationButtons = function getInterpretationButtons(props) {
    var d2 = props.d2,
        model = props.model,
        currentInterpretation = props.currentInterpretation,
        setCurrentInterpretation = props.setCurrentInterpretation,
        openNewInterpretationDialog = props.openNewInterpretationDialog;


    return currentInterpretation ? _react2.default.createElement(
        _IconButton2.default,
        {
            style: _InterpretationsStyles2.default.action,
            onClick: function onClick() {
                return setCurrentInterpretation(null);
            },
            title: _d2I18n2.default.t('Clear interpretation')
        },
        _react2.default.createElement(_ChevronLeft2.default, null)
    ) : _react2.default.createElement(
        _IconButton2.default,
        {
            style: _InterpretationsStyles2.default.action,
            onClick: openNewInterpretationDialog,
            title: _d2I18n2.default.t('Write new interpretation')
        },
        _react2.default.createElement(_Add2.default, null)
    );
};

var InterpretationsCard = function (_React$Component) {
    (0, _inherits3.default)(InterpretationsCard, _React$Component);

    function InterpretationsCard(props) {
        (0, _classCallCheck3.default)(this, InterpretationsCard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InterpretationsCard.__proto__ || (0, _getPrototypeOf2.default)(InterpretationsCard)).call(this, props));

        _this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.openNewInterpretationDialog = _this.openNewInterpretationDialog.bind(_this);
        _this.closeInterpretationDialog = _this.closeInterpretationDialog.bind(_this);
        _this.setCurrentInterpretation = _this.setCurrentInterpretation.bind(_this);
        _this.isControlledComponent = !!props.onCurrentInterpretationChange;
        return _this;
    }

    (0, _createClass3.default)(InterpretationsCard, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.isControlledComponent) {
                this.setState({ currentInterpretationId: nextProps.currentInterpretationId });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var currentInterpretation = this.getCurrentInterpretation();
            if (currentInterpretation && this.props.onCurrentInterpretationChange) {
                this.props.onCurrentInterpretationChange(currentInterpretation);
            }
            if (this.props.currentInterpretationId == "new") {
                this.openNewInterpretationDialog();
            }
        }
    }, {
        key: 'notifyChange',
        value: function notifyChange(interpretation) {
            this.props.onChange();
        }
    }, {
        key: 'openNewInterpretationDialog',
        value: function openNewInterpretationDialog() {
            var newInterpretation = new _interpretation2.default(this.props.model, {});
            this.setState({ interpretationToEdit: newInterpretation });
        }
    }, {
        key: 'closeInterpretationDialog',
        value: function closeInterpretationDialog() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: 'setCurrentInterpretation',
        value: function setCurrentInterpretation(interpretationId) {
            var _props = this.props,
                model = _props.model,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;


            if (this.isControlledComponent) {
                var currentInterpretation = interpretationId ? model.interpretations.find(function (interpretation) {
                    return interpretation.id === interpretationId;
                }) : null;
                onCurrentInterpretationChange(currentInterpretation);
            } else {
                this.setState({ currentInterpretationId: interpretationId });
            }
        }
    }, {
        key: 'getCurrentInterpretation',
        value: function getCurrentInterpretation() {
            var model = this.props.model;
            var currentInterpretationId = this.state.currentInterpretationId;

            return model && model.interpretations && currentInterpretationId ? model.interpretations.find(function (interpretation) {
                return interpretation.id === currentInterpretationId;
            }) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var model = this.props.model;
            var interpretationToEdit = this.state.interpretationToEdit;
            var d2 = this.context.d2;

            var sortedInterpretations = (0, _orderBy2.default)(["created"], ["desc"], model.interpretations);
            var currentInterpretation = this.getCurrentInterpretation();
            var actions = getInterpretationButtons({
                d2: d2,
                model: model,
                currentInterpretation: currentInterpretation,
                setCurrentInterpretation: this.setCurrentInterpretation,
                openNewInterpretationDialog: this.openNewInterpretationDialog
            });

            return _react2.default.createElement(
                _CollapsibleCard2.default,
                {
                    title: _d2I18n2.default.t('Interpretations'),
                    actions: actions
                },
                interpretationToEdit && _react2.default.createElement(_InterpretationDialog2.default, {
                    model: model,
                    interpretation: interpretationToEdit,
                    onSave: this.notifyChange,
                    onClose: this.closeInterpretationDialog
                }),
                currentInterpretation ? getInterpretationDetails({
                    d2: d2,
                    model: model,
                    interpretation: currentInterpretation,
                    onChange: this.notifyChange
                }) : getInterpretationsList({
                    d2: d2,
                    model: model,
                    interpretations: sortedInterpretations,
                    setCurrentInterpretation: this.setCurrentInterpretation,
                    onChange: this.notifyChange
                })
            );
        }
    }]);
    return InterpretationsCard;
}(_react2.default.Component);

InterpretationsCard.propTypes = {
    model: _propTypes2.default.object.isRequired,
    currentInterpretationId: _propTypes2.default.string,
    onChange: _propTypes2.default.func.isRequired,
    onCurrentInterpretationChange: _propTypes2.default.func
};

InterpretationsCard.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = InterpretationsCard;