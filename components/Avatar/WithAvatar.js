import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Avatar.style';

export var WithAvatar = function WithAvatar(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        onClick = _ref.onClick,
        firstName = _ref.firstName,
        surname = _ref.surname,
        children = _ref.children;
    return React.createElement(
        'div',
        { className: className, onClick: onClick },
        React.createElement(
            'div',
            { className: classes.avatarBox },
            React.createElement(UserAvatar, { firstName: firstName, surname: surname })
        ),
        React.createElement(
            'div',
            { className: classes.avatarBoxContent },
            children
        )
    );
};

WithAvatar.defaultProps = {
    onClick: function onClick() {
        return null;
    }
};

WithAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default withStyles(styles)(WithAvatar);