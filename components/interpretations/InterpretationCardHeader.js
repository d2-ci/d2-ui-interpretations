import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUserLink } from './misc';
import { formatRelative } from '../../util/i18n';
import styles from './styles/InterpretationCardHeader.style';

export var InterpretationCardheader = function InterpretationCardheader(_ref) {
    var classes = _ref.classes,
        d2 = _ref.d2,
        locale = _ref.locale,
        interpretation = _ref.interpretation;
    return React.createElement(
        'div',
        { className: classes.interpretationDescSection },
        React.createElement(
            'div',
            { className: classes.interpretationName },
            getUserLink(d2, interpretation.user),
            React.createElement(
                'span',
                { className: classes.date },
                formatRelative(interpretation.created, locale)
            )
        )
    );
};

export default withStyles(styles)(InterpretationCardheader);