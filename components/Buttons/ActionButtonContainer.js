import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import RedirectButton from './RedirectButton';
import styles from './styles/ActionButtonContainer.style';
import { haveWriteAccess } from '../../authorization/auth';

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
        d2 = _ref.d2,
        interpretation = _ref.interpretation,
        currentUserLikesInterpretation = _ref.currentUserLikesInterpretation,
        isOwner = _ref.isOwner,
        onClickHandlers = _ref.onClickHandlers;

    var renderOwnerActions = isOwner && React.createElement(
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

    var renderDashboardButton = React.createElement(RedirectButton, null);

    return React.createElement(
        'div',
        { className: classes.actions },
        React.createElement(ActionButton, {
            iconType: currentUserLikesInterpretation ? 'unlike' : 'like',
            onClick: onClickHandlers[currentUserLikesInterpretation ? UNLIKE_INDEX : LIKE_INDEX]
        }),
        haveWriteAccess(d2, interpretation) && React.createElement(ActionButton, {
            iconType: 'reply',
            onClick: onClickHandlers[REPLY_INDEX]
        }),
        React.createElement(ActionButton, {
            iconType: isFocused ? 'visibilityOff' : 'visibility',
            onClick: onClickHandlers[isFocused ? EXIT_VIEW_INDEX : VIEW_INDEX]
        }),
        renderDashboardButton,
        renderOwnerActions
    );
};

ActionButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUserLikesInterpretation: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
    onClickHandlers: PropTypes.array.isRequired
};

export default withStyles(styles)(ActionButtonContainer);