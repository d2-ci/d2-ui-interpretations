'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RedirectButton = exports.getAppName = undefined;

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

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _styles = require('@material-ui/core/styles');

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _redirect = require('../../api/redirect');

var _ActionButton3 = require('./styles/ActionButton.style');

var _ActionButton4 = _interopRequireDefault(_ActionButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAppName = exports.getAppName = function getAppName(type) {
    var appNameMap = {
        REPORT_TABLE: _d2I18n2.default.t('Pivot Tables'),
        CHART: _d2I18n2.default.t('Visualizer'),
        MAP: _d2I18n2.default.t('Maps'),
        EVENT_REPORT: _d2I18n2.default.t('Event Reports'),
        EVENT_CHART: _d2I18n2.default.t('Event Visualizer'),
        VISUALIZATION: _d2I18n2.default.t('Visualizer')
    };

    return appNameMap[type];
};

var RedirectButton = exports.RedirectButton = function (_Component) {
    (0, _inherits3.default)(RedirectButton, _Component);

    function RedirectButton() {
        (0, _classCallCheck3.default)(this, RedirectButton);
        return (0, _possibleConstructorReturn3.default)(this, (RedirectButton.__proto__ || (0, _getPrototypeOf2.default)(RedirectButton)).apply(this, arguments));
    }

    (0, _createClass3.default)(RedirectButton, [{
        key: 'render',
        value: function render() {
            var _context = this.context,
                d2 = _context.d2,
                appName = _context.appName,
                item = _context.item;
            var _props = this.props,
                interpretationId = _props.interpretationId,
                classes = _props.classes;


            return appName === 'dashboard' ? _react2.default.createElement(
                'a',
                {
                    href: (0, _redirect.getLink)(item, d2, interpretationId),
                    className: classes.iconContainer,
                    title: _d2I18n2.default.t('View in {{appName}} app', { appName: getAppName(item.type) })
                },
                _react2.default.createElement(_ActionButton2.default, {
                    iconType: 'openApp',
                    tooltip: _d2I18n2.default.t('View in {{appName}} app', { appName: getAppName(item.type) })
                })
            ) : null;
        }
    }]);
    return RedirectButton;
}(_react.Component);

;

RedirectButton.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    interpretationId: _propTypes2.default.string.isRequired
};

RedirectButton.contextTypes = {
    item: _propTypes2.default.object,
    d2: _propTypes2.default.object,
    appName: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(_ActionButton4.default)(RedirectButton);