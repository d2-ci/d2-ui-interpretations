import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export var Description = function Description(_ref) {
    var description = _ref.description;

    var descriptionMaxLength = 250;

    if (!description) {
        return React.createElement(
            'i',
            null,
            i18n.t('No description')
        );
    } else if (description.length < descriptionMaxLength) {
        return React.createElement(
            RichTextParser,
            null,
            description
        );
    } else {
        return React.createElement(
            RichTextParser,
            null,
            description.substring(0, descriptionMaxLength) + ' ...'
        );
    }
};

export default Description;

Description.propTypes = {
    description: PropTypes.string
};