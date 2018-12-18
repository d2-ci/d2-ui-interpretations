import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../ActionButton/ActionButton';
import CardText from '../Interpretation/CardText';
import styles from './styles/InterpretationComment.style';

export var OldComment = function OldComment(_ref) {
    var classes = _ref.classes,
        comment = _ref.comment,
        showManageActions = _ref.showManageActions,
        onEdit = _ref.onEdit,
        onDelete = _ref.onDelete,
        onReply = _ref.onReply;
    return React.createElement(
        Fragment,
        null,
        React.createElement(CardText, {
            extended: true,
            text: comment.text
        }),
        showManageActions ? React.createElement(
            'div',
            { className: classes.commentActions },
            React.createElement(ActionButton, {
                iconType: 'edit',
                onClick: function onClick() {
                    return onEdit(comment);
                }
            }),
            React.createElement(ActionButton, {
                iconType: 'reply',
                onClick: function onClick() {
                    return onReply(comment);
                }
            }),
            React.createElement(ActionButton, {
                iconType: 'delete',
                onClick: function onClick() {
                    return onDelete(comment);
                }
            })
        ) : React.createElement(ActionButton, {
            iconType: 'reply',
            onClick: function onClick() {
                return onReply(comment);
            }
        })
    );
};

OldComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    showManageActions: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired
};

export default withStyles(styles)(OldComment);