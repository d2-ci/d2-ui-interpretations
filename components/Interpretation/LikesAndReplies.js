import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/LikesAndReplies.style';

export var LikesAndReplies = function (_Component) {
    _inherits(LikesAndReplies, _Component);

    function LikesAndReplies() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, LikesAndReplies);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LikesAndReplies.__proto__ || _Object$getPrototypeOf(LikesAndReplies)).call.apply(_ref, [this].concat(args))), _this), _this.state = { mouseOverLikes: null, mouseOverReplies: null }, _this.showLikedByTooltip = function (event) {
            return _this.setState({ mouseOverLikes: event.currentTarget });
        }, _this.hideLikedByTooltip = function () {
            return _this.setState({ mouseOverLikes: null });
        }, _this.showRepliedByTooltip = function (event) {
            return _this.setState({ mouseOverReplies: event.currentTarget });
        }, _this.hideRepliedByTooltip = function () {
            return _this.setState({ mouseOverReplies: null });
        }, _this.filterDuplicateUserNames = function () {
            var listItems = [];

            _this.props.repliedBy.forEach(function (userName) {
                if (!listItems.includes(userName)) {
                    listItems = [].concat(_toConsumableArray(listItems), [userName]);
                }
            });
            return listItems;
        }, _this.renderTooltip = function (label) {
            var anchorOrigin = label === 'likedBy' ? _this.state.mouseOverLikes : _this.state.mouseOverReplies;
            var tooltipNames = label === 'repliedBy' ? _this.filterDuplicateUserNames() : _this.props.likedBy;

            return React.createElement(
                Popper,
                {
                    anchorEl: anchorOrigin,
                    open: Boolean(anchorOrigin),
                    placement: 'top'
                },
                React.createElement(
                    Paper,
                    { className: _this.props.classes.tooltip },
                    React.createElement(
                        'ul',
                        { className: _this.props.classes.tooltipList },
                        tooltipNames.map(function (userName, key) {
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
        }, _this.renderLikes = function () {
            var _this$props = _this.props,
                classes = _this$props.classes,
                likedBy = _this$props.likedBy;

            var LikedByTooltip = _this.state.mouseOverLikes && _this.renderTooltip('likedBy');

            return React.createElement(
                'span',
                {
                    className: classes.intepretationLikes,
                    onMouseEnter: _this.showLikedByTooltip,
                    onMouseLeave: _this.hideLikedByTooltip
                },
                LikedByTooltip,
                likedBy.length,
                ' ',
                likedBy.length > 1 ? i18n.t('likes') : i18n.t('like')
            );
        }, _this.renderReplies = function () {
            var repliedBy = _this.props.repliedBy;

            var RepliedByTooltip = _this.state.mouseOverReplies && _this.renderTooltip('repliedBy');

            return React.createElement(
                'span',
                {
                    onMouseEnter: _this.showRepliedByTooltip,
                    onMouseLeave: _this.hideRepliedByTooltip
                },
                RepliedByTooltip,
                repliedBy.length + ' ' + (repliedBy.length > 1 ? i18n.t('replies') : i18n.t('reply'))
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LikesAndReplies, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                likedBy = _props.likedBy,
                repliedBy = _props.repliedBy;


            var Likes = !!likedBy.length && this.renderLikes();
            var Replies = !!repliedBy.length && this.renderReplies();

            return React.createElement(
                'div',
                { className: classes.interpretationCommentArea },
                Likes,
                Replies
            );
        }
    }]);

    return LikesAndReplies;
}(Component);;

LikesAndReplies.propTypes = {
    classes: PropTypes.object.isRequired,
    repliedBy: PropTypes.array.isRequired,
    likedBy: PropTypes.array.isRequired
};

export default withStyles(styles)(LikesAndReplies);