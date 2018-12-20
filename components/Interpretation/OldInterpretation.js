import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';

import NewInterpretation from './NewInterpretation';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import LikesAndReplies from './LikesAndReplies';
import ActionButtonContainer from '../Buttons/ActionButtonContainer';
import CommentList from '../InterpretationCommments/CommentList';
import { userCanManage } from '../../authorization/auth';
import CommentModel from '../../models/comment';
import styles from './styles/Interpretation.style';

export var OldInterpretation = function (_React$Component) {
    _inherits(OldInterpretation, _React$Component);

    function OldInterpretation(props) {
        _classCallCheck(this, OldInterpretation);

        var _this = _possibleConstructorReturn(this, (OldInterpretation.__proto__ || _Object$getPrototypeOf(OldInterpretation)).call(this, props));

        _this.state = {
            newComment: null,
            interpretationToEdit: null,
            sharingDialogIsOpen: false
        };

        _this.openSharingDialog = function () {
            _this.setState({ sharingDialogIsOpen: true });
        };

        _this.closeSharingDialog = function () {
            _this.setState({ sharingDialogIsOpen: false });
        };

        _this.getOnClickHandlers = function () {
            return [_this.unlike, _this.like, _this.reply, _this.exitView, _this.openSharingDialog, _this.openInterpretation, _this.deleteInterpretation, _this.view];
        };

        _this.getLikedByNames = function () {
            var likedBy = _this.props.interpretation.likedBy || [];
            return likedBy.map(function (user) {
                return user.displayName;
            }).sort();
        };

        _this.getRepliedByNames = function () {
            var repliedBy = _this.props.interpretation.comments || [];
            return repliedBy.map(function (comment) {
                return comment.user.displayName;
            }).sort();
        };

        _this.renderInterpretation = function () {
            var _this$props = _this.props,
                classes = _this$props.classes,
                extended = _this$props.extended,
                interpretation = _this$props.interpretation;


            var currentUserLikesInterpretation = some(function (user) {
                return user.id === _this.context.d2.currentUser.id;
            }, _this.props.interpretation.likedBy);

            return React.createElement(
                'div',
                { className: classes.cardBody },
                React.createElement(CardHeader, {
                    userName: interpretation.user.displayName,
                    createdDate: _this.props.interpretation.created
                }),
                React.createElement(CardText, {
                    extended: _this.props.extended,
                    text: _this.props.interpretation.text
                }),
                React.createElement(LikesAndReplies, {
                    likedBy: _this.getLikedByNames(),
                    repliedBy: _this.getRepliedByNames()
                }),
                React.createElement(ActionButtonContainer, {
                    isFocused: extended,
                    currentUserLikesInterpretation: currentUserLikesInterpretation,
                    isOwner: userCanManage(_this.context.d2, interpretation),
                    onClickHandlers: _this.getOnClickHandlers()
                })
            );
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.saveInterpretationAndClose = _this.saveInterpretationAndClose.bind(_this);
        _this.closeInterpretation = _this.closeInterpretation.bind(_this);
        _this.deleteInterpretation = _this.deleteInterpretation.bind(_this);
        _this.openInterpretation = _this.openInterpretation.bind(_this);
        _this.view = _this.view.bind(_this);
        _this.exitView = _this.exitView.bind(_this);
        _this.like = _this.like.bind(_this);
        _this.reply = _this.reply.bind(_this);
        _this.unlike = _this.unlike.bind(_this);
        _this.saveComment = _this.saveComment.bind(_this);
        _this.deleteComment = _this.deleteComment.bind(_this);
        return _this;
    }

    _createClass(OldInterpretation, [{
        key: 'notifyChange',
        value: function notifyChange(interpretation) {
            if (this.props.onChange) {
                this.props.onChange(interpretation);
            }
        }
    }, {
        key: 'saveInterpretationLike',
        value: function saveInterpretationLike(interpretation, value) {
            var _this2 = this;

            interpretation.like(this.context.d2, value).then(function () {
                return _this2.notifyChange(interpretation);
            });
        }
    }, {
        key: 'view',
        value: function view() {
            this.props.onSelect(this.props.interpretation.id);
        }
    }, {
        key: 'exitView',
        value: function exitView() {
            this.props.onSelect(null);
        }
    }, {
        key: 'like',
        value: function like() {
            this.saveInterpretationLike(this.props.interpretation, true);
        }
    }, {
        key: 'unlike',
        value: function unlike() {
            this.saveInterpretationLike(this.props.interpretation, false);
        }
    }, {
        key: 'reply',
        value: function reply() {
            var newComment = CommentModel.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment });
        }
    }, {
        key: 'deleteInterpretation',
        value: function deleteInterpretation() {
            var _this3 = this;

            if (window.confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
                this.props.interpretation.delete(this.context.d2).then(function () {
                    return _this3.notifyChange(null);
                });
            }
        }
    }, {
        key: 'openInterpretation',
        value: function openInterpretation() {
            this.setState({ interpretationToEdit: this.props.interpretation });
        }
    }, {
        key: 'closeInterpretation',
        value: function closeInterpretation() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: 'saveInterpretation',
        value: function saveInterpretation(interpretation) {
            var _this4 = this;

            interpretation.save(this.context.d2).then(function () {
                return _this4.notifyChange(_this4.props.interpretation);
            });
        }
    }, {
        key: 'saveComment',
        value: function saveComment(comment) {
            var _this5 = this;

            comment.save(this.context.d2).then(function () {
                return _this5.notifyChange(_this5.props.interpretation);
            });
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(comment) {
            var _this6 = this;

            comment.delete(this.context.d2).then(function () {
                return _this6.notifyChange(_this6.props.interpretation);
            });
        }
    }, {
        key: 'saveInterpretationAndClose',
        value: function saveInterpretationAndClose() {
            this.saveInterpretation(this.props.interpretation);
            this.closeInterpretation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                interpretation = _props.interpretation,
                extended = _props.extended,
                model = _props.model;
            var _state = this.state,
                interpretationToEdit = _state.interpretationToEdit,
                newComment = _state.newComment,
                sharingDialogIsOpen = _state.sharingDialogIsOpen;


            var OldInterpretation = this.renderInterpretation();

            return React.createElement(
                'div',
                { className: classes.listItem },
                sharingDialogIsOpen && React.createElement(SharingDialog, {
                    open: true,
                    onRequestClose: this.closeSharingDialog,
                    d2: this.context.d2,
                    id: interpretation.id,
                    type: 'interpretation'
                }),
                interpretationToEdit ? React.createElement(NewInterpretation, {
                    model: model,
                    newInterpretation: interpretationToEdit,
                    onSave: this.props.onSave,
                    onClose: this.closeInterpretation,
                    isNew: false
                }) : OldInterpretation,
                extended && React.createElement(CommentList, {
                    interpretation: interpretation,
                    onSave: this.saveComment,
                    onDelete: this.deleteComment,
                    newComment: newComment
                })
            );
        }
    }]);

    return OldInterpretation;
}(React.Component);

OldInterpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    extended: PropTypes.bool.isRequired
};

OldInterpretation.defaultProps = {
    extended: false
};

OldInterpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string
};

export default withStyles(styles)(OldInterpretation);