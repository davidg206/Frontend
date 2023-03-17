import {credentials} from '@grpc/grpc-js';

import {AuthenticationPluginClient} from '../proto/com/language/v1/authentication_grpc_pb';

const client = new AuthenticationPluginClient('localhost:4000', credentials.createInsecure());

const request = new AuthenticationRequest();

// need to request a token from an identity provider
