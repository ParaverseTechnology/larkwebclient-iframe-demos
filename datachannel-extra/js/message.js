/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.pxyproto = (function() {
    
        /**
         * Namespace pxyproto.
         * @exports pxyproto
         * @namespace
         */
        var pxyproto = {};
    
        /**
         * CONTROL_MSG_TYPE enum.
         * @name pxyproto.CONTROL_MSG_TYPE
         * @enum {string}
         * @property {number} MSG_HELLO=0 MSG_HELLO value
         * @property {number} MSG_PING=1 MSG_PING value
         * @property {number} MSG_PONG=2 MSG_PONG value
         */
        pxyproto.CONTROL_MSG_TYPE = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MSG_HELLO"] = 0;
            values[valuesById[1] = "MSG_PING"] = 1;
            values[valuesById[2] = "MSG_PONG"] = 2;
            return values;
        })();
    
        pxyproto.ControlMessage = (function() {
    
            /**
             * Properties of a ControlMessage.
             * @memberof pxyproto
             * @interface IControlMessage
             * @property {pxyproto.CONTROL_MSG_TYPE|null} [type] ControlMessage type
             */
    
            /**
             * Constructs a new ControlMessage.
             * @memberof pxyproto
             * @classdesc Represents a ControlMessage.
             * @implements IControlMessage
             * @constructor
             * @param {pxyproto.IControlMessage=} [properties] Properties to set
             */
            function ControlMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ControlMessage type.
             * @member {pxyproto.CONTROL_MSG_TYPE} type
             * @memberof pxyproto.ControlMessage
             * @instance
             */
            ControlMessage.prototype.type = 0;
    
            /**
             * Creates a new ControlMessage instance using the specified properties.
             * @function create
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {pxyproto.IControlMessage=} [properties] Properties to set
             * @returns {pxyproto.ControlMessage} ControlMessage instance
             */
            ControlMessage.create = function create(properties) {
                return new ControlMessage(properties);
            };
    
            /**
             * Encodes the specified ControlMessage message. Does not implicitly {@link pxyproto.ControlMessage.verify|verify} messages.
             * @function encode
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {pxyproto.IControlMessage} message ControlMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ControlMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                return writer;
            };
    
            /**
             * Encodes the specified ControlMessage message, length delimited. Does not implicitly {@link pxyproto.ControlMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {pxyproto.IControlMessage} message ControlMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ControlMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ControlMessage message from the specified reader or buffer.
             * @function decode
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pxyproto.ControlMessage} ControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ControlMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pxyproto.ControlMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ControlMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pxyproto.ControlMessage} ControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ControlMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ControlMessage message.
             * @function verify
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ControlMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a ControlMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pxyproto.ControlMessage} ControlMessage
             */
            ControlMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.pxyproto.ControlMessage)
                    return object;
                var message = new $root.pxyproto.ControlMessage();
                switch (object.type) {
                case "MSG_HELLO":
                case 0:
                    message.type = 0;
                    break;
                case "MSG_PING":
                case 1:
                    message.type = 1;
                    break;
                case "MSG_PONG":
                case 2:
                    message.type = 2;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ControlMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pxyproto.ControlMessage
             * @static
             * @param {pxyproto.ControlMessage} message ControlMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ControlMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.type = options.enums === String ? "MSG_HELLO" : 0;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.pxyproto.CONTROL_MSG_TYPE[message.type] : message.type;
                return object;
            };
    
            /**
             * Converts this ControlMessage to JSON.
             * @function toJSON
             * @memberof pxyproto.ControlMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ControlMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ControlMessage;
        })();
    
        pxyproto.DataMessage = (function() {
    
            /**
             * Properties of a DataMessage.
             * @memberof pxyproto
             * @interface IDataMessage
             * @property {Uint8Array|null} [data] DataMessage data
             */
    
            /**
             * Constructs a new DataMessage.
             * @memberof pxyproto
             * @classdesc Represents a DataMessage.
             * @implements IDataMessage
             * @constructor
             * @param {pxyproto.IDataMessage=} [properties] Properties to set
             */
            function DataMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DataMessage data.
             * @member {Uint8Array} data
             * @memberof pxyproto.DataMessage
             * @instance
             */
            DataMessage.prototype.data = $util.newBuffer([]);
    
            /**
             * Creates a new DataMessage instance using the specified properties.
             * @function create
             * @memberof pxyproto.DataMessage
             * @static
             * @param {pxyproto.IDataMessage=} [properties] Properties to set
             * @returns {pxyproto.DataMessage} DataMessage instance
             */
            DataMessage.create = function create(properties) {
                return new DataMessage(properties);
            };
    
            /**
             * Encodes the specified DataMessage message. Does not implicitly {@link pxyproto.DataMessage.verify|verify} messages.
             * @function encode
             * @memberof pxyproto.DataMessage
             * @static
             * @param {pxyproto.IDataMessage} message DataMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };
    
            /**
             * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link pxyproto.DataMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pxyproto.DataMessage
             * @static
             * @param {pxyproto.IDataMessage} message DataMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DataMessage message from the specified reader or buffer.
             * @function decode
             * @memberof pxyproto.DataMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pxyproto.DataMessage} DataMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pxyproto.DataMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DataMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pxyproto.DataMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pxyproto.DataMessage} DataMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DataMessage message.
             * @function verify
             * @memberof pxyproto.DataMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DataMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };
    
            /**
             * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pxyproto.DataMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pxyproto.DataMessage} DataMessage
             */
            DataMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.pxyproto.DataMessage)
                    return object;
                var message = new $root.pxyproto.DataMessage();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };
    
            /**
             * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pxyproto.DataMessage
             * @static
             * @param {pxyproto.DataMessage} message DataMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DataMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };
    
            /**
             * Converts this DataMessage to JSON.
             * @function toJSON
             * @memberof pxyproto.DataMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DataMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DataMessage;
        })();
    
        pxyproto.Message = (function() {
    
            /**
             * Properties of a Message.
             * @memberof pxyproto
             * @interface IMessage
             * @property {pxyproto.IControlMessage|null} [controlMsg] Message controlMsg
             * @property {pxyproto.IDataMessage|null} [dataMsg] Message dataMsg
             */
    
            /**
             * Constructs a new Message.
             * @memberof pxyproto
             * @classdesc Represents a Message.
             * @implements IMessage
             * @constructor
             * @param {pxyproto.IMessage=} [properties] Properties to set
             */
            function Message(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Message controlMsg.
             * @member {pxyproto.IControlMessage|null|undefined} controlMsg
             * @memberof pxyproto.Message
             * @instance
             */
            Message.prototype.controlMsg = null;
    
            /**
             * Message dataMsg.
             * @member {pxyproto.IDataMessage|null|undefined} dataMsg
             * @memberof pxyproto.Message
             * @instance
             */
            Message.prototype.dataMsg = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Message msg.
             * @member {"controlMsg"|"dataMsg"|undefined} msg
             * @memberof pxyproto.Message
             * @instance
             */
            Object.defineProperty(Message.prototype, "msg", {
                get: $util.oneOfGetter($oneOfFields = ["controlMsg", "dataMsg"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new Message instance using the specified properties.
             * @function create
             * @memberof pxyproto.Message
             * @static
             * @param {pxyproto.IMessage=} [properties] Properties to set
             * @returns {pxyproto.Message} Message instance
             */
            Message.create = function create(properties) {
                return new Message(properties);
            };
    
            /**
             * Encodes the specified Message message. Does not implicitly {@link pxyproto.Message.verify|verify} messages.
             * @function encode
             * @memberof pxyproto.Message
             * @static
             * @param {pxyproto.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.controlMsg != null && message.hasOwnProperty("controlMsg"))
                    $root.pxyproto.ControlMessage.encode(message.controlMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.dataMsg != null && message.hasOwnProperty("dataMsg"))
                    $root.pxyproto.DataMessage.encode(message.dataMsg, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link pxyproto.Message.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pxyproto.Message
             * @static
             * @param {pxyproto.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Message message from the specified reader or buffer.
             * @function decode
             * @memberof pxyproto.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pxyproto.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pxyproto.Message();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.controlMsg = $root.pxyproto.ControlMessage.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.dataMsg = $root.pxyproto.DataMessage.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pxyproto.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pxyproto.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Message message.
             * @function verify
             * @memberof pxyproto.Message
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Message.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.controlMsg != null && message.hasOwnProperty("controlMsg")) {
                    properties.msg = 1;
                    {
                        var error = $root.pxyproto.ControlMessage.verify(message.controlMsg);
                        if (error)
                            return "controlMsg." + error;
                    }
                }
                if (message.dataMsg != null && message.hasOwnProperty("dataMsg")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.pxyproto.DataMessage.verify(message.dataMsg);
                        if (error)
                            return "dataMsg." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pxyproto.Message
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pxyproto.Message} Message
             */
            Message.fromObject = function fromObject(object) {
                if (object instanceof $root.pxyproto.Message)
                    return object;
                var message = new $root.pxyproto.Message();
                if (object.controlMsg != null) {
                    if (typeof object.controlMsg !== "object")
                        throw TypeError(".pxyproto.Message.controlMsg: object expected");
                    message.controlMsg = $root.pxyproto.ControlMessage.fromObject(object.controlMsg);
                }
                if (object.dataMsg != null) {
                    if (typeof object.dataMsg !== "object")
                        throw TypeError(".pxyproto.Message.dataMsg: object expected");
                    message.dataMsg = $root.pxyproto.DataMessage.fromObject(object.dataMsg);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pxyproto.Message
             * @static
             * @param {pxyproto.Message} message Message
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Message.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.controlMsg != null && message.hasOwnProperty("controlMsg")) {
                    object.controlMsg = $root.pxyproto.ControlMessage.toObject(message.controlMsg, options);
                    if (options.oneofs)
                        object.msg = "controlMsg";
                }
                if (message.dataMsg != null && message.hasOwnProperty("dataMsg")) {
                    object.dataMsg = $root.pxyproto.DataMessage.toObject(message.dataMsg, options);
                    if (options.oneofs)
                        object.msg = "dataMsg";
                }
                return object;
            };
    
            /**
             * Converts this Message to JSON.
             * @function toJSON
             * @memberof pxyproto.Message
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Message.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Message;
        })();
    
        return pxyproto;
    })();

    return $root;
})(protobuf);
