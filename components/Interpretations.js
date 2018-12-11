import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/fp/isEqual';
import pick from 'lodash/fp/pick';

import { getFavoriteWithInterpretations } from '../models/helpers';
import DetailsCard from './details/DetailsCard';
import InterpretationsCard from './interpretations/InterpretationsCard';
import i18n from '../locales';
import styles from './styles/Interpretations.style';

function configI18n(d2) {
    var locale = d2.currentUser.userSettings.settings.keyUiLocale;
    i18n.changeLanguage(locale);
}

export var Interpretations = function (_React$Component) {
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
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
                var _this2 = this;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', getFavoriteWithInterpretations(props.d2, props.type, props.id).then(function (model) {
                                    _this2.setState({ model: model });
                                    return model;
                                }));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadModel(_x) {
                return _ref.apply(this, arguments);
            }

            return loadModel;
        }()
    }, {
        key: 'onChange',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                var _this3 = this;

                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', this.loadModel(this.props).then(function (newModel) {
                                    return _this3.props.onChange && _this3.props.onChange(newModel);
                                }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onChange() {
                return _ref2.apply(this, arguments);
            }

            return onChange;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                currentInterpretationId = _props.currentInterpretationId,
                onCurrentInterpretationChange = _props.onCurrentInterpretationChange;
            var model = this.state.model;


            if (!model) return React.createElement(CircularProgress, null);

            return React.createElement(
                'div',
                { className: classes.interpretationsContainer },
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
    classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(Interpretations);