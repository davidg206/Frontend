// package: proto
// file: com/language/v1/authentication.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_language_v1_authentication_pb from "../../../com/language/v1/authentication_pb";

interface IAuthenticationPluginService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    authenticate: IAuthenticationPluginService_IAuthenticate;
}

interface IAuthenticationPluginService_IAuthenticate extends grpc.MethodDefinition<com_language_v1_authentication_pb.AuthenticationRequest, com_language_v1_authentication_pb.AuthenticationResponse> {
    path: "/proto.AuthenticationPlugin/Authenticate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_language_v1_authentication_pb.AuthenticationRequest>;
    requestDeserialize: grpc.deserialize<com_language_v1_authentication_pb.AuthenticationRequest>;
    responseSerialize: grpc.serialize<com_language_v1_authentication_pb.AuthenticationResponse>;
    responseDeserialize: grpc.deserialize<com_language_v1_authentication_pb.AuthenticationResponse>;
}

export const AuthenticationPluginService: IAuthenticationPluginService;

export interface IAuthenticationPluginServer extends grpc.UntypedServiceImplementation {
    authenticate: grpc.handleUnaryCall<com_language_v1_authentication_pb.AuthenticationRequest, com_language_v1_authentication_pb.AuthenticationResponse>;
}

export interface IAuthenticationPluginClient {
    authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
}

export class AuthenticationPluginClient extends grpc.Client implements IAuthenticationPluginClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: com_language_v1_authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_language_v1_authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
}
