import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import ActionButton from '../Buttons/ActionButton';
import WithAvatar from '../Avatar/WithAvatar';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import CardInfo from '../Cards/CardInfo';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { formatDate } from '../../dateformats/dateformatter';
import styles from './styles/Comment.style';

export var Comment = function Comment(_ref) {
    var classes = _ref.classes,
        comment = _ref.comment,
        isOwner = _ref.isOwner,
        canReply = _ref.canReply,
        locale = _ref.locale,
        onEdit = _ref.onEdit,
        onReply = _ref.onReply,
        onDelete = _ref.onDelete,
        dialogIsOpen = _ref.dialogIsOpen,
        onDeleteConfirm = _ref.onDeleteConfirm,
        onDeleteCancel = _ref.onDeleteCancel;
    return React.createElement(
        Fragment,
        null,
        React.createElement(
            WithAvatar,
            { className: classes.comment, key: comment.id, firstName: comment.user.firstName, surname: comment.user.surname },
            React.createElement(CardHeader, { userName: comment.user.displayName }),
            React.createElement(CardText, { text: comment.text }),
            React.createElement(CardInfo, { createdDate: formatDate(comment.created, locale) }),
            isOwner ? React.createElement(
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
                    onClick: onDelete
                })
            ) : canReply && React.createElement(ActionButton, {
                iconType: 'reply',
                onClick: function onClick() {
                    return onReply(comment);
                }
            })
        ),
        dialogIsOpen && React.createElement(DeleteDialog, {
            title: i18n.t('Delete comment'),
            text: i18n.t('Are you sure you want to delete this comment?'),
            onDelete: function onDelete() {
                return onDeleteConfirm(comment);
            },
            onCancel: onDeleteCancel
        })
    );
};

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    isOwner: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    dialogIsOpen: PropTypes.bool.isRequired,
    onDeleteConfirm: PropTypes.func.isRequired,
    onDeleteCancel: PropTypes.func.isRequired
};

export default withStyles(styles)(Comment);