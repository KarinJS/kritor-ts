import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType as AuthenticateProtoGrpcType } from '../generated/authenticate';
import { ProtoGrpcType as ReverseProtoGrpcType } from '../generated/reverse';
import { ProtoGrpcType as ContactProtoGrpcType } from '../generated/contact';
import { ProtoGrpcType as CoreProtoGrpcType } from '../generated/core';
import { ProtoGrpcType as DeveloperProtoGrpcType } from '../generated/developer';
import { ProtoGrpcType as QsignProtoGrpcType } from '../generated/qsign';
import { ProtoGrpcType as EventProtoGrpcType } from '../generated/event';
import { ProtoGrpcType as GroupFileProtoGrpcType } from '../generated/group_file';
import { ProtoGrpcType as FriendProtoGrpcType } from '../generated/friend';
import { ProtoGrpcType as GroupProtoGrpcType } from '../generated/group';
import { ProtoGrpcType as GuildProtoGrpcType } from '../generated/guild';
import { ProtoGrpcType as MessageProtoGrpcType } from '../generated/message';
import { ProtoGrpcType as WebProtoGrpcType } from '../generated/web';
import { AuthenticationServiceHandlers } from '../generated/kritor/AuthenticationService';

function getProtoGrpcType(file: string) {
    const definition = protoLoader.loadSync(file);
    return grpc.loadPackageDefinition(definition) as unknown;
}

const authenticateProtoGrpcType = getProtoGrpcType('kritor/protos/authenticate.proto') as AuthenticateProtoGrpcType;
const reverseProtoGrpcType = getProtoGrpcType('kritor/protos/reverse.proto') as ReverseProtoGrpcType;
const contactProtoGrpcType = getProtoGrpcType('kritor/protos/contact/contact.proto') as ContactProtoGrpcType;
const coreProtoGrpcType = getProtoGrpcType('kritor/protos/core/core.proto') as CoreProtoGrpcType;
const developerProtoGrpcType = getProtoGrpcType('kritor/protos/developer/developer.proto') as DeveloperProtoGrpcType;
const qsignProtoGrpcType = getProtoGrpcType('kritor/protos/qsign/qsign.proto') as QsignProtoGrpcType;
const eventProtoGrpcType = getProtoGrpcType('kritor/protos/event/event.proto') as EventProtoGrpcType;
const groupFileProtoGrpcType = getProtoGrpcType('kritor/protos/file/group_file.proto') as GroupFileProtoGrpcType;
const friendProtoGrpcType = getProtoGrpcType('kritor/protos/friend/friend.proto') as FriendProtoGrpcType;
const groupProtoGrpcType = getProtoGrpcType('kritor/protos/group/group.proto') as GroupProtoGrpcType;
const guildProtoGrpcType = getProtoGrpcType('kritor/protos/guild/guild.proto') as GuildProtoGrpcType;
const messageProtoGrpcType = getProtoGrpcType('kritor/protos/message/message.proto') as MessageProtoGrpcType;
const webProtoGrpcType = getProtoGrpcType('kritor/protos/web/web.proto') as WebProtoGrpcType;


const authServer: AuthenticationServiceHandlers = {
    AddTicket: (call, callback) => {
        // server handlers implementation...
    },
    Auth: (call, callback) => {
        // server handlers implementation...
    },
    DeleteTicket: (call, callback) => {
        // server handlers implementation...
    },
    GetAuthState: (call, callback) => {
        // server handlers implementation...
    },
    GetTicket: (call, callback) => {
        // server handlers implementation...
    }
    // server handlers implementation...
};

const server = new grpc.Server();
server.addService(authenticateProtoGrpcType.kritor.AuthenticationService.service, authServer);


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