import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

var styles = function styles(theme) {
    return {
        card: {
            maxWidth: 400,
            margin: 4,
            marginBottom: 6,
            position: 'relative'
        },
        actions: {
            marginTop: 0,
            marginRight: -4,
            '& button': {
                padding: theme.spacing.unit * 0.5
            }
        },
        header: {
            padding: '4px 12px 4px 12px'
        },
        title: {
            fontSize: 15,
            fontWeight: 500
        },
        content: {
            padding: 0,
            paddingBottom: '0 !important',
            borderTop: '1px solid lightgrey'
        },
        collapse: {
            clear: 'both'
        },
        expand: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: 'rotate(180deg)'
        }
    };
};

var CollapsibleCard = function (_React$Component) {
    _inherits(CollapsibleCard, _React$Component);

    function CollapsibleCard() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CollapsibleCard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollapsibleCard.__proto__ || _Object$getPrototypeOf(CollapsibleCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = { expanded: true }, _this.handleExpandClick = function () {
            _this.setState(function (state) {
                return { expanded: !state.expanded };
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CollapsibleCard, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                title = _props.title,
                actions = _props.actions,
                children = _props.children;
            var expanded = this.state.expanded;


            return React.createElement(
                Card,
                { className: classes.card },
                React.createElement(CardHeader, {
                    title: title,
                    classes: { root: classes.header, title: classes.title, action: classes.actions },
                    action: React.createElement(
                        Fragment,
                        null,
                        expanded ? actions : null,
                        React.createElement(
                            IconButton,
                            {
                                className: classnames(classes.expand, _defineProperty({}, classes.expandOpen, expanded)),
                                onClick: this.handleExpandClick,
                                'aria-expanded': expanded,
                                disableRipple: true
                            },
                            React.createElement(ExpandMoreIcon, null)
                        )
                    )
                }),
                React.createElement(
                    Collapse,
                    { 'in': expanded, timeout: 'auto', unmountOnExit: true, className: classes.collapse },
                    React.createElement(
                        CardContent,
                        { classes: { root: classes.content } },
                        children
                    )
                )
            );
        }
    }]);

    return CollapsibleCard;
}(React.Component);

CollapsibleCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollapsibleCard);