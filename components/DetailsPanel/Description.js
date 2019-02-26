import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import Link from '../Link/Link';

var descriptionMaxLength = 250;

export var Description = function Description(_ref) {
    var displayDescription = _ref.displayDescription,
        isToggled = _ref.isToggled,
        onToggleDescription = _ref.onToggleDescription;

    var description = void 0;

    if (!displayDescription) {
        description = i18n.t('_No description_');
    } else if (displayDescription.length < descriptionMaxLength || isToggled) {
        description = displayDescription;
    } else {
        description = displayDescription.substring(0, descriptionMaxLength) + ' ... ';
    }

    return React.createElement(
        Fragment,
        null,
        React.createElement(
            RichTextParser,
            null,
            description
        ),
        displayDescription.length > descriptionMaxLength && React.createElement(Link, {
            onClick: onToggleDescription,
            label: '[' + i18n.t('Show ') + ' ' + (isToggled ? i18n.t('less') : i18n.t('more')) + ']'
        })
    );
};

export default Description;

Description.defaultProps = {
    displayDescription: ''
};

Description.propTypes = {
    displayDescription: PropTypes.string,
    isToggled: PropTypes.bool.isRequired,
    onToggleDescription: PropTypes.func.isRequired
};