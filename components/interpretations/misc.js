import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './InterpretationsStyles.js';

export var getUserLink = function getUserLink(d2, user) {
    // Currently there is no public page for users (DHIS2-691), just use a <span> for now
    return React.createElement(
        'span',
        { style: styles.userLink, className: 'author' },
        user.displayName
    );
};

var Link = function Link(props) {
    var label = props.label,
        value = props.value,
        _onClick = props.onClick,
        otherProps = _objectWithoutProperties(props, ['label', 'value', 'onClick']);

    return React.createElement(
        'a',
        _extends({
            style: styles.interpretationLink,
            onClick: function onClick(ev) {
                return _onClick(value);
            }
        }, otherProps),
        label
    );
};

export { Link };
export var ActionSeparator = function ActionSeparator(_ref) {
    var _ref$labelText = _ref.labelText,
        labelText = _ref$labelText === undefined ? "·" : _ref$labelText;
    return React.createElement(
        'label',
        { style: styles.linkArea },
        labelText
    );
};

var UserAvatar = function UserAvatar(_ref2) {
    var user = _ref2.user;

    var initials = user.displayName.split(" ").map(function (part) {
        return part[0];
    }).slice(0, 2).join("");
    return React.createElement(
        Avatar,
        { color: 'black', style: styles.avatar },
        initials
    );
};

export var WithAvatar = function WithAvatar(_ref3) {
    var user = _ref3.user,
        children = _ref3.children;
    return React.createElement(
        'div',
        { style: styles.avatarWrapper },
        React.createElement(
            'div',
            { style: styles.avatarBox },
            React.createElement(UserAvatar, { user: user })
        ),
        React.createElement(
            'div',
            { style: styles.avatarBoxContent },
            children
        )
    );
};