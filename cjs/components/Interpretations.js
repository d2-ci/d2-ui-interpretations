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

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _isEqual = require('lodash/fp/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _pick = require('lodash/fp/pick');

var _pick2 = _interopRequireDefault(_pick);

var _helpers = require('../models/helpers');

var _DetailsCard = require('./details/DetailsCard');

var _DetailsCard2 = _interopRequireDefault(_DetailsCard);

var _InterpretationsCard = require('./interpretations/InterpretationsCard');

var _InterpretationsCard2 = _interopRequireDefault(_InterpretationsCard);

var _locales = require('../locales');

var _locales2 = _interopRequireDefault(_locales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configI18n(d2) {
    var locale = d2.currentUser.userSettings.settings.keyUiLocale;
    _locales2.default.changeLanguage(locale);
}

var Interpretations = function (_React$Component) {
    (0, _inherits3.default)(Interpretations, _React$Component);

    function Interpretations(props) {
        (0, _classCallCheck3.default)(this, Interpretations);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Interpretations.__proto__ || (0, _getPrototypeOf2.default)(Interpretations)).call(this, props));

        _this.state = { model: null };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Interpretations, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            configI18n(this.props.d2);
            this.loadModel(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var fields = ["type", "id", "lastUpdated"];
            var modelFieldsChanged = !(0, _isEqual2.default)((0, _pick2.default)(fields, this.props), (0, _pick2.default)(fields, nextProps));
            if (modelFieldsChanged) {
                this.loadModel(nextProps);
            }
        }
    }, {
        key: 'getLocale',
        value: function getLocale(d2) {
            return d2.currentUser.userSettings.settings.keyUiLocale || "en";
        }
    }, {
        key: 'loadModel',
        value: function loadModel(props) {
            var _this2 = this;

            return (0, _helpers.getFavoriteWithInterpretations)(props.d2, props.type, props.id).then(function (model) {
                _this2.setState({ model: model });
                return model;
            });
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            var _this3 = this;

            return this.loadModel(this.props).then(function (newModel) {
                return _this3.props.onChange && _this3.props.onChange(newModel);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                d2 = _props.d2,
                currentInterpretationId = _props.currentInterpretationId,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;
            var model = this.state.model;

            var locale = this.getLocale(d2);

            if (!model) return _react2.default.createElement(_CircularProgress2.default, null);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_DetailsCard2.default, {
                    model: model,
                    onChange: this.onChange
                }),
                _react2.default.createElement(_InterpretationsCard2.default, {
                    model: model,
                    onChange: this.onChange,
                    currentInterpretationId: currentInterpretationId,
                    onCurrentInterpretationChange: onCurrentInterpretationChange
                })
            );
        }
    }]);
    return Interpretations;
}(_react2.default.Component);

Interpretations.propTypes = {
    d2: _propTypes2.default.object.isRequired,
    type: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.string.isRequired,
    lastUpdated: _propTypes2.default.string,
    currentInterpretationId: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    onCurrentInterpretationChange: _propTypes2.default.func
};

Interpretations.childContextTypes = {
    d2: _propTypes2.default.object
};

exports.default = Interpretations;