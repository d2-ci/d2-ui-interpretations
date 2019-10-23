'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Notifications = require('@material-ui/icons/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _AddAlert = require('@material-ui/icons/AddAlert');

var _AddAlert2 = _interopRequireDefault(_AddAlert);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _CollapsibleCard = require('../CollapsibleCard');

var _CollapsibleCard2 = _interopRequireDefault(_CollapsibleCard);

var _DetailsCardStyles = require('./DetailsCardStyles.js');

var _DetailsCardStyles2 = _interopRequireDefault(_DetailsCardStyles);

var _helpers = require('../../models/helpers');

var _i18n = require('../../util/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { style: _DetailsCardStyles2.default.detailsCardList },
        children
    );
};

var ListItem = function ListItem(_ref2) {
    var label = _ref2.label,
        text = _ref2.text,
        button = _ref2.button;
    return _react2.default.createElement(
        'div',
        { style: _DetailsCardStyles2.default.detailsCardItem },
        label && _react2.default.createElement(
            'label',
            { style: { fontWeight: "bold", marginRight: 5 } },
            label,
            ':'
        ),
        text,
        button
    );
};

var descriptionMaxLength = 250;

var getDescription = function getDescription(model) {
    var description = model.displayDescription;


    if (!description) {
        return _react2.default.createElement(
            'i',
            null,
            _d2I18n2.default.t('No description')
        );
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

var accessMapping = {
    "--------": _d2I18n2.default.t("None"),
    "r-------": _d2I18n2.default.t("Read"),
    "rw------": _d2I18n2.default.t("Read/Write")
};

var getSharingText = function getSharingText(model) {
    var publicAccessValue = accessMapping[model.publicAccess] || _d2I18n2.default.t("Unknown");
    var publicAccess = _d2I18n2.default.t('Public') + ": " + publicAccessValue;

    var userGroupsCount = (model.userGroupAccesses || []).length;
    var userGroupsInfo = userGroupsCount > 2 ? userGroupsCount + ' ' + _d2I18n2.default.t('user groups') : (model.userGroupAccesses || []).map(function (userGroup) {
        return userGroup.displayName;
    }).join(", ");

    return publicAccess + (userGroupsInfo ? ' + ' + userGroupsInfo : "");
};

var DetailsCard = function (_React$Component) {
    (0, _inherits3.default)(DetailsCard, _React$Component);

    function DetailsCard() {
        var _ref3;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DetailsCard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = DetailsCard.__proto__ || (0, _getPrototypeOf2.default)(DetailsCard)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
            isExpanded: true
        }, _this.toggleDetailsExpand = function () {
            _this.setState({ isExpanded: !_this.state.isExpanded });
        }, _this.toggleSubscription = function () {
            var _this$props = _this.props,
                model = _this$props.model,
                onChange = _this$props.onChange;

            return (0, _helpers.setSubscription)(model, !model.subscribed).then(onChange);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DetailsCard, [{
        key: 'renderSubscriptionButton',
        value: function renderSubscriptionButton(model) {
            var tOpts = { object: (0, _i18n.translateModelName)(model.modelName) };

            var _ref4 = model.subscribed ? [_Notifications2.default, _d2I18n2.default.t("Unsubscribe from this {{object}} and stop receiving notifications", tOpts)] : [_AddAlert2.default, _d2I18n2.default.t("Subscribe to this {{object}} and start receiving notifications", tOpts)],
                _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
                SubscriberIcon = _ref5[0],
                subscriptionTooltip = _ref5[1];

            return _react2.default.createElement(
                _IconButton2.default,
                {
                    style: _DetailsCardStyles2.default.subscriberIcon,
                    title: subscriptionTooltip,
                    onClick: this.toggleSubscription
                },
                _react2.default.createElement(SubscriberIcon, null)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var model = this.props.model;

            var owner = model.user ? model.user.displayName : '-';

            return _react2.default.createElement(
                _CollapsibleCard2.default,
                { title: _d2I18n2.default.t('Details') },
                this.renderSubscriptionButton(model),
                _react2.default.createElement(
                    List,
                    null,
                    _react2.default.createElement(ListItem, { text: getDescription(model) }),
                    _react2.default.createElement(ListItem, { label: _d2I18n2.default.t('Owner'), text: owner }),
                    _react2.default.createElement(ListItem, { label: _d2I18n2.default.t('Created'), text: (0, _i18n.formatDate)(model.created) }),
                    _react2.default.createElement(ListItem, { label: _d2I18n2.default.t('Last updated'), text: (0, _i18n.formatDate)(model.lastUpdated) }),
                    _react2.default.createElement(ListItem, { label: _d2I18n2.default.t('Views'), text: model.favoriteViews }),
                    _react2.default.createElement(ListItem, { label: _d2I18n2.default.t('Sharing'), text: getSharingText(model) })
                )
            );
        }
    }]);
    return DetailsCard;
}(_react2.default.Component);

DetailsCard.propTypes = {
    model: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired
};

exports.default = DetailsCard;