import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/InterpretationCardHeader.style';

export var InterpretationText = function InterpretationText(_ref) {
    var classes = _ref.classes,
        extended = _ref.extended,
        text = _ref.text;
    return React.createElement(
        'div',
        { className: classes.interpretationTextWrapper },
        React.createElement(
            'div',
            {
                className: extended ? classes.interpretationText : classes.interpretationTextLimited
            },
            text
        )
    );
};

export default withStyles(styles)(InterpretationText);