import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import orderBy from 'lodash/fp/orderBy';
import CommentTextarea from './CommentTextarea';
import InterpretationComment from './InterpretationComment';
import { WithAvatar, getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import { formatRelative } from '../../util/i18n';
import styles from './styles/InterpretationComments.style';
export var InterpretationComments = function (_React$Component) {
    _inherits(InterpretationComments, _React$Component);

    function InterpretationComments(props) {
        _classCallCheck(this, InterpretationComments);

        var _this = _possibleConstructorReturn(this, (InterpretationComments.__proto__ || _Object$getPrototypeOf(InterpretationComments)).call(this, props));

        _this.onSave = _this.onSave.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        _this.onEdit = _this.onEdit.bind(_this);
        _this.onDelete = _this.onDelete.bind(_this);
        _this.onReply = _this.onReply.bind(_this);
        _this.onShowMoreComments = _this.onShowMoreComments.bind(_this);
        _this.onCancelEdit = _this.onCancelEdit.bind(_this);
        _this.onCancelNewComment = _this.onCancelNewComment.bind(_this);

        _this.state = {
            commentToEdit: null,
            newComment: props.newComment,
            showOnlyFirstComments: true
        };
        return _this;
    }

    _createClass(InterpretationComments, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.newComment !== newProps.newComment) {
                this.setState({ newComment: newProps.newComment });
            }
        }
    }, {
        key: 'onShowMoreComments',
        value: function onShowMoreComments() {
            this.setState({ showOnlyFirstComments: false });
        }
    }, {
        key: 'onEdit',
        value: function onEdit(comment) {
            this.setState({ commentToEdit: comment });
        }
    }, {
        key: 'onCancelEdit',
        value: function onCancelEdit() {
            this.setState({ commentToEdit: null });
        }
    }, {
        key: 'onCancelNewComment',
        value: function onCancelNewComment() {
            this.setState({ newComment: null });
        }
    }, {
        key: 'onDelete',
        value: function onDelete(comment) {
            if (window.confirm(i18n.t('Are you sure you want to remove this comment?'))) {
                this.props.onDelete(comment);
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(comment) {
            this.props.onSave(comment);
            this.setState({ commentToEdit: null });
        }
    }, {
        key: 'onSave',
        value: function onSave(comment) {
            this.props.onSave(comment);
            this.setState({ showOnlyFirstComments: false });
        }
    }, {
        key: 'onReply',
        value: function onReply(comment) {
            var newComment = comment.getReply(this.context.d2);
            this.setState({ commentToEdit: null, newComment: newComment });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var d2 = this.context.d2;
            var _props = this.props,
                classes = _props.classes,
                interpretation = _props.interpretation;
            var _state = this.state,
                commentToEdit = _state.commentToEdit,
                newComment = _state.newComment,
                showOnlyFirstComments = _state.showOnlyFirstComments;

            var sortedComments = orderBy(["created"], ["asc"], interpretation.comments);
            var commentsToShowOnInit = 3;
            var comments = showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit) : sortedComments;
            var hiddenCommentsCount = showOnlyFirstComments ? sortedComments.length - comments.length : 0;

            return React.createElement(
                'div',
                { className: classes.commentSection },
                React.createElement(
                    Fragment,
                    null,
                    comments.map(function (comment) {
                        return React.createElement(
                            WithAvatar,
                            { key: comment.id, user: comment.user },
                            React.createElement(
                                'div',
                                { className: classes.commentAuthor },
                                getUserLink(d2, comment.user),
                                React.createElement(
                                    'span',
                                    { className: classes.tipText },
                                    formatRelative(comment.created, _this2.context.locale)
                                )
                            ),
                            commentToEdit && commentToEdit.id === comment.id ? React.createElement(CommentTextarea, {
                                comment: comment,
                                onPost: _this2.onUpdate,
                                onCancel: _this2.onCancelEdit
                            }) : React.createElement(InterpretationComment, {
                                comment: comment,
                                showManageActions: userCanManage(d2, comment),
                                onEdit: _this2.onEdit,
                                onDelete: _this2.onDelete,
                                onReply: _this2.onReply
                            })
                        );
                    }),
                    showOnlyFirstComments && hiddenCommentsCount > 0 && React.createElement(
                        'div',
                        { className: classes.showMoreCommentSection },
                        React.createElement(
                            Button,
                            { onClick: this.onShowMoreComments, className: classes.showMoreCommentButton },
                            React.createElement(
                                'span',
                                { className: classes.showMoreComments },
                                hiddenCommentsCount,
                                ' ',
                                i18n.t("more comments")
                            )
                        )
                    )
                ),
                newComment && React.createElement(
                    WithAvatar,
                    { user: d2.currentUser },
                    React.createElement(CommentTextarea, {
                        comment: newComment,
                        onPost: this.onSave,
                        onCancel: this.onCancelNewComment,
                        isNewComment: true
                    })
                )
            );
        }
    }]);

    return InterpretationComments;
}(React.Component);InterpretationComments.contextTypes = {
    d2: PropTypes.object.isRequired
};
InterpretationComments.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    newComment: PropTypes.object
};
;

export default withStyles(styles)(InterpretationComments);