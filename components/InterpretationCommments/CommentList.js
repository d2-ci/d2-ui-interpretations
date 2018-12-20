import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import ShowMoreButton from '../Buttons/ShowMoreButton';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import orderBy from 'lodash/fp/orderBy';
import NewComment from './NewComment';
import OldComment from './OldComment';
import CardHeader from '../Cards/CardHeader';
import WithAvatar from '../Avatar/WithAvatar';

import { userCanManage } from '../../authorization/auth';
import styles from './styles/CommentList.style';

var commentsToShowOnInit = 3;

export var CommentList = function (_React$Component) {
    _inherits(CommentList, _React$Component);

    function CommentList(props) {
        _classCallCheck(this, CommentList);

        var _this = _possibleConstructorReturn(this, (CommentList.__proto__ || _Object$getPrototypeOf(CommentList)).call(this, props));

        _this.getHiddenCommentsCount = function () {
            var comments = _this.props.interpretation.comments;

            return _this.state.showOnlyFirstComments ? comments.length - comments.slice(0, commentsToShowOnInit).length : 0;
        };

        _this.getComments = function () {
            var sortedComments = orderBy(["created"], ["asc"], _this.props.interpretation.comments);

            return _this.state.showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit) : sortedComments;
        };

        _this.renderComments = function () {
            return _this.getComments().map(function (comment) {
                return React.createElement(
                    WithAvatar,
                    { key: comment.id, user: comment.user },
                    React.createElement(CardHeader, {
                        userName: comment.user.displayName,
                        createdDate: comment.created
                    }),
                    _this.state.commentToEdit && _this.state.commentToEdit.id === comment.id ? React.createElement(NewComment, {
                        comment: comment,
                        onPost: _this.onUpdate,
                        onCancel: _this.onCancelEdit,
                        isEditing: true
                    }) : React.createElement(OldComment, {
                        comment: comment,
                        isOwner: userCanManage(_this.context.d2, comment),
                        onEdit: _this.onEdit,
                        onDelete: _this.onDelete,
                        onReply: _this.onReply
                    })
                );
            });
        };

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
            showOnlyFirstComments: _this.props.interpretation.comments.length > commentsToShowOnInit
        };
        return _this;
    }

    _createClass(CommentList, [{
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
            this.setState({ showOnlyFirstComments: false, newComment: null });
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
            var _state = this.state,
                newComment = _state.newComment,
                showOnlyFirstComments = _state.showOnlyFirstComments;

            var Comments = this.renderComments();

            return React.createElement(
                'div',
                { className: this.props.classes.commentSection },
                Comments,
                React.createElement(ShowMoreButton, {
                    showButton: showOnlyFirstComments,
                    hiddenCommentsCount: this.getHiddenCommentsCount(),
                    onClick: this.onShowMoreComments
                }),
                newComment && React.createElement(
                    WithAvatar,
                    { user: this.context.d2.currentUser },
                    React.createElement(NewComment, {
                        comment: newComment,
                        onPost: this.onSave,
                        onCancel: this.onCancelNewComment
                    })
                )
            );
        }
    }]);

    return CommentList;
}(React.Component);CommentList.contextTypes = {
    d2: PropTypes.object.isRequired
};
CommentList.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    newComment: PropTypes.object
};
;

export default withStyles(styles)(CommentList);