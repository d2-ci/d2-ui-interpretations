import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Likes from '../Interpretation/Likes';
import Replies from '../Interpretation/Replies';
import styles from './styles/CardInfo.style';

export var CardInfo = function CardInfo(_ref) {
    var classes = _ref.classes,
        likedBy = _ref.likedBy,
        repliedBy = _ref.repliedBy,
        createdDate = _ref.createdDate;
    return React.createElement(
        'div',
        { className: classes.cardInfo },
        React.createElement(
            'span',
            null,
            ' ',
            createdDate,
            ' '
        ),
        React.createElement(Likes, { likedBy: likedBy }),
        React.createElement(Replies, { repliedBy: repliedBy })
    );
};

CardInfo.defaultProps = {
    likedBy: [],
    repliedBy: []
};

CardInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    likedBy: PropTypes.array.isRequired,
    repliedBy: PropTypes.array.isRequired,
    createdDate: PropTypes.string.isRequired
};

export default withStyles(styles)(CardInfo);