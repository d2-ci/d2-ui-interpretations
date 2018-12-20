import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export var WithAvatar = function WithAvatar(_ref) {
    var style = _ref.style,
        classes = _ref.classes,
        user = _ref.user,
        children = _ref.children;
    return React.createElement(
        'div',
        { style: style || styles.avatarWrapper },
        React.createElement(
            'div',
            { className: classes.avatarBox },
            React.createElement(UserAvatar, { user: user })
        ),
        React.createElement(
            'div',
            { className: classes.avatarBoxContent },
            children
        )
    );
};

WithAvatar.propTypes = {
    style: PropTypes.object,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default withStyles(styles)(WithAvatar);