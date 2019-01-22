import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import isEqual from 'lodash/fp/isEqual';
import pick from 'lodash/fp/pick';

import { getFavoriteWithInterpretations } from '../models/helpers';
import DetailsCard from './details/DetailsCard';
import InterpretationsCard from './interpretations/InterpretationsCard';
import i18n from '../locales';

function configI18n(d2) {
    var locale = d2.currentUser.userSettings.settings.keyUiLocale;
    i18n.changeLanguage(locale);
}

var Interpretations = function (_React$Component) {
    _inherits(Interpretations, _React$Component);

    function Interpretations(props) {
        _classCallCheck(this, Interpretations);

        var _this = _possibleConstructorReturn(this, (Interpretations.__proto__ || _Object$getPrototypeOf(Interpretations)).call(this, props));

        _this.state = { model: null };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(Interpretations, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                d2: this.props.d2,
                locale: this.props.d2.currentUser.userSettings.settings.keyUiLocale || 'en'
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            configI18n(this.props.d2);
            this.loadModel(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var fields = ['type', 'id', 'lastUpdated'];
            var modelFieldsChanged = !isEqual(pick(fields, this.props), pick(fields, nextProps));
            if (modelFieldsChanged) {
                this.loadModel(nextProps);
            }
        }
    }, {
        key: 'loadModel',
        value: function loadModel(props) {
            var _this2 = this;

            return getFavoriteWithInterpretations(props.d2, props.type, props.id).then(function (model) {
                _this2.setState({ model: model });
                return model;
            });
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            var _this3 = this;

            return this.loadModel(this.props).then(function (newModel) {
                return _this3.props.onChange && _this3.props.onChange(newModel);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                currentInterpretationId = _props.currentInterpretationId,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;
            var model = this.state.model;


            if (!model) return React.createElement(CircularProgress, null);

            return React.createElement(
                'div',
                null,
                React.createElement(DetailsCard, { model: model, onChange: this.onChange }),
                React.createElement(InterpretationsCard, {
                    model: model,
                    onChange: this.onChange,
                    currentInterpretationId: currentInterpretationId,
                    onCurrentInterpretationChange: onCurrentInterpretationChange
                })
            );
        }
    }]);

    return Interpretations;
}(React.Component);

Interpretations.propTypes = {
    d2: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func,
    onCurrentInterpretationChange: PropTypes.func
};

Interpretations.childContextTypes = {
    d2: PropTypes.object,
    locale: PropTypes.string
};

export default Interpretations;