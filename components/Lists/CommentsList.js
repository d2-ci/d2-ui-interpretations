import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import orderBy from 'lodash/fp/orderBy';
import NewCommentField from '../Comment/NewCommentField';
import Comment from '../Comment/Comment';
import Link from '../Link/Link';
import CommentModel from '../../models/comment';
import { userCanManage } from '../../authorization/auth';
import styles from './styles/CommentsList.style';

var commentsToShowOnInit = 5;

export var CommentsList = function (_React$Component) {
    _inherits(CommentsList, _React$Component);

    function CommentsList(props) {
        _classCallCheck(this, CommentsList);

        var _this = _possibleConstructorReturn(this, (CommentsList.__proto__ || _Object$getPrototypeOf(CommentsList)).call(this, props));

        _this.onShowMoreComments = function () {
            return _this.setState({ listIsExpanded: true });
        };

        _this.onHideOldComments = function () {
            return _this.setState({ listIsExpanded: false });
        };

        _this.onEdit = function (comment) {
            return _this.setState({ commentToEdit: comment });
        };

        _this.onCancelEdit = function () {
            return _this.setState({ commentToEdit: null });
        };

        _this.onCancelNewComment = function () {
            _this.setState({ newComment: null });
            _this.props.onCancel();
        };

        _this.onOpenDeleteDialog = function () {
            return _this.setState({ deleteDialogIsOpen: true });
        };

        _this.onCloseDeleteDialog = function () {
            return _this.setState({ deleteDialogIsOpen: false });
        };

        _this.getComments = function () {
            var sortedComments = orderBy(["created"], ["asc"], _this.props.interpretation.comments);

            return !_this.state.listIsExpanded ? sortedComments.slice(-commentsToShowOnInit) : sortedComments;
        };

        _this.renderViewMoreLink = function () {
            return _this.props.interpretation.comments.length > commentsToShowOnInit && React.createElement(Link, {
                label: _this.state.listIsExpanded ? i18n.t('Hide old replies') : i18n.t('View more replies'),
                onClick: _this.state.listIsExpanded ? _this.onHideOldComments : _this.onShowMoreComments
            });
        };

        _this.renderComments = function () {
            return _this.getComments().map(function (comment) {
                return _this.state.commentToEdit && _this.state.commentToEdit.id === comment.id ? React.createElement(NewCommentField, {
                    key: comment.id,
                    comment: comment,
                    onPost: _this.onUpdate,
                    onCancel: _this.onCancelEdit
                }) : React.createElement(Comment, {
                    key: comment.id,
                    comment: comment,
                    canReply: _this.props.canReply,
                    isOwner: userCanManage(_this.context.d2, comment),
                    locale: _this.context.locale,
                    onEdit: _this.onEdit,
                    onReply: _this.onReply,
                    onDelete: _this.onOpenDeleteDialog,
                    dialogIsOpen: _this.state.deleteDialogIsOpen,
                    onDeleteConfirm: _this.onDeleteComment,
                    onDeleteCancel: _this.onCloseDeleteDialog
                });
            });
        };

        _this.renderInputField = function () {
            return _this.props.canReply && React.createElement(NewCommentField, {
                comment: _this.state.newComment,
                onPost: _this.onSave
            });
        };

        _this.onSave = _this.onSave.bind(_this);
        _this.onDeleteComment = _this.onDeleteComment.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        _this.onReply = _this.onReply.bind(_this);

        _this.state = {
            listIsExpanded: !(_this.props.interpretation.comments.length > commentsToShowOnInit),
            commentToEdit: null,
            newComment: props.newComment,
            deleteDialogIsOpen: false
        };
        return _this;
    }

    _createClass(CommentsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var newComment = CommentModel.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment, showToolbar: true });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.newComment !== prevProps.newComment) {
                this.setState({ newComment: this.props.newComment });
            }
        }
    }, {
        key: 'onSave',
        value: function onSave(comment) {
            var _this2 = this;

            comment.save(this.context.d2).then(function () {
                return _this2.props.onChange(_this2.props.interpretation);
            });
        }
    }, {
        key: 'onDeleteComment',
        value: function onDeleteComment(comment) {
            var _this3 = this;

            comment.delete(this.context.d2).then(function () {
                return _this3.props.onChange(_this3.props.interpretation);
            });
            this.onCloseDeleteDialog();
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(comment) {
            this.onSave(comment);
            this.setState({ commentToEdit: null });
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
            var ViewMoreReplies = this.renderViewMoreLink();
            var Comments = this.renderComments();
            var InputField = this.renderInputField();

            return React.createElement(
                'div',
                { className: this.props.classes.commentSection },
                ViewMoreReplies,
                Comments,
                InputField
            );
        }
    }]);

    return CommentsList;
}(React.Component);CommentsList.contextTypes = {
    locale: PropTypes.string,
    d2: PropTypes.object.isRequired
};
CommentsList.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    newComment: PropTypes.object,
    onChange: PropTypes.func
};
;

export default withStyles(styles)(CommentsList);