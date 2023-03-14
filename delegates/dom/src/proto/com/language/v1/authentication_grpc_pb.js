// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_language_v1_authentication_pb = require('../../../com/language/v1/authentication_pb.js');

function serialize_proto_AuthenticationRequest(arg) {
  if (!(arg instanceof com_language_v1_authentication_pb.AuthenticationRequest)) {
    throw new Error('Expected argument of type proto.AuthenticationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_AuthenticationRequest(buffer_arg) {
  return com_language_v1_authentication_pb.AuthenticationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_AuthenticationResponse(arg) {
  if (!(arg instanceof com_language_v1_authentication_pb.AuthenticationResponse)) {
    throw new Error('Expected argument of type proto.AuthenticationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_AuthenticationResponse(buffer_arg) {
  return com_language_v1_authentication_pb.AuthenticationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The interface implemented by Authentication Plugins
var AuthenticationPluginService = exports.AuthenticationPluginService = {
  // Attempts to authenticate a user
authenticate: {
    path: '/proto.AuthenticationPlugin/Authenticate',
    requestStream: false,
    responseStream: false,
    requestType: com_language_v1_authentication_pb.AuthenticationRequest,
    responseType: com_language_v1_authentication_pb.AuthenticationResponse,
    requestSerialize: serialize_proto_AuthenticationRequest,
    requestDeserialize: deserialize_proto_AuthenticationRequest,
    responseSerialize: serialize_proto_AuthenticationResponse,
    responseDeserialize: deserialize_proto_AuthenticationResponse,
  },
};

exports.AuthenticationPluginClient = grpc.makeGenericClientConstructor(AuthenticationPluginService);
