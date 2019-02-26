import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { pick, last } from 'lodash/fp';
import { apiFetch, apiFetchWithResponse } from '../api/api';
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
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2) {
                var modelId, modelName, isNewInterpretation, response, interpretationId, sharingUrl, sharingPayload, _sharingPayload, _sharingUrl;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                modelId = this._parent.id;
                                modelName = this._parent.modelDefinition.name;
                                isNewInterpretation = !this.id;

                                if (!isNewInterpretation) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.next = 6;
                                return apiFetchWithResponse(d2, '/interpretations/' + modelName + '/' + modelId, "POST", this.text);

                            case 6:
                                response = _context.sent;
                                interpretationId = getInterpretationIdFromResponse(response);
                                sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                                sharingPayload = this.sharing ? { object: this.sharing } : { object: pick(Interpretation.sharingFields, this._parent) };


                                this.sharing = null;
                                this.id = interpretationId;

                                return _context.abrupt('return', apiFetch(d2, sharingUrl, "PUT", sharingPayload));

                            case 15:
                                _context.next = 17;
                                return apiFetch(d2, '/interpretations/' + this.id, "PUT", this.text);

                            case 17:
                                if (!this.sharing) {
                                    _context.next = 22;
                                    break;
                                }

                                _sharingPayload = { object: _extends({}, this.sharing, { id: this.id }) };
                                _sharingUrl = '/sharing?type=interpretation&id=' + this.id;

                                this.sharing = null;

                                return _context.abrupt('return', apiFetch(d2, _sharingUrl, "PUT", _sharingPayload));

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'delete',
        value: function _delete(d2) {
            return apiFetch(d2, '/interpretations/' + this.id, "DELETE");
        }
    }, {
        key: 'like',
        value: function like(d2, value) {
            return apiFetch(d2, '/interpretations/' + this.id + '/like', value ? "POST" : "DELETE");
        }
    }]);

    return Interpretation;
}();

Interpretation.sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];
export default Interpretation;
;