import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/ShowMoreButton.style';

export var ShowMoreButton = function ShowMoreButton(_ref) {
    var classes = _ref.classes,
        showButton = _ref.showButton,
        hiddenCommentsCount = _ref.hiddenCommentsCount,
        onClick = _ref.onClick;
    return showButton && React.createElement(
        'div',
        { className: classes.showMoreCommentSection },
        React.createElement(
            Button,
            { onClick: onClick, className: classes.showMoreCommentButton },
            React.createElement(
                'span',
                { className: classes.showMoreComments },
                hiddenCommentsCount,
                ' ',
                i18n.t("more comments")
            )
        )
    );
};

ShowMoreButton.propTypes = {
    classes: PropTypes.object.isRequired,
    hiddenCommentsCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowMoreButton);