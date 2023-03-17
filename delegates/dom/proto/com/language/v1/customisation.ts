/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export interface UpdateRuntimeOptionsRequest {
  /** The ID of the application instance for which the runtime options are being modified */
  instance: string;
  /** An opaque string representing optional configuration data to pass to the Instance Customisation Plugin */
  pluginOptions: string;
  /** The incoming RuntimeOptions object that will be modified and sent back */
  runtimeOptions: RuntimeOptions | undefined;
}

export interface UpdateRuntimeOptionsResponse {
  /** The modified RuntimeOptions object */
  runtimeOptions: RuntimeOptions | undefined;
}

/** Specifics about how this instance of the Pixel Streaming application should handle its runtime options (resolution, args) */
export interface RuntimeOptions {
  /** The ResX and ResY arguments to be set */
  resolution:
    | RuntimeOptions_Resolution
    | undefined;
  /**
   * The current args that are being applied to a UE application. This should include any that SPS applies by default as well
   * as any that are applied via the runtime args when creating the application via the REST API
   */
  args: string[];
  /** Map of Environment Vars */
  environmentVariables: { [key: string]: string };
  /** A list of Kubernetes volumes to mount to the UE application pod */
  volumeMounts: RuntimeOptions_VolumeMounts[];
  /** Changing the following settings will configure the Pixel Streaming Plugin */
  pixelStreaming: RuntimeOptions_PixelStreaming | undefined;
}

export interface RuntimeOptions_Resolution {
  /** The number of pixels in the X axis for the resolution */
  x: number;
  /** The number of pixels in the Y axis for the resolution */
  y: number;
}

export interface RuntimeOptions_PixelStreaming {
  /** Changing the following settings will configure the WebRTC library that the Pixel Streaming Plugin uses internally */
  webRTC: RuntimeOptions_PixelStreaming_WebRTC | undefined;
}

export interface RuntimeOptions_PixelStreaming_WebRTC {
  /** The maximum FPS WebRTC will try to capture/encode/transmit. */
  maxFPS: number;
}

export interface RuntimeOptions_EnvironmentVariablesEntry {
  key: string;
  value: string;
}

export interface RuntimeOptions_VolumeMounts {
  /** The name of the Persistent Volume Claim */
  name: string;
  /** The path to mount in the container */
  mountPath: string;
  /** Whether to mount the path as read-only */
  readOnly: boolean;
}

function createBaseUpdateRuntimeOptionsRequest(): UpdateRuntimeOptionsRequest {
  return { instance: "", pluginOptions: "", runtimeOptions: undefined };
}

export const UpdateRuntimeOptionsRequest = {
  encode(message: UpdateRuntimeOptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instance !== "") {
      writer.uint32(10).string(message.instance);
    }
    if (message.pluginOptions !== "") {
      writer.uint32(18).string(message.pluginOptions);
    }
    if (message.runtimeOptions !== undefined) {
      RuntimeOptions.encode(message.runtimeOptions, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRuntimeOptionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRuntimeOptionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.instance = reader.string();
          break;
        case 2:
          message.pluginOptions = reader.string();
          break;
        case 3:
          message.runtimeOptions = RuntimeOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRuntimeOptionsRequest {
    return {
      instance: isSet(object.instance) ? String(object.instance) : "",
      pluginOptions: isSet(object.pluginOptions) ? String(object.pluginOptions) : "",
      runtimeOptions: isSet(object.runtimeOptions) ? RuntimeOptions.fromJSON(object.runtimeOptions) : undefined,
    };
  },

  toJSON(message: UpdateRuntimeOptionsRequest): unknown {
    const obj: any = {};
    message.instance !== undefined && (obj.instance = message.instance);
    message.pluginOptions !== undefined && (obj.pluginOptions = message.pluginOptions);
    message.runtimeOptions !== undefined &&
      (obj.runtimeOptions = message.runtimeOptions ? RuntimeOptions.toJSON(message.runtimeOptions) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRuntimeOptionsRequest>, I>>(base?: I): UpdateRuntimeOptionsRequest {
    return UpdateRuntimeOptionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateRuntimeOptionsRequest>, I>>(object: I): UpdateRuntimeOptionsRequest {
    const message = createBaseUpdateRuntimeOptionsRequest();
    message.instance = object.instance ?? "";
    message.pluginOptions = object.pluginOptions ?? "";
    message.runtimeOptions = (object.runtimeOptions !== undefined && object.runtimeOptions !== null)
      ? RuntimeOptions.fromPartial(object.runtimeOptions)
      : undefined;
    return message;
  },
};

function createBaseUpdateRuntimeOptionsResponse(): UpdateRuntimeOptionsResponse {
  return { runtimeOptions: undefined };
}

export const UpdateRuntimeOptionsResponse = {
  encode(message: UpdateRuntimeOptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.runtimeOptions !== undefined) {
      RuntimeOptions.encode(message.runtimeOptions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRuntimeOptionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRuntimeOptionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.runtimeOptions = RuntimeOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRuntimeOptionsResponse {
    return {
      runtimeOptions: isSet(object.runtimeOptions) ? RuntimeOptions.fromJSON(object.runtimeOptions) : undefined,
    };
  },

  toJSON(message: UpdateRuntimeOptionsResponse): unknown {
    const obj: any = {};
    message.runtimeOptions !== undefined &&
      (obj.runtimeOptions = message.runtimeOptions ? RuntimeOptions.toJSON(message.runtimeOptions) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRuntimeOptionsResponse>, I>>(base?: I): UpdateRuntimeOptionsResponse {
    return UpdateRuntimeOptionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateRuntimeOptionsResponse>, I>>(object: I): UpdateRuntimeOptionsResponse {
    const message = createBaseUpdateRuntimeOptionsResponse();
    message.runtimeOptions = (object.runtimeOptions !== undefined && object.runtimeOptions !== null)
      ? RuntimeOptions.fromPartial(object.runtimeOptions)
      : undefined;
    return message;
  },
};

function createBaseRuntimeOptions(): RuntimeOptions {
  return { resolution: undefined, args: [], environmentVariables: {}, volumeMounts: [], pixelStreaming: undefined };
}

export const RuntimeOptions = {
  encode(message: RuntimeOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resolution !== undefined) {
      RuntimeOptions_Resolution.encode(message.resolution, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.args) {
      writer.uint32(18).string(v!);
    }
    Object.entries(message.environmentVariables).forEach(([key, value]) => {
      RuntimeOptions_EnvironmentVariablesEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    for (const v of message.volumeMounts) {
      RuntimeOptions_VolumeMounts.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.pixelStreaming !== undefined) {
      RuntimeOptions_PixelStreaming.encode(message.pixelStreaming, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resolution = RuntimeOptions_Resolution.decode(reader, reader.uint32());
          break;
        case 2:
          message.args.push(reader.string());
          break;
        case 3:
          const entry3 = RuntimeOptions_EnvironmentVariablesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.environmentVariables[entry3.key] = entry3.value;
          }
          break;
        case 4:
          message.volumeMounts.push(RuntimeOptions_VolumeMounts.decode(reader, reader.uint32()));
          break;
        case 5:
          message.pixelStreaming = RuntimeOptions_PixelStreaming.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions {
    return {
      resolution: isSet(object.resolution) ? RuntimeOptions_Resolution.fromJSON(object.resolution) : undefined,
      args: Array.isArray(object?.args) ? object.args.map((e: any) => String(e)) : [],
      environmentVariables: isObject(object.environmentVariables)
        ? Object.entries(object.environmentVariables).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      volumeMounts: Array.isArray(object?.volumeMounts)
        ? object.volumeMounts.map((e: any) => RuntimeOptions_VolumeMounts.fromJSON(e))
        : [],
      pixelStreaming: isSet(object.pixelStreaming)
        ? RuntimeOptions_PixelStreaming.fromJSON(object.pixelStreaming)
        : undefined,
    };
  },

  toJSON(message: RuntimeOptions): unknown {
    const obj: any = {};
    message.resolution !== undefined &&
      (obj.resolution = message.resolution ? RuntimeOptions_Resolution.toJSON(message.resolution) : undefined);
    if (message.args) {
      obj.args = message.args.map((e) => e);
    } else {
      obj.args = [];
    }
    obj.environmentVariables = {};
    if (message.environmentVariables) {
      Object.entries(message.environmentVariables).forEach(([k, v]) => {
        obj.environmentVariables[k] = v;
      });
    }
    if (message.volumeMounts) {
      obj.volumeMounts = message.volumeMounts.map((e) => e ? RuntimeOptions_VolumeMounts.toJSON(e) : undefined);
    } else {
      obj.volumeMounts = [];
    }
    message.pixelStreaming !== undefined && (obj.pixelStreaming = message.pixelStreaming
      ? RuntimeOptions_PixelStreaming.toJSON(message.pixelStreaming)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions>, I>>(base?: I): RuntimeOptions {
    return RuntimeOptions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions>, I>>(object: I): RuntimeOptions {
    const message = createBaseRuntimeOptions();
    message.resolution = (object.resolution !== undefined && object.resolution !== null)
      ? RuntimeOptions_Resolution.fromPartial(object.resolution)
      : undefined;
    message.args = object.args?.map((e) => e) || [];
    message.environmentVariables = Object.entries(object.environmentVariables ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.volumeMounts = object.volumeMounts?.map((e) => RuntimeOptions_VolumeMounts.fromPartial(e)) || [];
    message.pixelStreaming = (object.pixelStreaming !== undefined && object.pixelStreaming !== null)
      ? RuntimeOptions_PixelStreaming.fromPartial(object.pixelStreaming)
      : undefined;
    return message;
  },
};

function createBaseRuntimeOptions_Resolution(): RuntimeOptions_Resolution {
  return { x: 0, y: 0 };
}

export const RuntimeOptions_Resolution = {
  encode(message: RuntimeOptions_Resolution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(8).int32(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(16).int32(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions_Resolution {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions_Resolution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.int32();
          break;
        case 2:
          message.y = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions_Resolution {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: RuntimeOptions_Resolution): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = Math.round(message.x));
    message.y !== undefined && (obj.y = Math.round(message.y));
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions_Resolution>, I>>(base?: I): RuntimeOptions_Resolution {
    return RuntimeOptions_Resolution.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions_Resolution>, I>>(object: I): RuntimeOptions_Resolution {
    const message = createBaseRuntimeOptions_Resolution();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseRuntimeOptions_PixelStreaming(): RuntimeOptions_PixelStreaming {
  return { webRTC: undefined };
}

export const RuntimeOptions_PixelStreaming = {
  encode(message: RuntimeOptions_PixelStreaming, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.webRTC !== undefined) {
      RuntimeOptions_PixelStreaming_WebRTC.encode(message.webRTC, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions_PixelStreaming {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions_PixelStreaming();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.webRTC = RuntimeOptions_PixelStreaming_WebRTC.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions_PixelStreaming {
    return { webRTC: isSet(object.webRTC) ? RuntimeOptions_PixelStreaming_WebRTC.fromJSON(object.webRTC) : undefined };
  },

  toJSON(message: RuntimeOptions_PixelStreaming): unknown {
    const obj: any = {};
    message.webRTC !== undefined &&
      (obj.webRTC = message.webRTC ? RuntimeOptions_PixelStreaming_WebRTC.toJSON(message.webRTC) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions_PixelStreaming>, I>>(base?: I): RuntimeOptions_PixelStreaming {
    return RuntimeOptions_PixelStreaming.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions_PixelStreaming>, I>>(
    object: I,
  ): RuntimeOptions_PixelStreaming {
    const message = createBaseRuntimeOptions_PixelStreaming();
    message.webRTC = (object.webRTC !== undefined && object.webRTC !== null)
      ? RuntimeOptions_PixelStreaming_WebRTC.fromPartial(object.webRTC)
      : undefined;
    return message;
  },
};

function createBaseRuntimeOptions_PixelStreaming_WebRTC(): RuntimeOptions_PixelStreaming_WebRTC {
  return { maxFPS: 0 };
}

export const RuntimeOptions_PixelStreaming_WebRTC = {
  encode(message: RuntimeOptions_PixelStreaming_WebRTC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxFPS !== 0) {
      writer.uint32(8).int64(message.maxFPS);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions_PixelStreaming_WebRTC {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions_PixelStreaming_WebRTC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxFPS = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions_PixelStreaming_WebRTC {
    return { maxFPS: isSet(object.maxFPS) ? Number(object.maxFPS) : 0 };
  },

  toJSON(message: RuntimeOptions_PixelStreaming_WebRTC): unknown {
    const obj: any = {};
    message.maxFPS !== undefined && (obj.maxFPS = Math.round(message.maxFPS));
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions_PixelStreaming_WebRTC>, I>>(
    base?: I,
  ): RuntimeOptions_PixelStreaming_WebRTC {
    return RuntimeOptions_PixelStreaming_WebRTC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions_PixelStreaming_WebRTC>, I>>(
    object: I,
  ): RuntimeOptions_PixelStreaming_WebRTC {
    const message = createBaseRuntimeOptions_PixelStreaming_WebRTC();
    message.maxFPS = object.maxFPS ?? 0;
    return message;
  },
};

function createBaseRuntimeOptions_EnvironmentVariablesEntry(): RuntimeOptions_EnvironmentVariablesEntry {
  return { key: "", value: "" };
}

export const RuntimeOptions_EnvironmentVariablesEntry = {
  encode(message: RuntimeOptions_EnvironmentVariablesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions_EnvironmentVariablesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions_EnvironmentVariablesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions_EnvironmentVariablesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: RuntimeOptions_EnvironmentVariablesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions_EnvironmentVariablesEntry>, I>>(
    base?: I,
  ): RuntimeOptions_EnvironmentVariablesEntry {
    return RuntimeOptions_EnvironmentVariablesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions_EnvironmentVariablesEntry>, I>>(
    object: I,
  ): RuntimeOptions_EnvironmentVariablesEntry {
    const message = createBaseRuntimeOptions_EnvironmentVariablesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseRuntimeOptions_VolumeMounts(): RuntimeOptions_VolumeMounts {
  return { name: "", mountPath: "", readOnly: false };
}

export const RuntimeOptions_VolumeMounts = {
  encode(message: RuntimeOptions_VolumeMounts, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.mountPath !== "") {
      writer.uint32(18).string(message.mountPath);
    }
    if (message.readOnly === true) {
      writer.uint32(24).bool(message.readOnly);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeOptions_VolumeMounts {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeOptions_VolumeMounts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.mountPath = reader.string();
          break;
        case 3:
          message.readOnly = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuntimeOptions_VolumeMounts {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      mountPath: isSet(object.mountPath) ? String(object.mountPath) : "",
      readOnly: isSet(object.readOnly) ? Boolean(object.readOnly) : false,
    };
  },

  toJSON(message: RuntimeOptions_VolumeMounts): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.mountPath !== undefined && (obj.mountPath = message.mountPath);
    message.readOnly !== undefined && (obj.readOnly = message.readOnly);
    return obj;
  },

  create<I extends Exact<DeepPartial<RuntimeOptions_VolumeMounts>, I>>(base?: I): RuntimeOptions_VolumeMounts {
    return RuntimeOptions_VolumeMounts.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RuntimeOptions_VolumeMounts>, I>>(object: I): RuntimeOptions_VolumeMounts {
    const message = createBaseRuntimeOptions_VolumeMounts();
    message.name = object.name ?? "";
    message.mountPath = object.mountPath ?? "";
    message.readOnly = object.readOnly ?? false;
    return message;
  },
};

/** The interface implemented by Instance Customisation Plugins */
export interface InstanceCustomisationPlugin {
  /** Applies modifications to the runtime options for a given instance of a Pixel Streaming application */
  UpdateRuntimeOptions(request: UpdateRuntimeOptionsRequest): Promise<UpdateRuntimeOptionsResponse>;
}

export class InstanceCustomisationPluginClientImpl implements InstanceCustomisationPlugin {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "proto.InstanceCustomisationPlugin";
    this.rpc = rpc;
    this.UpdateRuntimeOptions = this.UpdateRuntimeOptions.bind(this);
  }
  UpdateRuntimeOptions(request: UpdateRuntimeOptionsRequest): Promise<UpdateRuntimeOptionsResponse> {
    const data = UpdateRuntimeOptionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateRuntimeOptions", data);
    return promise.then((data) => UpdateRuntimeOptionsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
