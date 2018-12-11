import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
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
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var modelId, modelName, isNewInterpretation, sharingPayload;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                modelId = this._parent.id;
                                modelName = this._parent.modelDefinition.name;
                                isNewInterpretation = !this.id;

                                if (!isNewInterpretation) {
                                    _context.next = 8;
                                    break;
                                }

                                // Set initial sharing of interpretation from the parent object
                                sharingPayload = { object: pick(Interpretation.sharingFields, this._parent) };
                                return _context.abrupt('return', apiFetchWithResponse('/interpretations/' + modelName + '/' + modelId, "POST", this.text).then(getInterpretationIdFromResponse).then(function (interpretationId) {
                                    _this2.id = interpretationId;
                                    var sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                                    return apiFetch(sharingUrl, "PUT", sharingPayload).then(function () {
                                        return _this2;
                                    });
                                }));

                            case 8:
                                return _context.abrupt('return', apiFetch('/interpretations/' + this.id, "PUT", this.text).then(function () {
                                    return _this2;
                                }));

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save() {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
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