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
import Icons from './Icons';
import styles from './styles/ActionButton.style';

var TOOLTIP_ENTER_DELAY = 200;
export var ActionButton = function (_Component) {
	_inherits(ActionButton, _Component);

	function ActionButton(props) {
		_classCallCheck(this, ActionButton);

		var _this = _possibleConstructorReturn(this, (ActionButton.__proto__ || _Object$getPrototypeOf(ActionButton)).call(this, props));

		_this.showTooltip = function () {
			if (_this.timeout === null) {
				_this.timeout = setTimeout(function () {
					return _this.setState({ tooltipIsOpen: true });
				}, TOOLTIP_ENTER_DELAY);
			}
		};

		_this.hideTooltip = function () {
			if (typeof _this.timeout === 'number') {
				clearTimeout(_this.timeout);
				_this.timeout = null;
				_this.setState({ tooltipIsOpen: false });
			}
		};

		_this.renderTooltip = function () {
			return React.createElement(
				Popper,
				{
					anchorEl: document.getElementById(_this.id),
					open: _this.state.tooltipIsOpen,
					placement: 'top',
					style: styles.popper
				},
				React.createElement(
					Paper,
					{ className: _this.props.classes.tooltip },
					_this.props.tooltip || Icons[_this.props.iconType].tooltip
				)
			);
		};

		_this.id = Math.random().toString(36);
		_this.timeout = null;
		_this.state = { tooltipIsOpen: false };
		return _this;
	}

	_createClass(ActionButton, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.timeout);
		}
	}, {
		key: 'render',
		value: function render() {
			var Icon = Icons[this.props.iconType].icon;
			var Tooltip = this.renderTooltip();

			return React.createElement(
				'div',
				{
					id: this.id,
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

ActionButton.defaultProps = {
	onClick: function onClick() {
		return null;
	}
};

ActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ActionButton);