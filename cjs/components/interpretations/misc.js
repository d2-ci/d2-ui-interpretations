'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WithAvatar = exports.ActionSeparator = exports.Link = exports.getUserLink = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _InterpretationsStyles = require('./InterpretationsStyles.js');

var _InterpretationsStyles2 = _interopRequireDefault(_InterpretationsStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserLink = exports.getUserLink = function getUserLink(d2, user) {
    // Currently there is no public page for users (DHIS2-691), just use a <span> for now
    return _react2.default.createElement(
        'span',
        { style: _InterpretationsStyles2.default.userLink, className: 'author' },
        user.displayName
    );
};

var Link = function Link(props) {
    var label = props.label,
        value = props.value,
        _onClick = props.onClick,
        otherProps = (0, _objectWithoutProperties3.default)(props, ['label', 'value', 'onClick']);

    return _react2.default.createElement(
        'a',
        (0, _extends3.default)({
            style: _InterpretationsStyles2.default.interpretationLink,
            onClick: function onClick(ev) {
                return _onClick(value);
            }
        }, otherProps),
        label
    );
};

exports.Link = Link;
var ActionSeparator = exports.ActionSeparator = function ActionSeparator(_ref) {
    var _ref$labelText = _ref.labelText,
        labelText = _ref$labelText === undefined ? "·" : _ref$labelText;
    return _react2.default.createElement(
        'label',
        { style: _InterpretationsStyles2.default.linkArea },
        labelText
    );
};

var UserAvatar = function UserAvatar(_ref2) {
    var user = _ref2.user;

    var initials = user.displayName.split(" ").map(function (part) {
        return part[0];
    }).slice(0, 2).join("");
    return _react2.default.createElement(
        _Avatar2.default,
        { color: 'black', style: _InterpretationsStyles2.default.avatar },
        initials
    );
};

var WithAvatar = exports.WithAvatar = function WithAvatar(_ref3) {
    var user = _ref3.user,
        children = _ref3.children;
    return _react2.default.createElement(
        'div',
        { style: _InterpretationsStyles2.default.avatarWrapper },
        _react2.default.createElement(
            'div',
            { style: _InterpretationsStyles2.default.avatarBox },
            _react2.default.createElement(UserAvatar, { user: user })
        ),
        _react2.default.createElement(
            'div',
            { style: _InterpretationsStyles2.default.avatarBoxContent },
            children
        )
    );
};