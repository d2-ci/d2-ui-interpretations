import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import i18n from "@dhis2/d2-i18n";

export var InterpretationButtons = function InterpretationButtons(_ref) {
    var currentInterpretation = _ref.currentInterpretation,
        setCurrentInterpretation = _ref.setCurrentInterpretation,
        openNewInterpretation = _ref.openNewInterpretation;
    return currentInterpretation ? React.createElement(
        IconButton,
        {
            onClick: function onClick() {
                return setCurrentInterpretation(null);
            },
            title: i18n.t("Clear interpretation")
        },
        React.createElement(ChevronLeftIcon, null)
    ) : React.createElement(
        IconButton,
        {
            onClick: openNewInterpretation,
            title: i18n.t("Write new interpretation")
        },
        React.createElement(AddIcon, null)
    );
};

InterpretationButtons.propTypes = {
    currentInterpretation: PropTypes.object,
    setCurrentInterpretation: PropTypes.func,
    openNewInterpretation: PropTypes.func
};

export default InterpretationButtons;