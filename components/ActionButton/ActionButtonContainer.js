import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import styles from './styles/ActionButtonContainer.style';

var UNLIKE_INDEX = 0;
var LIKE_INDEX = 1;
var REPLY_INDEX = 2;
var EXIT_VIEW_INDEX = 3;
var SHARE_INDEX = 4;
var EDIT_INDEX = 5;
var DELETE_INDEX = 6;
var VIEW_INDEX = 7;

export var ActionButtonContainer = function ActionButtonContainer(_ref) {
    var classes = _ref.classes,
        currentUserLikesInterpretation = _ref.currentUserLikesInterpretation,
        showActions = _ref.showActions,
        userCanManage = _ref.userCanManage,
        onClickHandlers = _ref.onClickHandlers;

    var renderLikeButton = currentUserLikesInterpretation ? React.createElement(ActionButton, {
        iconType: 'unlike',
        onClick: onClickHandlers[UNLIKE_INDEX]
    }) : React.createElement(ActionButton, {
        iconType: 'like',
        onClick: onClickHandlers[LIKE_INDEX]
    });

    var renderOwnerActions = userCanManage && React.createElement(
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
    );

    return React.createElement(
        'div',
        { className: classes.actions },
        showActions ? React.createElement(
            Fragment,
            null,
            renderLikeButton,
            React.createElement(ActionButton, {
                iconType: 'reply',
                onClick: onClickHandlers[REPLY_INDEX]
            }),
            React.createElement(ActionButton, {
                iconType: 'visibilityOff',
                onClick: onClickHandlers[EXIT_VIEW_INDEX]
            }),
            renderOwnerActions
        ) : React.createElement(ActionButton, {
            iconType: 'visibility',
            onClick: onClickHandlers[VIEW_INDEX]
        })
    );
};

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    showActions: PropTypes.bool.isRequired,
    userCanManage: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired
};

export default withStyles(styles)(ActionButtonContainer);