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

function getProtoGrpcType(filename: string, dirs: string[]) {
    const definition = protoLoader.loadSync(filename, { includeDirs: dirs });
    return grpc.loadPackageDefinition(definition) as unknown;
}

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
    new(...args: ConstructorParameters<Constructor>): Subtype;
};
function getClient<Subtype>(constructor: SubtypeConstructor<typeof grpc.Client, Subtype>, host: string, credential: grpc.ChannelCredentials) {
    return new constructor(host, credential);
}

function init(host: string) {
    const authenticateProtoGrpcType = getProtoGrpcType('authenticate.proto', ['kritor/protos']) as AuthenticateProtoGrpcType;
    const reverseProtoGrpcType = getProtoGrpcType('reverse.proto', ['kritor/protos']) as ReverseProtoGrpcType;
    const contactProtoGrpcType = getProtoGrpcType('contact/contact.proto', ['kritor/protos']) as ContactProtoGrpcType;
    const coreProtoGrpcType = getProtoGrpcType('core/core.proto', ['kritor/protos']) as CoreProtoGrpcType;
    const developerProtoGrpcType = getProtoGrpcType('developer/developer.proto', ['kritor/protos']) as DeveloperProtoGrpcType;
    const qsignProtoGrpcType = getProtoGrpcType('developer/qsign.proto', ['kritor/protos']) as QsignProtoGrpcType;
    const eventProtoGrpcType = getProtoGrpcType('event/event.proto', ['kritor/protos']) as EventProtoGrpcType;
    const groupFileProtoGrpcType = getProtoGrpcType('file/group_file.proto', ['kritor/protos']) as GroupFileProtoGrpcType;
    const friendProtoGrpcType = getProtoGrpcType('friend/friend.proto', ['kritor/protos']) as FriendProtoGrpcType;
    const groupProtoGrpcType = getProtoGrpcType('group/group.proto', ['kritor/protos']) as GroupProtoGrpcType;
    const guildProtoGrpcType = getProtoGrpcType('guild/guild.proto', ['kritor/protos']) as GuildProtoGrpcType;
    const messageProtoGrpcType = getProtoGrpcType('message/message.proto', ['kritor/protos']) as MessageProtoGrpcType;
    const webProtoGrpcType = getProtoGrpcType('web/web.proto', ['kritor/protos']) as WebProtoGrpcType;

    const credential = grpc.credentials.createInsecure()

    const authClient = getClient(authenticateProtoGrpcType.kritor.AuthenticationService, host, credential);
    const reverseClient = getClient(reverseProtoGrpcType.kritor.ReverseService, host, credential);
    const contactClient = getClient(contactProtoGrpcType.kritor.contact.ContactService, host, credential);
    const coreClient = getClient(coreProtoGrpcType.kritor.core.CoreService, host, credential);
    const developerClient = getClient(developerProtoGrpcType.kritor.developer.DeveloperService, host, credential);
    const qsignClient = getClient(qsignProtoGrpcType.kritor.developer.QsignService, host, credential);
    const eventClient = getClient(eventProtoGrpcType.kritor.event.EventService, host, credential);
    const groupFileClient = getClient(groupFileProtoGrpcType.kritor.file.GroupFileService, host, credential);
    const friendClient = getClient(friendProtoGrpcType.kritor.friend.FriendService, host, credential);
    const groupClient = getClient(groupProtoGrpcType.kritor.group.GroupService, host, credential);
    const guildClient = getClient(guildProtoGrpcType.kritor.guild.GuildService, host, credential);
    const messageClient = getClient(messageProtoGrpcType.kritor.message.MessageService, host, credential);
    const webClient = getClient(webProtoGrpcType.kritor.web.WebService, host, credential);

    return {
        authClient,
        reverseClient,
        contactClient,
        coreClient,
        developerClient,
        qsignClient,
        eventClient,
        groupFileClient,
        friendClient,
        groupClient,
        guildClient,
        messageClient,
        webClient,
    }
}


export { init };