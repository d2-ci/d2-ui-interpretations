import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SubscriberIconEnabled from '@material-ui/icons/Notifications';
import SubscriberIconDisabled from '@material-ui/icons/AddAlert';
import i18n from '@dhis2/d2-i18n';

import CollapsibleCard from '../CollapsibleCard';
import styles from './DetailsCardStyles.js';
import { setSubscription } from '../../models/helpers';
import { formatDate, translateModelName } from '../../util/i18n';

var List = function List(_ref) {
    var children = _ref.children;
    return React.createElement(
        'div',
        { style: styles.detailsCardList },
        children
    );
};

var ListItem = function ListItem(_ref2) {
    var label = _ref2.label,
        text = _ref2.text,
        button = _ref2.button;
    return React.createElement(
        'div',
        { style: styles.detailsCardItem },
        label && React.createElement(
            'label',
            { style: { fontWeight: 'bold', marginRight: 5 } },
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
        return React.createElement(
            'i',
            null,
            i18n.t('No description')
        );
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

var accessMapping = {
    '--------': i18n.t('None'),
    'r-------': i18n.t('Read'),
    'rw------': i18n.t('Read/Write')
};

var getSharingText = function getSharingText(model) {
    var publicAccessValue = accessMapping[model.publicAccess] || i18n.t('Unknown');
    var publicAccess = i18n.t('Public') + ': ' + publicAccessValue;

    var userGroupsCount = (model.userGroupAccesses || []).length;
    var userGroupsInfo = userGroupsCount > 2 ? userGroupsCount + ' ' + i18n.t('user groups') : (model.userGroupAccesses || []).map(function (userGroup) {
        return userGroup.displayName;
    }).join(', ');

    return publicAccess + (userGroupsInfo ? ' + ' + userGroupsInfo : '');
};

var DetailsCard = function (_React$Component) {
    _inherits(DetailsCard, _React$Component);

    function DetailsCard() {
        var _ref3;

        var _temp, _this, _ret;

        _classCallCheck(this, DetailsCard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = DetailsCard.__proto__ || _Object$getPrototypeOf(DetailsCard)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
            isExpanded: true
        }, _this.toggleDetailsExpand = function () {
            _this.setState({ isExpanded: !_this.state.isExpanded });
        }, _this.toggleSubscription = function () {
            var _this$props = _this.props,
                model = _this$props.model,
                onChange = _this$props.onChange;

            return setSubscription(model, !model.subscribed).then(onChange);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DetailsCard, [{
        key: 'renderSubscriptionButton',
        value: function renderSubscriptionButton(model) {
            var tOpts = { object: translateModelName(model.modelName) };

            var _ref4 = model.subscribed ? [SubscriberIconEnabled, i18n.t('Unsubscribe from this {{object}} and stop receiving notifications', tOpts)] : [SubscriberIconDisabled, i18n.t('Subscribe to this {{object}} and start receiving notifications', tOpts)],
                _ref5 = _slicedToArray(_ref4, 2),
                SubscriberIcon = _ref5[0],
                subscriptionTooltip = _ref5[1];

            return React.createElement(
                IconButton,
                {
                    style: styles.subscriberIcon,
                    title: subscriptionTooltip,
                    onClick: this.toggleSubscription
                },
                React.createElement(SubscriberIcon, null)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var model = this.props.model;

            var owner = model.user ? model.user.displayName : '-';

            return React.createElement(
                CollapsibleCard,
                { title: i18n.t('Details') },
                this.renderSubscriptionButton(model),
                React.createElement(
                    List,
                    null,
                    React.createElement(ListItem, { text: getDescription(model) }),
                    React.createElement(ListItem, { label: i18n.t('Owner'), text: owner }),
                    React.createElement(ListItem, { label: i18n.t('Created'), text: formatDate(model.created) }),
                    React.createElement(ListItem, { label: i18n.t('Last updated'), text: formatDate(model.lastUpdated) }),
                    React.createElement(ListItem, { label: i18n.t('Views'), text: model.favoriteViews }),
                    React.createElement(ListItem, { label: i18n.t('Sharing'), text: getSharingText(model) })
                )
            );
        }
    }]);

    return DetailsCard;
}(React.Component);

DetailsCard.propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DetailsCard;