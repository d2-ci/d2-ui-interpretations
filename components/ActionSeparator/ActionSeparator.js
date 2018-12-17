import React from 'react';

var styles = {
    linkArea: {
        paddingLeft: '5px',
        paddingRight: '5px'
    }
};

export var ActionSeparator = function ActionSeparator(_ref) {
    var _ref$labelText = _ref.labelText,
        labelText = _ref$labelText === undefined ? "·" : _ref$labelText;
    return React.createElement(
        'label',
        { style: styles.linkArea },
        labelText
    );
};

export default ActionSeparator;