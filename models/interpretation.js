import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { pick, last } from 'lodash/fp';
import { apiFetch, apiFetchWithResponse } from '../util/api';
import Comment from './comment';

function getInterpretationIdFromResponse(response) {
    var location = response.headers.get('location');
    if (location) {
        return last(location.split('/'));
    } else {
        throw new Error("Could not get interpretation ID");
    }
}

var Interpretation = function () {
    function Interpretation(parent, attributes) {
        var _this = this;

        _classCallCheck(this, Interpretation);

        this._parent = parent;
        _Object$assign(this, attributes);
        this.comments = (attributes.comments || []).map(function (commentAttrs) {
            return new Comment(_this, commentAttrs);
        });
    }

    _createClass(Interpretation, [{
        key: 'save',
        value: function save() {
            var _this2 = this;

            var modelId = this._parent.id;
            var modelName = this._parent.modelDefinition.name;
            var isNewInterpretation = !this.id;

            if (isNewInterpretation) {
                // Set initial sharing of interpretation from the parent object
                var sharingPayload = { object: pick(Interpretation.sharingFields, this._parent) };

                return apiFetchWithResponse('/interpretations/' + modelName + '/' + modelId, "POST", this.text).then(getInterpretationIdFromResponse).then(function (interpretationId) {
                    _this2.id = interpretationId;
                    var sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                    return apiFetch(sharingUrl, "PUT", sharingPayload).then(function () {
                        return _this2;
                    });
                });
            } else {
                return apiFetch('/interpretations/' + this.id, "PUT", this.text).then(function () {
                    return _this2;
                });
            }
        }
    }, {
        key: 'delete',
        value: function _delete() {
            return apiFetch('/interpretations/' + this.id, "DELETE");
        }
    }, {
        key: 'like',
        value: function like(value) {
            return apiFetch('/interpretations/' + this.id + '/like', value ? "POST" : "DELETE");
        }
    }]);

    return Interpretation;
}();

Interpretation.sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];
export default Interpretation;