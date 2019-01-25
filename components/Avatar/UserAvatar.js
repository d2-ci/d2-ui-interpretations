import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

var UserAvatar = function UserAvatar(_ref) {
    var classes = _ref.classes,
        user = _ref.user;

    var nameToArr = user.displayName.split(" ");
    var initials = nameToArr[0].slice(0, 1).concat(nameToArr[nameToArr.length - 1].slice(0, 1));

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