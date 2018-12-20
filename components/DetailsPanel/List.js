import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/Details.style';

export var List = function List(_ref) {
    var classes = _ref.classes,
        children = _ref.children;
    return React.createElement(
        'div',
        { className: classes.detailsCardList },
        children
    );
};

List.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(List);