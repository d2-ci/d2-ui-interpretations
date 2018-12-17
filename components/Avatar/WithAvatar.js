import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles/WithAvatar.style';

var UserAvatar = function UserAvatar(_ref) {
    var user = _ref.user;

    var initials = user.displayName.split(" ").map(function (part) {
        return part[0];
    }).slice(0, 2).join("");
    return React.createElement(
        Avatar,
        { color: 'black', style: styles.avatar },
        initials
    );
};

export var WithAvatar = function WithAvatar(_ref2) {
    var style = _ref2.style,
        user = _ref2.user,
        children = _ref2.children;
    return React.createElement(
        'div',
        { style: style || styles.avatarWrapper },
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

export default WithAvatar;