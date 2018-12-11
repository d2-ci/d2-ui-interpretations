import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";

import CollapsibleCard from "../details/CollapsibleCard";
import NewInterpretation from './NewInterpretation';
import InterpretationModel from "../../models/interpretation";
import Interpretation from './Interpretation';
import InterpretationsList from './InterpretationsList';
import InterpretationButtons from './InterpretationButtons';
import styles from './styles/InterpretationsCard.style';

export var InterpretationsCard = function (_React$Component) {
    _inherits(InterpretationsCard, _React$Component);

    function InterpretationsCard(props) {
        _classCallCheck(this, InterpretationsCard);

        var _this = _possibleConstructorReturn(this, (InterpretationsCard.__proto__ || _Object$getPrototypeOf(InterpretationsCard)).call(this, props));

        _this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId,
            sharingDialogIsOpen: false,
            listIsExpanded: !props.model.interpretations.length > 5
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.openNewInterpretation = _this.openNewInterpretation.bind(_this);
        _this.openSharingDialog = _this.openSharingDialog.bind(_this);
        _this.closeNewInterpretation = _this.closeNewInterpretation.bind(_this);
        _this.setCurrentInterpretation = _this.setCurrentInterpretation.bind(_this);
        _this.isControlledComponent = !!props.onCurrentInterpretationChange;
        _this.toggleShowAllInterpretations = _this.toggleShowAllInterpretations.bind(_this);
        return _this;
    }

    _createClass(InterpretationsCard, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.isControlledComponent) {
                this.setState({
                    currentInterpretationId: nextProps.currentInterpretationId
                });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var currentInterpretation = this.getCurrentInterpretation();
            if (currentInterpretation && this.props.onCurrentInterpretationChange) {
                this.props.onCurrentInterpretationChange(currentInterpretation);
            }
            if (this.props.currentInterpretationId === "new") {
                this.openNewInterpretation();
            }
        }
    }, {
        key: "notifyChange",
        value: function notifyChange() {
            this.props.onChange();
        }
    }, {
        key: "openNewInterpretation",
        value: function openNewInterpretation() {
            var newInterpretation = new InterpretationModel(this.props.model, {});
            this.setState({ interpretationToEdit: newInterpretation });
        }
    }, {
        key: "closeNewInterpretation",
        value: function closeNewInterpretation() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: "openSharingDialog",
        value: function openSharingDialog() {
            this.setState({ sharingDialogIsOpen: true });
        }
    }, {
        key: "closeSharingDialog",
        value: function closeSharingDialog() {
            this.setState({ sharingDialogIsOpen: false });
        }
    }, {
        key: "toggleShowAllInterpretations",
        value: function toggleShowAllInterpretations() {
            this.setState({ listIsExpanded: !this.state.listIsExpanded });
        }
    }, {
        key: "setCurrentInterpretation",
        value: function setCurrentInterpretation(interpretationId) {
            var _props = this.props,
                model = _props.model,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;


            if (this.isControlledComponent) {
                var currentInterpretation = interpretationId ? model.interpretations.find(function (interpretation) {
                    return interpretation.id === interpretationId;
                }) : null;
                onCurrentInterpretationChange(currentInterpretation);
            } else {
                this.setState({ currentInterpretationId: interpretationId });
            }
        }
    }, {
        key: "getCurrentInterpretation",
        value: function getCurrentInterpretation() {
            var model = this.props.model;
            var currentInterpretationId = this.state.currentInterpretationId;

            return model && model.interpretations && currentInterpretationId ? model.interpretations.find(function (interpretation) {
                return interpretation.id === currentInterpretationId;
            }) : null;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                classes = _props2.classes,
                model = _props2.model;
            var interpretationToEdit = this.state.interpretationToEdit;
            var d2 = this.context.d2;

            var sortedInterpretations = orderBy(["created"], ["asc"], model.interpretations);
            var currentInterpretation = this.getCurrentInterpretation();

            return React.createElement(
                CollapsibleCard,
                {
                    title: i18n.t("Interpretations"),
                    actions: React.createElement(InterpretationButtons, {
                        d2: d2,
                        model: model,
                        currentInterpretation: currentInterpretation,
                        setCurrentInterpretation: this.setCurrentInterpretation,
                        openNewInterpretation: this.openNewInterpretation
                    })
                },
                React.createElement(
                    "div",
                    { className: classes.cardContainer },
                    currentInterpretation ? React.createElement(Interpretation, {
                        d2: d2,
                        model: model,
                        interpretation: currentInterpretation,
                        onChange: this.notifyChange,
                        onSelect: this.setCurrentInterpretation,
                        onSave: this.notifyChange,
                        onClose: this.closeNewInterpretation,
                        extended: true
                    }) : React.createElement(InterpretationsList, {
                        d2: d2,
                        model: model,
                        interpretations: sortedInterpretations,
                        setCurrentInterpretation: this.setCurrentInterpretation,
                        onChange: this.notifyChange,
                        isExpanded: this.state.listIsExpanded,
                        toggleShowAllInterpretations: this.toggleShowAllInterpretations
                    })
                ),
                interpretationToEdit && React.createElement(NewInterpretation, {
                    model: model,
                    newInterpretation: interpretationToEdit,
                    onSave: this.notifyChange,
                    onClose: this.closeNewInterpretation,
                    isNew: true
                })
            );
        }
    }]);

    return InterpretationsCard;
}(React.Component);

InterpretationsCard.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCurrentInterpretationChange: PropTypes.func
};

InterpretationsCard.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default withStyles(styles)(InterpretationsCard);