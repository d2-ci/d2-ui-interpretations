import _Object$assign from 'babel-runtime/core-js/object/assign';
import isEqual from 'lodash/isEqual';

export var shouldUpdateSharing = function shouldUpdateSharing(sharingInfo, interpretation) {
    var externalAccess = !isEqual(sharingInfo.externalAccess, interpretation.externalAccess);
    var publicAccess = !isEqual(sharingInfo.publicAccess, interpretation.publicAccess);
    var userAccesses = !isEqual(sharingInfo.userAccesses || [], interpretation.userAccesses);
    var userGroupAccesses = !isEqual(sharingInfo.userGroupAccesses || [], interpretation.userGroupAccesses);

    return externalAccess || publicAccess || userAccesses || userGroupAccesses;
};

export var getSharing = function getSharing(user, interpretation, model) {
    return {
        object: {
            user: { id: user.id, name: user.displayName },
            displayName: model.displayName,
            userAccesses: interpretation.userAccesses,
            userGroupAccesses: interpretation.userGroupAccesses,
            publicAccess: interpretation.publicAccess,
            externalAccess: interpretation.externalAccess,
            modelId: model.id
        },
        meta: {
            allowPublicAccess: model.publicAccess.includes('r'),
            allowExternalAccess: model.externalAccess
        }
    };
};

export var setInitialSharing = function setInitialSharing(user, object) {
    return {
        object: {
            user: { id: user.id, name: user.displayName },
            displayName: object.displayName,
            userAccesses: object.userAccesses.map(function (obj) {
                return _Object$assign({}, obj, { access: 'rw------' });
            }),
            userGroupAccesses: object.userGroupAccesses.map(function (obj) {
                return _Object$assign({}, obj, { access: 'rw------' });
            }),
            publicAccess: object.publicAccess.includes('r') ? 'rw------' : object.publicAccess,
            externalAccess: object.externalAccess,
            modelId: object.id
        },
        meta: {
            allowPublicAccess: object.publicAccess.includes('r'),
            allowExternalAccess: object.externalAccess
        }
    };
};