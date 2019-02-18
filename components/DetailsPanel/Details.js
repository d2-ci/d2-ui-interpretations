import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
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
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';

import CollapsibleCard from '../Cards/CollapsibleCard';
import Description from './Description';
import Item from './Item';
import { getSharingText } from '../../sharing/sharingText';

import { setSubscription } from '../../api/helpers';
import { formatDate } from '../../dateformats/dateformatter';
import { translateModelName } from '../../translations/modelNametranslator';
import styles from './styles/Details.style';

export var Details = function (_React$Component) {
    _inherits(Details, _React$Component);

    function Details() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, Details);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Details.__proto__ || _Object$getPrototypeOf(Details)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isExpanded: true }, _this.toggleDetailsExpand = function () {
            _this.setState({ isExpanded: !_this.state.isExpanded });
        }, _this.toggleSubscription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var _this$props, model, onChange;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, model = _this$props.model, onChange = _this$props.onChange;
                            return _context.abrupt('return', setSubscription(_this.context.d2, model, !model.subscribed).then(onChange));

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Details, [{
        key: 'renderSubscriptionButton',
        value: function renderSubscriptionButton() {
            var tOpts = { object: translateModelName(this.props.model.modelName) };

            var _ref3 = this.props.model.subscribed ? [SubscriberIconEnabled, i18n.t('Unsubscribe from this {{object}} and stop receiving notifications', tOpts)] : [SubscriberIconDisabled, i18n.t('Subscribe to this {{object}} and start receiving notifications', tOpts)],
                _ref4 = _slicedToArray(_ref3, 2),
                SubscriberIcon = _ref4[0],
                subscriptionTooltip = _ref4[1];

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
            var _props = this.props,
                model = _props.model,
                classes = _props.classes;

            var owner = model.user ? model.user.displayName : '-';
            var SubscriptionButton = this.renderSubscriptionButton();

            return React.createElement(
                CollapsibleCard,
                { title: i18n.t('Chart details') },
                SubscriptionButton,
                React.createElement(
                    'div',
                    { className: classes.detailsCardList },
                    React.createElement(Item, { text: React.createElement(Description, { description: model.displayDescription }) }),
                    React.createElement(Item, { label: i18n.t('Owner'), text: owner }),
                    React.createElement(Item, {
                        label: i18n.t('Created'),
                        text: formatDate(model.created, this.context.locale)
                    }),
                    React.createElement(Item, {
                        label: i18n.t('Last updated'),
                        text: formatDate(model.lastUpdated, this.context.locale)
                    }),
                    React.createElement(Item, { label: i18n.t('Views'), text: model.favoriteViews }),
                    React.createElement(Item, { label: i18n.t('Sharing'), text: getSharingText(model) })
                )
            );
        }
    }]);

    return Details;
}(React.Component);;

Details.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired
};

Details.propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Details);