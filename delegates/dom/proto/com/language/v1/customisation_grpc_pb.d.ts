// package: proto
// file: customisation.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as customisation_pb from "./customisation_pb";

interface IInstanceCustomisationPluginService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    updateRuntimeOptions: IInstanceCustomisationPluginService_IUpdateRuntimeOptions;
}

interface IInstanceCustomisationPluginService_IUpdateRuntimeOptions extends grpc.MethodDefinition<customisation_pb.UpdateRuntimeOptionsRequest, customisation_pb.UpdateRuntimeOptionsResponse> {
    path: "/proto.InstanceCustomisationPlugin/UpdateRuntimeOptions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<customisation_pb.UpdateRuntimeOptionsRequest>;
    requestDeserialize: grpc.deserialize<customisation_pb.UpdateRuntimeOptionsRequest>;
    responseSerialize: grpc.serialize<customisation_pb.UpdateRuntimeOptionsResponse>;
    responseDeserialize: grpc.deserialize<customisation_pb.UpdateRuntimeOptionsResponse>;
}

export const InstanceCustomisationPluginService: IInstanceCustomisationPluginService;

export interface IInstanceCustomisationPluginServer {
    updateRuntimeOptions: grpc.handleUnaryCall<customisation_pb.UpdateRuntimeOptionsRequest, customisation_pb.UpdateRuntimeOptionsResponse>;
}

export interface IInstanceCustomisationPluginClient {
    updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
}

export class InstanceCustomisationPluginClient extends grpc.Client implements IInstanceCustomisationPluginClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateRuntimeOptions(request: customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
}
