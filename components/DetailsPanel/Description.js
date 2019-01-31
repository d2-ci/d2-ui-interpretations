import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export var Description = function Description(_ref) {
    var description = _ref.description;
    return description ? React.createElement(
        RichTextParser,
        null,
        description
    ) : React.createElement(
        'i',
        null,
        i18n.t('No description')
    );
};

export default Description;

Description.propTypes = {
    description: PropTypes.string
};