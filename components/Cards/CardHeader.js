import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/CardHeader.style';

export var CardHeader = function CardHeader(_ref) {
    var classes = _ref.classes,
        userName = _ref.userName;
    return React.createElement(
        'div',
        { className: classes.interpretationName },
        React.createElement(
            'span',
            { className: classes.userLink },
            userName
        )
    );
};

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired
};

export default withStyles(styles)(CardHeader);