import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";
import CollapsibleCard from './CollapsibleCard';
import Interpretation from '../Interpretation/Interpretation';
import InterpretationsList, { interpretationsToShowOnInit } from '../Lists/InterpretationsList';
import NewInterpretationField from '../Interpretation/NewInterpretationField';
import { haveWriteAccess } from "../../authorization/auth";
import styles from './styles/InterpretationsCard.style';

export var InterpretationsCard = function (_React$Component) {
    _inherits(InterpretationsCard, _React$Component);

    function InterpretationsCard(props) {
        _classCallCheck(this, InterpretationsCard);

        var _this = _possibleConstructorReturn(this, (InterpretationsCard.__proto__ || _Object$getPrototypeOf(InterpretationsCard)).call(this, props));

        _this.renderBackButton = function () {
            return _this.state.currentInterpretationId && React.createElement(
                Button,
                {
                    className: _this.props.classes.backButton,
                    variant: "outlined",
                    size: "medium",
                    onClick: function onClick() {
                        return _this.setCurrentInterpretation(null);
                    }
                },
                React.createElement(ChevronLeft, null),
                i18n.t('Back to all interpretations')
            );
        };

        _this.renderCardContent = function () {
            var currentInterpretation = _this.getCurrentInterpretation();
            var sortedInterpretations = orderBy(["created"], ["asc"], _this.props.model.interpretations);

            return currentInterpretation ? React.createElement(Interpretation, {
                model: _this.props.model,
                interpretation: currentInterpretation,
                onChange: _this.notifyChange,
                onSelect: _this.setCurrentInterpretation,
                extended: true
            }) : React.createElement(InterpretationsList, {
                model: _this.props.model,
                d2: _this.context.d2,
                interpretations: sortedInterpretations,
                onChange: _this.notifyChange,
                onSelect: _this.setCurrentInterpretation,
                isExpanded: _this.state.listIsExpanded,
                toggleShowAllInterpretations: _this.toggleShowAllInterpretations
            });
        };

        _this.renderInputField = function () {
            return !_this.state.currentInterpretationId && haveWriteAccess(_this.context.d2, _this.props.model) && React.createElement(NewInterpretationField, {
                model: _this.props.model,
                onSave: _this.notifyChange
            });
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.isControlledComponent = !!props.onCurrentInterpretationChange;
        _this.toggleShowAllInterpretations = _this.toggleShowAllInterpretations.bind(_this);
        _this.setCurrentInterpretation = _this.setCurrentInterpretation.bind(_this);

        _this.state = {
            currentInterpretationId: props.currentInterpretationId,
            listIsExpanded: !(props.model.interpretations.length > interpretationsToShowOnInit)
        };
        return _this;
    }

    _createClass(InterpretationsCard, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var currentInterpretation = this.getCurrentInterpretation();
            if (currentInterpretation && this.props.onCurrentInterpretationChange) {
                this.props.onCurrentInterpretationChange(currentInterpretation);
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.isControlledComponent) {
                this.setState({
                    currentInterpretationId: nextProps.currentInterpretationId
                });
            }
        }
    }, {
        key: "notifyChange",
        value: function notifyChange() {
            this.props.onChange();
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
                var currentInterpretation = interpretationId ? model.interpretations.find(function (item) {
                    return item.id === interpretationId;
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
            var BackButton = this.renderBackButton();
            var Interpretations = this.renderCardContent();
            var InputField = this.renderInputField();

            return React.createElement(
                CollapsibleCard,
                { title: i18n.t("Interpretations") },
                BackButton,
                Interpretations,
                InputField
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