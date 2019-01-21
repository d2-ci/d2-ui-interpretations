import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

var UserAvatar = function UserAvatar(_ref) {
    var classes = _ref.classes,
        user = _ref.user;

    var initials = user.displayName.split(" ").map(function (part) {
        return part[0];
    }).slice(0, 2).join("");

    return React.createElement(
        Avatar,
        { color: 'black', className: classes.avatar },
        initials
    );
};

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAvatar);