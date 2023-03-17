/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export interface AuthenticationRequest {
  /**
   * The authentication token, which we expect to have been issued by an external identity provider.
   * This will be empty in the initial (pre-redirect) request for workflows where users are redirected to a URL to obtain a token.
   */
  token: string;
  /**
   * Used to indicate to the Authentication Plugin which identity provider should be used when the plugin implementation supports interacting with multiple
   * identity providers. This field is ignored when the plugin implementation supports only a single identity provider and should be left as an empty string.
   * For workflows where users are redirected to a URL to obtain a token, this value must be the same in both the pre-redirect and post-redirect requests.
   */
  provider: string;
}

export interface AuthenticationResponse {
  /** The outcome of the authentication request */
  outcome: AuthenticationResponse_Outcome;
  /**
   * The URL of an external identity provider to which the user should be redirected to obtain an authentication token
   * (Set when the outcome is REDIRECT)
   */
  url?:
    | string
    | undefined;
  /**
   * The unique ID representing the authenticated user
   * (Set when the outcome is AUTHENTICATED)
   */
  id?:
    | string
    | undefined;
  /**
   * The message providing details of the error that occurred
   * (Set when the outcome is ERROR)
   */
  error?: string | undefined;
}

/** Represents the possible authentication outcomes */
export enum AuthenticationResponse_Outcome {
  /** REDIRECT - The authentication token was empty and the user should be redirected to an external identity provider to obtain a token */
  REDIRECT = 0,
  /** INVALID_TOKEN - The supplied authentication token was invalid */
  INVALID_TOKEN = 1,
  /** AUTHENTICATED - The user was successfully authenticated */
  AUTHENTICATED = 2,
  /** ERROR - An error occurred when attempting to perform authentication */
  ERROR = 3,
  UNRECOGNIZED = -1,
}

export function authenticationResponse_OutcomeFromJSON(object: any): AuthenticationResponse_Outcome {
  switch (object) {
    case 0:
    case "REDIRECT":
      return AuthenticationResponse_Outcome.REDIRECT;
    case 1:
    case "INVALID_TOKEN":
      return AuthenticationResponse_Outcome.INVALID_TOKEN;
    case 2:
    case "AUTHENTICATED":
      return AuthenticationResponse_Outcome.AUTHENTICATED;
    case 3:
    case "ERROR":
      return AuthenticationResponse_Outcome.ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthenticationResponse_Outcome.UNRECOGNIZED;
  }
}

export function authenticationResponse_OutcomeToJSON(object: AuthenticationResponse_Outcome): string {
  switch (object) {
    case AuthenticationResponse_Outcome.REDIRECT:
      return "REDIRECT";
    case AuthenticationResponse_Outcome.INVALID_TOKEN:
      return "INVALID_TOKEN";
    case AuthenticationResponse_Outcome.AUTHENTICATED:
      return "AUTHENTICATED";
    case AuthenticationResponse_Outcome.ERROR:
      return "ERROR";
    case AuthenticationResponse_Outcome.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseAuthenticationRequest(): AuthenticationRequest {
  return { token: "", provider: "" };
}

export const AuthenticationRequest = {
  encode(message: AuthenticationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticationRequest {
    return {
      token: isSet(object.token) ? String(object.token) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: AuthenticationRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationRequest>, I>>(base?: I): AuthenticationRequest {
    return AuthenticationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticationRequest>, I>>(object: I): AuthenticationRequest {
    const message = createBaseAuthenticationRequest();
    message.token = object.token ?? "";
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseAuthenticationResponse(): AuthenticationResponse {
  return { outcome: 0, url: undefined, id: undefined, error: undefined };
}

export const AuthenticationResponse = {
  encode(message: AuthenticationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.outcome !== 0) {
      writer.uint32(8).int32(message.outcome);
    }
    if (message.url !== undefined) {
      writer.uint32(18).string(message.url);
    }
    if (message.id !== undefined) {
      writer.uint32(26).string(message.id);
    }
    if (message.error !== undefined) {
      writer.uint32(34).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outcome = reader.int32() as any;
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticationResponse {
    return {
      outcome: isSet(object.outcome) ? authenticationResponse_OutcomeFromJSON(object.outcome) : 0,
      url: isSet(object.url) ? String(object.url) : undefined,
      id: isSet(object.id) ? String(object.id) : undefined,
      error: isSet(object.error) ? String(object.error) : undefined,
    };
  },

  toJSON(message: AuthenticationResponse): unknown {
    const obj: any = {};
    message.outcome !== undefined && (obj.outcome = authenticationResponse_OutcomeToJSON(message.outcome));
    message.url !== undefined && (obj.url = message.url);
    message.id !== undefined && (obj.id = message.id);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationResponse>, I>>(base?: I): AuthenticationResponse {
    return AuthenticationResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticationResponse>, I>>(object: I): AuthenticationResponse {
    const message = createBaseAuthenticationResponse();
    message.outcome = object.outcome ?? 0;
    message.url = object.url ?? undefined;
    message.id = object.id ?? undefined;
    message.error = object.error ?? undefined;
    return message;
  },
};

/** The interface implemented by Authentication Plugins */
export interface AuthenticationPlugin {
  /** Attempts to authenticate a user */
  Authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;
}

export class AuthenticationPluginClientImpl implements AuthenticationPlugin {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "proto.AuthenticationPlugin";
    this.rpc = rpc;
    this.Authenticate = this.Authenticate.bind(this);
  }
  Authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    const data = AuthenticationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Authenticate", data);
    return promise.then((data) => AuthenticationResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
