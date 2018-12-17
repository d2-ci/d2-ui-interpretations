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
import { Icons } from './Icons';
import styles from './styles/ActionButton.style';

export var ActionButton = function (_Component) {
	_inherits(ActionButton, _Component);

	function ActionButton() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ActionButton);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionButton.__proto__ || _Object$getPrototypeOf(ActionButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { anchorEl: null }, _this.showTooltip = function (event) {
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
					Icons[_this.props.iconType].tooltip
				)
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ActionButton, [{
		key: 'render',
		value: function render() {
			var Icon = Icons[this.props.iconType].icon;
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

	return ActionButton;
}(Component);;

ActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ActionButton);