import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import RedirectButton from './RedirectButton';
import styles from './styles/ActionButtonContainer.style';

var UNLIKE_INDEX = 0;
var LIKE_INDEX = 1;
var VIEW_INDEX = 2;
var EXIT_VIEW_INDEX = 3;
var SHARE_INDEX = 4;
var EDIT_INDEX = 5;
var DELETE_INDEX = 6;
var REPLY_INDEX = 7;

export var ActionButtonContainer = function ActionButtonContainer(_ref) {
    var classes = _ref.classes,
        isFocused = _ref.isFocused,
        currentUserLikesInterpretation = _ref.currentUserLikesInterpretation,
        canReply = _ref.canReply,
        canManage = _ref.canManage,
        onClickHandlers = _ref.onClickHandlers;
    return React.createElement(
        'div',
        { className: classes.actions },
        React.createElement(ActionButton, {
            iconType: currentUserLikesInterpretation ? 'unlike' : 'like',
            onClick: onClickHandlers[currentUserLikesInterpretation ? UNLIKE_INDEX : LIKE_INDEX]
        }),
        canReply && React.createElement(ActionButton, {
            iconType: 'reply',
            onClick: onClickHandlers[REPLY_INDEX]
        }),
        React.createElement(ActionButton, {
            iconType: isFocused ? 'visibilityOff' : 'visibility',
            onClick: onClickHandlers[isFocused ? EXIT_VIEW_INDEX : VIEW_INDEX]
        }),
        React.createElement(RedirectButton, null),
        canManage && React.createElement(
            Fragment,
            null,
            React.createElement(ActionButton, {
                iconType: 'share',
                onClick: onClickHandlers[SHARE_INDEX]
            }),
            React.createElement(ActionButton, {
                iconType: 'edit',
                onClick: onClickHandlers[EDIT_INDEX]
            }),
            React.createElement(ActionButton, {
                iconType: 'delete',
                onClick: onClickHandlers[DELETE_INDEX]
            })
        )
    );
};

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    canReply: PropTypes.bool.isRequired,
    canManage: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired
};

export default withStyles(styles)(ActionButtonContainer);