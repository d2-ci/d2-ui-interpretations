import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/DeleteDialog.style';

export var DeleteDialog = function DeleteDialog(_ref) {
    var classes = _ref.classes,
        title = _ref.title,
        text = _ref.text,
        onDelete = _ref.onDelete,
        onCancel = _ref.onCancel;
    return React.createElement(
        Dialog,
        { open: true, maxWidth: 'sm' },
        React.createElement(
            DialogTitle,
            null,
            title
        ),
        React.createElement(
            DialogContent,
            { className: classes.content },
            text,
            React.createElement(
                DialogActions,
                { className: classes.actions },
                React.createElement(
                    Button,
                    {
                        className: classes.button,
                        onClick: onCancel,
                        variant: 'outlined'
                    },
                    i18n.t('Cancel')
                ),
                React.createElement(
                    Button,
                    {
                        className: classes.button,
                        onClick: onDelete,
                        color: 'primary',
                        variant: 'contained'
                    },
                    i18n.t('Confirm')
                )
            )
        )
    );
};

export default withStyles(styles)(DeleteDialog);

DeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};