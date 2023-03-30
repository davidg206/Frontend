// package: proto
// file: authentication.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AuthenticationRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): AuthenticationRequest;
    getProvider(): string;
    setProvider(value: string): AuthenticationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticationRequest): AuthenticationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticationRequest;
    static deserializeBinaryFromReader(message: AuthenticationRequest, reader: jspb.BinaryReader): AuthenticationRequest;
}

export namespace AuthenticationRequest {
    export type AsObject = {
        token: string,
        provider: string,
    }
}

export class AuthenticationResponse extends jspb.Message { 
    getOutcome(): AuthenticationResponse.Outcome;
    setOutcome(value: AuthenticationResponse.Outcome): AuthenticationResponse;

    hasUrl(): boolean;
    clearUrl(): void;
    getUrl(): string;
    setUrl(value: string): AuthenticationResponse;

    hasId(): boolean;
    clearId(): void;
    getId(): string;
    setId(value: string): AuthenticationResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): string;
    setError(value: string): AuthenticationResponse;

    getPayloadCase(): AuthenticationResponse.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticationResponse): AuthenticationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticationResponse;
    static deserializeBinaryFromReader(message: AuthenticationResponse, reader: jspb.BinaryReader): AuthenticationResponse;
}

export namespace AuthenticationResponse {
    export type AsObject = {
        outcome: AuthenticationResponse.Outcome,
        url: string,
        id: string,
        error: string,
    }

    export enum Outcome {
    REDIRECT = 0,
    INVALID_TOKEN = 1,
    AUTHENTICATED = 2,
    ERROR = 3,
    }


    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        URL = 2,
        ID = 3,
        ERROR = 4,
    }

}
