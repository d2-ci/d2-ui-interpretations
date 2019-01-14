import isEqual from 'lodash/isEqual';

export var shouldUpdateSharing = function shouldUpdateSharing(sharingInfo, interpretation) {
    var externalAccess = !isEqual(sharingInfo.externalAccess, interpretation.externalAccess);
    var publicAccess = !isEqual(sharingInfo.publicAccess, interpretation.publicAccess);
    var userAccesses = !isEqual(sharingInfo.userAccesses || [], interpretation.userAccesses);
    var userGroupAccesses = !isEqual(sharingInfo.userGroupAccesses || [], interpretation.userGroupAccesses);

    return externalAccess || publicAccess || userAccesses || userGroupAccesses;
};