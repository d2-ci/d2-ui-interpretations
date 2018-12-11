import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Icons } from './misc';
import styles from './styles/InterpretationActionButton.style';

export var InterpretationActionButton = function (_Component) {
	_inherits(InterpretationActionButton, _Component);

	function InterpretationActionButton() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InterpretationActionButton);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InterpretationActionButton.__proto__ || _Object$getPrototypeOf(InterpretationActionButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { anchorEl: null }, _this.showTooltip = function (event) {
			return _this.setState({ anchorEl: event.currentTarget });
		}, _this.hideTooltip = function () {
			return _this.setState({ anchorEl: null });
		}, _this.renderTooltip = function () {
			return React.createElement(
				Popper,
				{
					anchorEl: _this.state.anchorEl,
					open: Boolean(_this.state.anchorEl),
					placement: 'top'
				},
				React.createElement(
					Paper,
					{ className: _this.props.classes.tooltip },
					_this.props.tooltip
				)
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InterpretationActionButton, [{
		key: 'render',
		value: function render() {
			var Icon = Icons[this.props.iconType];
			var Tooltip = this.renderTooltip();

			return React.createElement(
				'div',
				{
					className: this.props.classes.iconContainer,
					onMouseEnter: this.showTooltip,
					onMouseLeave: this.hideTooltip,
					onClick: this.props.onClick
				},
				Icon,
				Tooltip
			);
		}
	}]);

	return InterpretationActionButton;
}(Component);;

InterpretationActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(InterpretationActionButton);