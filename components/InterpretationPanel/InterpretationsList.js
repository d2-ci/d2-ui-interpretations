import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import OldInterpretation from '../Interpretation/OldInterpretation';
import Link from '../Link/Link';
import styles from './styles/InterpretationsList.style';

export var interpretationsToShowOnInit = 5;

export var InterpretationsList = function InterpretationsList(_ref) {
    var classes = _ref.classes,
        model = _ref.model,
        interpretations = _ref.interpretations,
        setCurrentInterpretation = _ref.setCurrentInterpretation,
        onChange = _ref.onChange,
        isExpanded = _ref.isExpanded,
        toggleShowAllInterpretations = _ref.toggleShowAllInterpretations;

    if (!interpretations.length) {
        return React.createElement(
            'div',
            { className: classes.emptyList },
            i18n.t("No interpretations")
        );
    }

    var listItems = isExpanded ? interpretations.slice(-interpretationsToShowOnInit) : interpretations;

    return React.createElement(
        Fragment,
        null,
        interpretations.length > interpretationsToShowOnInit && React.createElement(
            'div',
            { className: classes.showAllInterpretationsContainer },
            React.createElement(Link, {
                label: (isExpanded ? i18n.t('Show') : i18n.t('Hide')) + ' old interpretations',
                onClick: toggleShowAllInterpretations
            }),
            isExpanded && React.createElement(
                'span',
                { className: classes.interpretationsCountLabel },
                i18n.t('Showing') + ' ' + listItems.length + ' ' + i18n.t('of') + ' ' + interpretations.length
            )
        ),
        listItems.map(function (item) {
            return React.createElement(OldInterpretation, {
                key: item.id,
                model: model,
                interpretation: item,
                onChange: onChange,
                extended: false,
                onSelect: setCurrentInterpretation
            });
        })
    );
};

InterpretationsList.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretations: PropTypes.array.isRequired,
    setCurrentInterpretation: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleShowAllInterpretations: PropTypes.func.isRequired
};

export default withStyles(styles)(InterpretationsList);