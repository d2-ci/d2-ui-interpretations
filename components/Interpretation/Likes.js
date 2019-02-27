import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment, Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextSeparator from '../TextSeparator/TextSeparator';
import styles from './styles/LikesAndReplies.style';

var TOOLTIP_ENTER_DELAY = 200;

export var Likes = function (_Component) {
    _inherits(Likes, _Component);

    function Likes(props) {
        _classCallCheck(this, Likes);

        var _this = _possibleConstructorReturn(this, (Likes.__proto__ || _Object$getPrototypeOf(Likes)).call(this, props));

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
                    React.createElement(
                        'ul',
                        { className: _this.props.classes.tooltipList },
                        _this.props.likedBy.map(function (userName, key) {
                            return React.createElement(
                                'li',
                                { key: key },
                                ' ',
                                userName,
                                ' '
                            );
                        })
                    )
                )
            );
        };

        _this.id = Math.random().toString(36);
        _this.timeout = null;
        _this.state = { tooltipIsOpen: false };
        return _this;
    }

    _createClass(Likes, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var likedBy = this.props.likedBy;

            var Tooltip = this.state.tooltipIsOpen && this.renderTooltip();

            return !!likedBy.length && React.createElement(
                Fragment,
                null,
                React.createElement(TextSeparator, null),
                React.createElement(
                    'span',
                    {
                        id: this.id,
                        onMouseEnter: this.showTooltip,
                        onMouseLeave: this.hideTooltip
                    },
                    Tooltip,
                    likedBy.length,
                    ' ',
                    likedBy.length > 1 ? i18n.t('likes') : i18n.t('like')
                )
            );
        }
    }]);

    return Likes;
}(Component);;

Likes.propTypes = {
    classes: PropTypes.object.isRequired,
    likedBy: PropTypes.array.isRequired
};

export default withStyles(styles)(Likes);