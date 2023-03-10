// package: proto
// file: com/language/v1/customisation.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UpdateRuntimeOptionsRequest extends jspb.Message { 
    getInstance(): string;
    setInstance(value: string): UpdateRuntimeOptionsRequest;
    getPluginoptions(): string;
    setPluginoptions(value: string): UpdateRuntimeOptionsRequest;

    hasRuntimeoptions(): boolean;
    clearRuntimeoptions(): void;
    getRuntimeoptions(): RuntimeOptions | undefined;
    setRuntimeoptions(value?: RuntimeOptions): UpdateRuntimeOptionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateRuntimeOptionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateRuntimeOptionsRequest): UpdateRuntimeOptionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateRuntimeOptionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateRuntimeOptionsRequest;
    static deserializeBinaryFromReader(message: UpdateRuntimeOptionsRequest, reader: jspb.BinaryReader): UpdateRuntimeOptionsRequest;
}

export namespace UpdateRuntimeOptionsRequest {
    export type AsObject = {
        instance: string,
        pluginoptions: string,
        runtimeoptions?: RuntimeOptions.AsObject,
    }
}

export class UpdateRuntimeOptionsResponse extends jspb.Message { 

    hasRuntimeoptions(): boolean;
    clearRuntimeoptions(): void;
    getRuntimeoptions(): RuntimeOptions | undefined;
    setRuntimeoptions(value?: RuntimeOptions): UpdateRuntimeOptionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateRuntimeOptionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateRuntimeOptionsResponse): UpdateRuntimeOptionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateRuntimeOptionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateRuntimeOptionsResponse;
    static deserializeBinaryFromReader(message: UpdateRuntimeOptionsResponse, reader: jspb.BinaryReader): UpdateRuntimeOptionsResponse;
}

export namespace UpdateRuntimeOptionsResponse {
    export type AsObject = {
        runtimeoptions?: RuntimeOptions.AsObject,
    }
}

export class RuntimeOptions extends jspb.Message { 

    hasResolution(): boolean;
    clearResolution(): void;
    getResolution(): RuntimeOptions.Resolution | undefined;
    setResolution(value?: RuntimeOptions.Resolution): RuntimeOptions;
    clearArgsList(): void;
    getArgsList(): Array<string>;
    setArgsList(value: Array<string>): RuntimeOptions;
    addArgs(value: string, index?: number): string;

    getEnvironmentvariablesMap(): jspb.Map<string, string>;
    clearEnvironmentvariablesMap(): void;
    clearVolumemountsList(): void;
    getVolumemountsList(): Array<RuntimeOptions.VolumeMounts>;
    setVolumemountsList(value: Array<RuntimeOptions.VolumeMounts>): RuntimeOptions;
    addVolumemounts(value?: RuntimeOptions.VolumeMounts, index?: number): RuntimeOptions.VolumeMounts;

    hasPixelstreaming(): boolean;
    clearPixelstreaming(): void;
    getPixelstreaming(): RuntimeOptions.PixelStreaming | undefined;
    setPixelstreaming(value?: RuntimeOptions.PixelStreaming): RuntimeOptions;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RuntimeOptions.AsObject;
    static toObject(includeInstance: boolean, msg: RuntimeOptions): RuntimeOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RuntimeOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RuntimeOptions;
    static deserializeBinaryFromReader(message: RuntimeOptions, reader: jspb.BinaryReader): RuntimeOptions;
}

export namespace RuntimeOptions {
    export type AsObject = {
        resolution?: RuntimeOptions.Resolution.AsObject,
        argsList: Array<string>,

        environmentvariablesMap: Array<[string, string]>,
        volumemountsList: Array<RuntimeOptions.VolumeMounts.AsObject>,
        pixelstreaming?: RuntimeOptions.PixelStreaming.AsObject,
    }


    export class Resolution extends jspb.Message { 
        getX(): number;
        setX(value: number): Resolution;
        getY(): number;
        setY(value: number): Resolution;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Resolution.AsObject;
        static toObject(includeInstance: boolean, msg: Resolution): Resolution.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Resolution, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Resolution;
        static deserializeBinaryFromReader(message: Resolution, reader: jspb.BinaryReader): Resolution;
    }

    export namespace Resolution {
        export type AsObject = {
            x: number,
            y: number,
        }
    }

    export class PixelStreaming extends jspb.Message { 

        hasWebrtc(): boolean;
        clearWebrtc(): void;
        getWebrtc(): RuntimeOptions.PixelStreaming.WebRTC | undefined;
        setWebrtc(value?: RuntimeOptions.PixelStreaming.WebRTC): PixelStreaming;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PixelStreaming.AsObject;
        static toObject(includeInstance: boolean, msg: PixelStreaming): PixelStreaming.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PixelStreaming, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PixelStreaming;
        static deserializeBinaryFromReader(message: PixelStreaming, reader: jspb.BinaryReader): PixelStreaming;
    }

    export namespace PixelStreaming {
        export type AsObject = {
            webrtc?: RuntimeOptions.PixelStreaming.WebRTC.AsObject,
        }


        export class WebRTC extends jspb.Message { 
            getMaxfps(): number;
            setMaxfps(value: number): WebRTC;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): WebRTC.AsObject;
            static toObject(includeInstance: boolean, msg: WebRTC): WebRTC.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: WebRTC, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): WebRTC;
            static deserializeBinaryFromReader(message: WebRTC, reader: jspb.BinaryReader): WebRTC;
        }

        export namespace WebRTC {
            export type AsObject = {
                maxfps: number,
            }
        }

    }

    export class VolumeMounts extends jspb.Message { 
        getName(): string;
        setName(value: string): VolumeMounts;
        getMountpath(): string;
        setMountpath(value: string): VolumeMounts;
        getReadonly(): boolean;
        setReadonly(value: boolean): VolumeMounts;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): VolumeMounts.AsObject;
        static toObject(includeInstance: boolean, msg: VolumeMounts): VolumeMounts.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: VolumeMounts, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): VolumeMounts;
        static deserializeBinaryFromReader(message: VolumeMounts, reader: jspb.BinaryReader): VolumeMounts;
    }

    export namespace VolumeMounts {
        export type AsObject = {
            name: string,
            mountpath: string,
            readonly: boolean,
        }
    }

}
