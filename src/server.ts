import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType as AuthenticationProtoGrpcType } from 'generated/authentication';
import { ProtoGrpcType as CoreProtoGrpcType } from 'generated/core';
import { ProtoGrpcType as CustomizationProtoGrpcType } from 'generated/customization';
import { ProtoGrpcType as DeveloperProtoGrpcType } from 'generated/developer';
import { ProtoGrpcType as EventProtoGrpcType } from 'generated/event';
import { ProtoGrpcType as FriendProtoGrpcType } from 'generated/friend';
import { ProtoGrpcType as GroupProtoGrpcType } from 'generated/group';
import { ProtoGrpcType as GroupFileProtoGrpcType } from 'generated/group_file';
import { ProtoGrpcType as GuildProtoGrpcType } from 'generated/guild';
import { ProtoGrpcType as MessageProtoGrpcType } from 'generated/message';
import { ProtoGrpcType as QsignProtoGrpcType } from 'generated/qsign';
import { ProtoGrpcType as ReverseProtoGrpcType } from 'generated/reverse';
import { ProtoGrpcType as WebProtoGrpcType } from 'generated/web';
import { AuthenticationServiceHandlers } from 'generated/kritor/authentication/AuthenticationService';

function getProtoGrpcType(filename: string, dirs: string[]) {
    const definition = protoLoader.loadSync(filename, { includeDirs: dirs });
    return grpc.loadPackageDefinition(definition) as unknown;
}

const authenticationProtoGrpcType = getProtoGrpcType('auth/authentication.proto', ['kritor/protos']) as AuthenticationProtoGrpcType;
const coreProtoGrpcType = getProtoGrpcType('core/core.proto', ['kritor/protos']) as CoreProtoGrpcType;
const customizationProtoGrpcType = getProtoGrpcType('core/core.proto', ['kritor/protos']) as CustomizationProtoGrpcType;
const developerProtoGrpcType = getProtoGrpcType('developer/developer.proto', ['kritor/protos']) as DeveloperProtoGrpcType;
const eventProtoGrpcType = getProtoGrpcType('event/event.proto', ['kritor/protos']) as EventProtoGrpcType;
const friendProtoGrpcType = getProtoGrpcType('friend/friend.proto', ['kritor/protos']) as FriendProtoGrpcType;
const groupProtoGrpcType = getProtoGrpcType('group/group.proto', ['kritor/protos']) as GroupProtoGrpcType;
const groupFileProtoGrpcType = getProtoGrpcType('file/group_file.proto', ['kritor/protos']) as GroupFileProtoGrpcType;
const guildProtoGrpcType = getProtoGrpcType('guild/guild.proto', ['kritor/protos']) as GuildProtoGrpcType;
const messageProtoGrpcType = getProtoGrpcType('message/message.proto', ['kritor/protos']) as MessageProtoGrpcType;
const qsignProtoGrpcType = getProtoGrpcType('developer/qsign.proto', ['kritor/protos']) as QsignProtoGrpcType;
const reverseProtoGrpcType = getProtoGrpcType('reverse/reverse.proto', ['kritor/protos']) as ReverseProtoGrpcType;
const webProtoGrpcType = getProtoGrpcType('web/web.proto', ['kritor/protos']) as WebProtoGrpcType;

const authenticationServer: AuthenticationServiceHandlers = {
    Authenticate: (call, callback) => {
        // server handlers implementation...
    },
    GetAuthenticationState: (call, callback) => {
        // server handlers implementation...
    },
    AddTicket: (call, callback) => {
        // server handlers implementation...
    },
    DeleteTicket: (call, callback) => {
        // server handlers implementation...
    },
    GetTicket: (call, callback) => {
        // server handlers implementation...
    }
    // server handlers implementation...
};

const server = new grpc.Server();
server.addService(authenticationProtoGrpcType.kritor.authentication.AuthenticationService.service, authenticationServer);


server.bindAsync(
    "0.0.0.0:9090",
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
      }
    }
  );