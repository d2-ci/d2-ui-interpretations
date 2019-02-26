import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/TextSeparator.style';

export var TextSeparator = function TextSeparator(_ref) {
    var classes = _ref.classes,
        _ref$labelText = _ref.labelText,
        labelText = _ref$labelText === undefined ? "·" : _ref$labelText;
    return React.createElement(
        'label',
        { className: classes.linkArea },
        labelText
    );
};

TextSeparator.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextSeparator);