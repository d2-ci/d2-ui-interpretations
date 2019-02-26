import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Link.style';

var Link = function Link(_ref) {
    var label = _ref.label,
        value = _ref.value,
        _onClick = _ref.onClick,
        otherProps = _objectWithoutProperties(_ref, ['label', 'value', 'onClick']);

    return React.createElement(
        'a',
        _extends({
            style: styles.interpretationLink,
            onClick: function onClick() {
                return _onClick(value);
            }
        }, otherProps),
        label
    );
};

export { Link };
Link.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    otherProps: PropTypes.object
};

export default Link;