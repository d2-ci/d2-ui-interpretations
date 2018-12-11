import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import InterpretationIcon from './InterpretationActionButton';
import styles from './styles/Comment.style';

export var InterpretationComment = function InterpretationComment(_ref) {
    var classes = _ref.classes,
        comment = _ref.comment,
        showManageActions = _ref.showManageActions,
        onEdit = _ref.onEdit,
        onDelete = _ref.onDelete,
        onReply = _ref.onReply;
    return React.createElement(
        Fragment,
        null,
        React.createElement(
            'div',
            { className: classes.commentText },
            comment.text
        ),
        showManageActions ? React.createElement(
            'div',
            { className: classes.commentActions },
            React.createElement(InterpretationIcon, {
                iconType: 'edit',
                tooltip: i18n.t('Edit'),
                onClick: function onClick() {
                    return onEdit(comment);
                }
            }),
            React.createElement(InterpretationIcon, {
                iconType: 'reply',
                tooltip: i18n.t('Reply'),
                onClick: function onClick() {
                    return onReply(comment);
                }
            }),
            React.createElement(InterpretationIcon, {
                iconType: 'delete',
                tooltip: i18n.t('Delete'),
                onClick: function onClick() {
                    return onDelete(comment);
                }
            })
        ) : React.createElement(InterpretationIcon, {
            iconType: 'reply',
            tooltip: i18n.t('Reply'),
            onClick: function onClick() {
                return onReply(comment);
            }
        })
    );
};

InterpretationComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    showManageActions: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired
};

export default withStyles(styles)(InterpretationComment);