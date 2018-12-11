import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import styles from './styles/misc.style';

export var getUserLink = function getUserLink(d2, user) {
    return (
        // Currently there is no public page for users (DHIS2-691), just use a <span> for now
        React.createElement(
            'span',
            { style: styles.userLink, className: 'author' },
            user.displayName
        )
    );
};

var Link = function Link(_ref) {
    var label = _ref.label,
        value = _ref.value,
        _onClick = _ref.onClick,
        otherProps = _objectWithoutProperties(_ref, ['label', 'value', 'onClick']);

    return React.createElement(
        'a',
        _extends({
            style: styles.interpretationLink,
            onClick: function onClick() {
                return _onClick(value);
            }
        }, otherProps),
        label
    );
};

export { Link };
export var ActionSeparator = function ActionSeparator(_ref2) {
    var _ref2$labelText = _ref2.labelText,
        labelText = _ref2$labelText === undefined ? "·" : _ref2$labelText;
    return React.createElement(
        'label',
        { style: styles.linkArea },
        labelText
    );
};

var UserAvatar = function UserAvatar(_ref3) {
    var user = _ref3.user;

    var initials = user.displayName.split(" ").map(function (part) {
        return part[0];
    }).slice(0, 2).join("");
    return React.createElement(
        Avatar,
        { color: 'black', style: styles.avatar },
        initials
    );
};

export var WithAvatar = function WithAvatar(_ref4) {
    var style = _ref4.style,
        user = _ref4.user,
        children = _ref4.children;
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

export var Icons = {
    visibility: React.createElement(Visibility, { style: styles.interpretationCommentIcon }),
    visibilityOff: React.createElement(VisibilityOff, { style: styles.interpretationCommentIcon }),
    like: React.createElement(ThumbUpIcon, { style: _extends({}, styles.interpretationCommentIcon, styles.likedInterpretationIcon) }),
    unlike: React.createElement(ThumbUpIcon, { style: styles.interpretationCommentIcon }),
    reply: React.createElement(Reply, { style: styles.interpretationCommentIcon }),
    edit: React.createElement(Create, { style: styles.interpretationCommentIcon }),
    share: React.createElement(Share, { style: styles.interpretationCommentIcon }),
    delete: React.createElement(Delete, { style: styles.interpretationCommentIcon })
};