import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';
import NewInterpretationField from './NewInterpretationField';
import WithAvatar from '../Avatar/WithAvatar';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import CardInfo from '../Cards/CardInfo';
import ActionButtonContainer from '../Buttons/ActionButtonContainer';
import CommentsList from '../Lists/CommentsList';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import InterpretationModel from '../../models/interpretation';
import CommentModel from '../../models/comment';
import { userCanManage, haveWriteAccess } from '../../authorization/auth';
import { formatRelative } from '../../dateformats/dateformatter';
import { shouldUpdateSharing } from '../../sharing/sharing';
import styles from './styles/Interpretation.style';

export var Interpretation = function (_React$Component) {
    _inherits(Interpretation, _React$Component);

    function Interpretation(props) {
        _classCallCheck(this, Interpretation);

        var _this = _possibleConstructorReturn(this, (Interpretation.__proto__ || _Object$getPrototypeOf(Interpretation)).call(this, props));

        _this.onOpenSharingDialog = function (event) {
            event.stopPropagation();
            _this.setState({ sharingDialogIsOpen: true });
        };

        _this.onCloseSharingDialog = function (newSharingInfo) {
            if (shouldUpdateSharing(newSharingInfo, _this.props.interpretation)) {
                var sharingProperties = _Object$assign({}, _this.props.interpretation, newSharingInfo);
                var updatedInterpretation = new InterpretationModel(_this.props.model, sharingProperties);
                _this.onSaveInterpretation(updatedInterpretation);
            }
            _this.setState({ sharingDialogIsOpen: false });
        };

        _this.onOpenDeleteDialog = function (event) {
            event.stopPropagation();
            _this.setState({ deleteDialogIsOpen: true });
        };

        _this.onCloseDeleteDialog = function () {
            return _this.setState({ deleteDialogIsOpen: false });
        };

        _this.getOnClickHandlers = function () {
            return [_this.onUnlike, _this.onLike, _this.onView, _this.onExitView, _this.onOpenSharingDialog, _this.onEditInterpretation, _this.onOpenDeleteDialog, _this.onReply];
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
                model = _this$props.model,
                extended = _this$props.extended,
                interpretation = _this$props.interpretation;


            if (_this.state.interpretationToEdit) {
                return React.createElement(NewInterpretationField, {
                    model: model,
                    type: 'interpretation',
                    interpretation: _this.state.interpretationToEdit,
                    onUpdate: _this.onSaveInterpretation,
                    onClose: _this.onCancelEditInterpretation
                });
            } else {
                var currentUserLikesInterpretation = some(function (user) {
                    return user.id === _this.context.d2.currentUser.id;
                }, _this.props.interpretation.likedBy);

                return React.createElement(
                    WithAvatar,
                    {
                        className: extended ? classes.expanded : classes.compact,
                        user: interpretation.user,
                        onClick: !extended ? _this.onView : null
                    },
                    React.createElement(CardHeader, { userName: interpretation.user.displayName }),
                    React.createElement(CardText, { extended: extended, text: interpretation.text }),
                    React.createElement(CardInfo, {
                        likedBy: _this.getLikedByNames(),
                        repliedBy: _this.getRepliedByNames(),
                        createdDate: formatRelative(interpretation.created, _this.context.locale)
                    }),
                    React.createElement(ActionButtonContainer, {
                        isFocused: extended,
                        currentUserLikesInterpretation: currentUserLikesInterpretation,
                        canReply: haveWriteAccess(_this.context.d2, interpretation),
                        canManage: userCanManage(_this.context.d2, interpretation),
                        onClickHandlers: _this.getOnClickHandlers()
                    })
                );
            }
        };

        _this.renderComments = function () {
            return _this.props.extended && React.createElement(CommentsList, {
                interpretation: _this.props.interpretation,
                newComment: _this.state.newComment,
                onChange: _this.notifyChange
            });
        };

        _this.renderSharingDialog = function () {
            return _this.state.sharingDialogIsOpen && React.createElement(SharingDialog, {
                open: true,
                onRequestClose: _this.onCloseSharingDialog,
                d2: _this.context.d2,
                id: _this.props.interpretation.id,
                type: 'interpretation'
            });
        };

        _this.renderDeleteInterpretationDialog = function () {
            return _this.state.deleteDialogIsOpen && React.createElement(DeleteDialog, {
                title: i18n.t('Delete interpretation'),
                text: i18n.t('Are you sure you want to delete this interpretation?'),
                onDelete: _this.onDeleteInterpretation,
                onCancel: _this.onCloseDeleteDialog
            });
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.onSaveInterpretation = _this.onSaveInterpretation.bind(_this);
        _this.onDeleteInterpretation = _this.onDeleteInterpretation.bind(_this);
        _this.onEditInterpretation = _this.onEditInterpretation.bind(_this);
        _this.onCancelEditInterpretation = _this.onCancelEditInterpretation.bind(_this);
        _this.onView = _this.onView.bind(_this);
        _this.onExitView = _this.onExitView.bind(_this);
        _this.onLike = _this.onLike.bind(_this);
        _this.onUnlike = _this.onUnlike.bind(_this);
        _this.onReply = _this.onReply.bind(_this);

        _this.state = {
            interpretationToEdit: null,
            newComment: null,
            sharingDialogIsOpen: false,
            deleteDialogIsOpen: false
        };
        return _this;
    }

    _createClass(Interpretation, [{
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
        key: 'onView',
        value: function onView(event) {
            event.stopPropagation();
            this.props.onSelect(this.props.interpretation.id);
        }
    }, {
        key: 'onExitView',
        value: function onExitView(event) {
            event.stopPropagation();
            this.props.onSelect(null);
        }
    }, {
        key: 'onLike',
        value: function onLike(event) {
            event.stopPropagation();
            this.saveInterpretationLike(this.props.interpretation, true);
        }
    }, {
        key: 'onUnlike',
        value: function onUnlike(event) {
            event.stopPropagation();
            this.saveInterpretationLike(this.props.interpretation, false);
        }
    }, {
        key: 'onReply',
        value: function onReply() {
            var newComment = CommentModel.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment });
        }
    }, {
        key: 'onSaveInterpretation',
        value: function onSaveInterpretation(interpretation) {
            var _this3 = this;

            interpretation.save(this.context.d2).then(function () {
                return _this3.notifyChange(_this3.props.interpretation);
            });
            this.onCancelEditInterpretation();
        }
    }, {
        key: 'onDeleteInterpretation',
        value: function onDeleteInterpretation() {
            var _this4 = this;

            this.props.interpretation.delete(this.context.d2).then(function () {
                _this4.props.onSelect(null);
                _this4.notifyChange(null);
            });
        }
    }, {
        key: 'onEditInterpretation',
        value: function onEditInterpretation(event) {
            event.stopPropagation();
            this.setState({ interpretationToEdit: this.props.interpretation });
        }
    }, {
        key: 'onCancelEditInterpretation',
        value: function onCancelEditInterpretation() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var Interpretation = this.renderInterpretation();
            var Comments = this.renderComments();
            var SharingDialog = this.renderSharingDialog();
            var DeleteInterpretationDialog = this.renderDeleteInterpretationDialog();

            return React.createElement(
                Fragment,
                null,
                Interpretation,
                Comments,
                SharingDialog,
                DeleteInterpretationDialog
            );
        }
    }]);

    return Interpretation;
}(React.Component);

Interpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    extended: PropTypes.bool.isRequired
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string
};

export default withStyles(styles)(Interpretation);