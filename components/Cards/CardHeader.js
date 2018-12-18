import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { formatRelative } from '../../dateformats/dateformatter';
import styles from './styles/CardHeader.style';

export var CardHeader = function CardHeader(_ref) {
    var classes = _ref.classes,
        locale = _ref.locale,
        userName = _ref.userName,
        createdDate = _ref.createdDate;
    return React.createElement(
        'div',
        { className: classes.interpretationName },
        React.createElement(
            'span',
            { style: styles.userLink },
            userName
        ),
        React.createElement(
            'span',
            { className: classes.date },
            formatRelative(createdDate, locale)
        )
    );
};

CardHeader.contextTypes = {
    locale: PropTypes.string.isRequired
};

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired
};

export default withStyles(styles)(CardHeader);