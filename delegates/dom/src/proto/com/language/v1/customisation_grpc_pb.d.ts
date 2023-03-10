// package: proto
// file: com/language/v1/customisation.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_language_v1_customisation_pb from "../../../com/language/v1/customisation_pb";

interface IInstanceCustomisationPluginService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    updateRuntimeOptions: IInstanceCustomisationPluginService_IUpdateRuntimeOptions;
}

interface IInstanceCustomisationPluginService_IUpdateRuntimeOptions extends grpc.MethodDefinition<com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse> {
    path: "/proto.InstanceCustomisationPlugin/UpdateRuntimeOptions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest>;
    requestDeserialize: grpc.deserialize<com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest>;
    responseSerialize: grpc.serialize<com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse>;
    responseDeserialize: grpc.deserialize<com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse>;
}

export const InstanceCustomisationPluginService: IInstanceCustomisationPluginService;

export interface IInstanceCustomisationPluginServer extends grpc.UntypedServiceImplementation {
    updateRuntimeOptions: grpc.handleUnaryCall<com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse>;
}

export interface IInstanceCustomisationPluginClient {
    updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
}

export class InstanceCustomisationPluginClient extends grpc.Client implements IInstanceCustomisationPluginClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateRuntimeOptions(request: com_language_v1_customisation_pb.UpdateRuntimeOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_language_v1_customisation_pb.UpdateRuntimeOptionsResponse) => void): grpc.ClientUnaryCall;
}
