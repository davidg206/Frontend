// package: proto
// file: authentication.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as authentication_pb from "./authentication_pb";

interface IAuthenticationPluginService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    authenticate: IAuthenticationPluginService_IAuthenticate;
}

interface IAuthenticationPluginService_IAuthenticate extends grpc.MethodDefinition<authentication_pb.AuthenticationRequest, authentication_pb.AuthenticationResponse> {
    path: "/proto.AuthenticationPlugin/Authenticate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<authentication_pb.AuthenticationRequest>;
    requestDeserialize: grpc.deserialize<authentication_pb.AuthenticationRequest>;
    responseSerialize: grpc.serialize<authentication_pb.AuthenticationResponse>;
    responseDeserialize: grpc.deserialize<authentication_pb.AuthenticationResponse>;
}

export const AuthenticationPluginService: IAuthenticationPluginService;

export interface IAuthenticationPluginServer {
    authenticate: grpc.handleUnaryCall<authentication_pb.AuthenticationRequest, authentication_pb.AuthenticationResponse>;
}

export interface IAuthenticationPluginClient {
    authenticate(request: authentication_pb.AuthenticationRequest, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
}

export class AuthenticationPluginClient extends grpc.Client implements IAuthenticationPluginClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public authenticate(request: authentication_pb.AuthenticationRequest, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: authentication_pb.AuthenticationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: authentication_pb.AuthenticationResponse) => void): grpc.ClientUnaryCall;
}
