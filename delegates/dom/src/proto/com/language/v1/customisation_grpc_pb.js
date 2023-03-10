// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_language_v1_customisation_pb = require('../../../com/language/v1/customisation_pb.js');

function serialize_proto_UpdateRuntimeOptionsRequest(arg) {
  if (!(arg instanceof com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest)) {
    throw new Error('Expected argument of type proto.UpdateRuntimeOptionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_UpdateRuntimeOptionsRequest(buffer_arg) {
  return com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_UpdateRuntimeOptionsResponse(arg) {
  if (!(arg instanceof com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse)) {
    throw new Error('Expected argument of type proto.UpdateRuntimeOptionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_UpdateRuntimeOptionsResponse(buffer_arg) {
  return com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The interface implemented by Instance Customisation Plugins
var InstanceCustomisationPluginService = exports.InstanceCustomisationPluginService = {
  // Applies modifications to the runtime options for a given instance of a Pixel Streaming application
updateRuntimeOptions: {
    path: '/proto.InstanceCustomisationPlugin/UpdateRuntimeOptions',
    requestStream: false,
    responseStream: false,
    requestType: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest,
    responseType: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse,
    requestSerialize: serialize_proto_UpdateRuntimeOptionsRequest,
    requestDeserialize: deserialize_proto_UpdateRuntimeOptionsRequest,
    responseSerialize: serialize_proto_UpdateRuntimeOptionsResponse,
    responseDeserialize: deserialize_proto_UpdateRuntimeOptionsResponse,
  },
};

exports.InstanceCustomisationPluginClient = grpc.makeGenericClientConstructor(InstanceCustomisationPluginService);
