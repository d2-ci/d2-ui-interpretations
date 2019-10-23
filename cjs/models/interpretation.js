'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fp = require('lodash/fp');

var _api = require('../util/api');

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInterpretationIdFromResponse(response) {
    var location = response.headers.get('location');
    if (location) {
        return (0, _fp.last)(location.split('/'));
    } else {
        throw new Error("Could not get interpretation ID");
    }
}

var Interpretation = function () {
    function Interpretation(parent, attributes) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Interpretation);

        this._parent = parent;
        (0, _assign2.default)(this, attributes);
        this.comments = (attributes.comments || []).map(function (commentAttrs) {
            return new _comment2.default(_this, commentAttrs);
        });
    }

    (0, _createClass3.default)(Interpretation, [{
        key: 'save',
        value: function save() {
            var _this2 = this;

            var modelId = this._parent.id;
            var modelName = this._parent.modelDefinition.name;
            var isNewInterpretation = !this.id;

            if (isNewInterpretation) {
                // Set initial sharing of interpretation from the parent object
                var sharingPayload = { object: (0, _fp.pick)(Interpretation.sharingFields, this._parent) };

                return (0, _api.apiFetchWithResponse)('/interpretations/' + modelName + '/' + modelId, "POST", this.text).then(getInterpretationIdFromResponse).then(function (interpretationId) {
                    _this2.id = interpretationId;
                    var sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                    return (0, _api.apiFetch)(sharingUrl, "PUT", sharingPayload).then(function () {
                        return _this2;
                    });
                });
            } else {
                return (0, _api.apiFetch)('/interpretations/' + this.id, "PUT", this.text).then(function () {
                    return _this2;
                });
            }
        }
    }, {
        key: 'delete',
        value: function _delete() {
            return (0, _api.apiFetch)('/interpretations/' + this.id, "DELETE");
        }
    }, {
        key: 'like',
        value: function like(value) {
            return (0, _api.apiFetch)('/interpretations/' + this.id + '/like', value ? "POST" : "DELETE");
        }
    }]);
    return Interpretation;
}();

Interpretation.sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];
exports.default = Interpretation;