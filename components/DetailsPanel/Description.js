import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export var Description = function Description(model) {
    var descriptionMaxLength = 250;
    var description = model.displayDescription;


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