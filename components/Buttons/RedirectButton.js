import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import { getLink, itemTypeMap } from '../../api/redirect';
import styles from './styles/ActionButton.style';

export var RedirectButton = function (_Component) {
    _inherits(RedirectButton, _Component);

    function RedirectButton() {
        _classCallCheck(this, RedirectButton);

        return _possibleConstructorReturn(this, (RedirectButton.__proto__ || _Object$getPrototypeOf(RedirectButton)).apply(this, arguments));
    }

    _createClass(RedirectButton, [{
        key: 'render',
        value: function render() {
            return this.context.appName === 'dashboard' ? React.createElement(
                'a',
                {
                    href: getLink(this.context.item, this.context.d2),
                    className: this.props.classes.iconContainer,
                    title: i18n.t('View in ' + itemTypeMap[this.context.item.type].appName + ' app')
                },
                React.createElement(ActionButton, {
                    iconType: 'openApp',
                    tooltip: i18n.t('View in ' + itemTypeMap[this.context.item.type].appName + ' app')
                })
            ) : null;
        }
    }]);

    return RedirectButton;
}(Component);;

RedirectButton.contextTypes = {
    item: PropTypes.object,
    d2: PropTypes.object,
    appName: PropTypes.string
};

export default withStyles(styles)(RedirectButton);