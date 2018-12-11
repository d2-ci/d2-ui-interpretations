import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/InterpretationCardHeader.style';

export var InterpretationFeedback = function InterpretationFeedback(_ref) {
    var classes = _ref.classes,
        likes = _ref.likes,
        comments = _ref.comments;
    return React.createElement(
        'div',
        { className: classes.interpretationCommentArea },
        !!likes && React.createElement(
            'span',
            { className: classes.intepretationLikes },
            likes,
            ' ',
            likes > 1 ? i18n.t('likes') : i18n.t('like')
        ),
        !!comments.length && React.createElement(
            'span',
            null,
            comments.length + ' ' + (comments.length > 1 ? i18n.t('replies') : i18n.t('reply'))
        )
    );
};

export default withStyles(styles)(InterpretationFeedback);