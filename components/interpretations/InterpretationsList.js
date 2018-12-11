import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import Interpretation from './Interpretation';
import { Link } from './misc';
import styles from './styles/InterpretationsList.style';

export var InterpretationsList = function InterpretationsList(_ref) {
    var classes = _ref.classes,
        d2 = _ref.d2,
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
            React.createElement(
                'span',
                null,
                i18n.t("No interpretations")
            )
        );
    }

    var renderListItem = function renderListItem(item) {
        return React.createElement(
            'div',
            {
                key: item.id,
                className: classes.interpretation,
                onClick: function onClick() {
                    return setCurrentInterpretation(item.id);
                }
            },
            React.createElement(Interpretation, {
                d2: d2,
                model: model,
                interpretation: item,
                onChange: onChange,
                extended: false,
                onSelect: setCurrentInterpretation
            })
        );
    };

    var listItems = isExpanded ? interpretations.slice(0, 4).map(function (interpretation) {
        return renderListItem(interpretation);
    }) : interpretations.map(function (interpretation) {
        return renderListItem(interpretation);
    });

    return React.createElement(
        Fragment,
        null,
        interpretations.length > 5 && React.createElement(
            'div',
            { className: classes.showAllInterpretationsContainer },
            React.createElement(Link, {
                label: isExpanded ? i18n.t('Show all interpretations') : i18n.t('Hide old interpretations'),
                onClick: function onClick() {
                    return toggleShowAllInterpretations();
                }
            }),
            isExpanded && React.createElement(
                'span',
                { className: classes.interpretationsCountLabel },
                i18n.t('Showing') + ' ' + listItems.length + ' ' + i18n.t('of') + ' ' + interpretations.length
            )
        ),
        listItems
    );
};

InterpretationsList.contextTypes = {
    d2: PropTypes.object.isRequired
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