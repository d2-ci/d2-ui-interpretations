import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export var ListItem = function ListItem(_ref) {
    var classes = _ref.classes,
        label = _ref.label,
        text = _ref.text;
    return React.createElement(
        'div',
        { className: classes.detailsCardItem },
        label && React.createElement(
            'label',
            { style: styles.listItemLabel },
            label,
            ':'
        ),
        text
    );
};

ListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string
};

export default withStyles(styles)(ListItem);