"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userCanManage = exports.userCanManage = function userCanManage(d2, object) {
    var _ref = d2 || {},
        currentUser = _ref.currentUser;

    if (!object || !object.user || !currentUser) {
        return false;
    } else if (object.user.id === currentUser.id) {
        return true;
    } else if (currentUser.authorities.has("ALL")) {
        return true;
    } else {
        return false;
    }
};