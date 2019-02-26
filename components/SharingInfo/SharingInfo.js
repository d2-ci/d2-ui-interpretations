import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Share from '@material-ui/icons/Share';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import Link from '../Link/Link';
import styles from './styles/SharingInfo.style';

export var SharingInfo = function (_Component) {
    _inherits(SharingInfo, _Component);

    function SharingInfo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SharingInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SharingInfo.__proto__ || _Object$getPrototypeOf(SharingInfo)).call.apply(_ref, [this].concat(args))), _this), _this.getUsers = function () {
            return (_this.props.interpretation.userAccesses || []).map(function (item) {
                return item.displayName;
            });
        }, _this.getGroups = function () {
            return (_this.props.interpretation.userGroupAccesses || []).map(function (item) {
                return item.displayName;
            });
        }, _this.checkExternalAccess = function () {
            return _this.props.interpretation.externalAccess ? i18n.t('external access') : '';
        }, _this.checkPublicAccess = function () {
            return _this.props.interpretation.publicAccess === 'rw------' || _this.props.interpretation.publicAccess === 'r-------';
        }, _this.concatSharingInfo = function () {
            var displayNames = _this.getUsers().concat(_this.getGroups()).join(', ');

            if (_this.props.interpretation.externalAccess) {
                displayNames = displayNames.concat(i18n.t('external access'));
            };

            if (_this.checkPublicAccess()) {
                displayNames = displayNames.concat(displayNames.length ? i18n.t(', public access') : i18n.t('public access'));
            };

            if (displayNames.length) {
                displayNames = displayNames.replace(/, ([^,]*)$/, ' and $1').concat('. ');
            } else {
                displayNames = i18n.t('None. ');
            }

            return displayNames;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SharingInfo, [{
        key: 'render',
        value: function render() {
            var Info = this.concatSharingInfo();

            return React.createElement(
                'div',
                { className: this.props.classes.sharingContainer },
                React.createElement(Share, { className: this.props.classes.sharingIcon }),
                React.createElement(
                    'span',
                    { className: this.props.classes.label },
                    i18n.t('Shared with: '),
                    Info,
                    React.createElement(Link, {
                        onClick: this.props.onClick,
                        label: i18n.t('Manage sharing')
                    })
                )
            );
        }
    }]);

    return SharingInfo;
}(Component);;

export default withStyles(styles)(SharingInfo);

SharingInfo.defaultProps = {
    interpretation: {
        userAccesses: [],
        userGroupAccesses: [],
        externalAccess: false,
        publicAccess: 'rw------'
    }
};

SharingInfo.propTypes = {
    interpretation: PropTypes.object
};