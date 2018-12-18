import React from 'react';
import styles from './styles/Details.style';

export var List = function List(_ref) {
    var children = _ref.children;
    return React.createElement(
        'div',
        { style: styles.detailsCardList },
        children
    );
};

export default List;