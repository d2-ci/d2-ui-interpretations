import React from 'react';
import styles from './styles/DetailsCard.style';

export var ListItem = function ListItem(_ref) {
    var label = _ref.label,
        text = _ref.text,
        button = _ref.button;
    return React.createElement(
        'div',
        { style: styles.detailsCardItem },
        label && React.createElement(
            'label',
            { style: styles.listItemLabel },
            label,
            ':'
        ),
        text,
        button
    );
};

export default ListItem;