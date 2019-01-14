import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import styles from './styles/CardText.style';

export var CardText = function CardText(_ref) {
    var classes = _ref.classes,
        extended = _ref.extended,
        text = _ref.text;
    return React.createElement(
        'div',
        {
            className: extended ? classes.interpretationText : classes.interpretationTextLimited
        },
        React.createElement(
            RichTextParser,
            { style: styles.parser },
            text
        )
    );
};

CardText.defaultProps = {
    extended: true
};
CardText.propTypes = {
    classes: PropTypes.object.isRequired,
    extended: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default withStyles(styles)(CardText);