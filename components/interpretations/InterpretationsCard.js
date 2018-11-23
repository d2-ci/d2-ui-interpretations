import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import _extends from "babel-runtime/helpers/extends";
import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";

import CollapsibleCard from "../CollapsibleCard";
import InterpretationDialog from "./InterpretationDialog";
import Interpretation from "./Interpretation";
import InterpretationModel from "../../models/interpretation";
import styles from "./InterpretationsStyles.js";

var getInterpretationsList = function getInterpretationsList(props) {
    var d2 = props.d2,
        model = props.model,
        interpretations = props.interpretations,
        setCurrentInterpretation = props.setCurrentInterpretation,
        onChange = props.onChange;

    var getUserUrl = function getUserUrl(user) {
        return baseurl + "/dhis-web-messaging/profile.action?id=" + user.id;
    };

    return interpretations.length === 0 ? React.createElement(
        "div",
        { style: { fontStyle: "italic" } },
        React.createElement(
            "span",
            null,
            i18n.t("No interpretations")
        )
    ) : interpretations.map(function (interpretation, i) {
        return React.createElement(
            "div",
            {
                key: interpretation.id,
                style: i === interpretations.length - 1 ? _extends({}, styles.interpretation, {
                    paddingBottom: 0
                }) : styles.interpretation,
                className: "interpretation-box",
                onClick: function onClick() {
                    return setCurrentInterpretation(interpretation.id);
                }
            },
            React.createElement(Interpretation, {
                d2: d2,
                model: model,
                interpretation: interpretation,
                onChange: onChange,
                extended: false,
                onSelect: setCurrentInterpretation
            })
        );
    });
};

var getInterpretationDetails = function getInterpretationDetails(props) {
    var d2 = props.d2,
        model = props.model,
        setCurrentInterpretation = props.setCurrentInterpretation,
        interpretation = props.interpretation,
        onChange = props.onChange;

    var comments = orderBy(["created"], ["desc"], interpretation.comments);

    return React.createElement(Interpretation, {
        d2: d2,
        model: model,
        interpretation: interpretation,
        onChange: onChange,
        extended: true,
        onSelect: setCurrentInterpretation
    });
};

var getInterpretationButtons = function getInterpretationButtons(props) {
    var d2 = props.d2,
        model = props.model,
        currentInterpretation = props.currentInterpretation,
        setCurrentInterpretation = props.setCurrentInterpretation,
        openNewInterpretationDialog = props.openNewInterpretationDialog;


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
            onClick: openNewInterpretationDialog,
            title: i18n.t("Write new interpretation")
        },
        React.createElement(AddIcon, null)
    );
};

var InterpretationsCard = function (_React$Component) {
    _inherits(InterpretationsCard, _React$Component);

    function InterpretationsCard(props) {
        _classCallCheck(this, InterpretationsCard);

        var _this = _possibleConstructorReturn(this, (InterpretationsCard.__proto__ || _Object$getPrototypeOf(InterpretationsCard)).call(this, props));

        _this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.openNewInterpretationDialog = _this.openNewInterpretationDialog.bind(_this);
        _this.closeInterpretationDialog = _this.closeInterpretationDialog.bind(_this);
        _this.setCurrentInterpretation = _this.setCurrentInterpretation.bind(_this);
        _this.isControlledComponent = !!props.onCurrentInterpretationChange;
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
            if (this.props.currentInterpretationId == "new") {
                this.openNewInterpretationDialog();
            }
        }
    }, {
        key: "notifyChange",
        value: function notifyChange(interpretation) {
            this.props.onChange();
        }
    }, {
        key: "openNewInterpretationDialog",
        value: function openNewInterpretationDialog() {
            var newInterpretation = new InterpretationModel(this.props.model, {});
            this.setState({ interpretationToEdit: newInterpretation });
        }
    }, {
        key: "closeInterpretationDialog",
        value: function closeInterpretationDialog() {
            this.setState({ interpretationToEdit: null });
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
            var model = this.props.model;
            var interpretationToEdit = this.state.interpretationToEdit;
            var d2 = this.context.d2;

            var sortedInterpretations = orderBy(["created"], ["desc"], model.interpretations);
            var currentInterpretation = this.getCurrentInterpretation();
            var actions = getInterpretationButtons({
                d2: d2,
                model: model,
                currentInterpretation: currentInterpretation,
                setCurrentInterpretation: this.setCurrentInterpretation,
                openNewInterpretationDialog: this.openNewInterpretationDialog
            });

            return React.createElement(
                CollapsibleCard,
                {
                    title: i18n.t("Interpretations"),
                    actions: actions
                },
                interpretationToEdit && React.createElement(InterpretationDialog, {
                    model: model,
                    interpretation: interpretationToEdit,
                    onSave: this.notifyChange,
                    onClose: this.closeInterpretationDialog
                }),
                React.createElement(
                    "div",
                    { style: { margin: 12 } },
                    currentInterpretation ? getInterpretationDetails({
                        d2: d2,
                        model: model,
                        interpretation: currentInterpretation,
                        setCurrentInterpretation: this.setCurrentInterpretation,
                        onChange: this.notifyChange
                    }) : getInterpretationsList({
                        d2: d2,
                        model: model,
                        interpretations: sortedInterpretations,
                        setCurrentInterpretation: this.setCurrentInterpretation,
                        onChange: this.notifyChange
                    })
                )
            );
        }
    }]);

    return InterpretationsCard;
}(React.Component);

InterpretationsCard.propTypes = {
    model: PropTypes.object.isRequired,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCurrentInterpretationChange: PropTypes.func
};

InterpretationsCard.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default InterpretationsCard;