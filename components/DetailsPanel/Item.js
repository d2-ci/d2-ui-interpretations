import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export var Item = function Item(_ref) {
    var classes = _ref.classes,
        label = _ref.label,
        text = _ref.text;
    return React.createElement(
        'div',
        { className: classes.detailsCardItem },
        label && React.createElement(
            'label',
            { className: classes.item },
            label,
            ':'
        ),
        text
    );
};

Item.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default withStyles(styles)(Item);