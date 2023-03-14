import {credentials} from '@grpc/grpc-js';

#import {HelloServiceClient} from '../proto/services/hello/v1/hello_service_grpc_pb';

#const client = new HelloServiceClient('localhost:4000', credentials.createInsecure());
