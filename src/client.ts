import * as grpc from '@grpc/grpc-js';
import { EventStructure__Output } from '../generated/kritor/event/EventStructure';
import { EventType } from '../generated/kritor/event/EventType';

import { init, authentication, sendMessage, RegisterActiveListener, addTicket, deleteTicket } from './api';

const host = "192.168.1.218:5700"
const account = "account"
const superTicket = "super_ticket"

try {
    const clients = init(host)

    // const ticket = Math.random().toString(36)
    // addTicket(clients, account, superTicket, ticket, (code, msg) => { })

    // authentication(clients, account, ticket, (code, msg) => {
    //     if (code === "OK") {
    //         console.log("Authentication success")
    //     } else {
    //         console.log(`Authentication failed: ${msg}`)
    //     }
    // })

    // deleteTicket(clients, account, superTicket, ticket, (code, msg) => { })

    const onCore = function (message: EventStructure__Output) {
        console.log(`onCore received: ${JSON.stringify(message)}`)
    }

    const onMessage = function (message: EventStructure__Output) {
        console.log(`onMessage received: ${JSON.stringify(message)}`)
    }

    const onNotice = function (message: EventStructure__Output) {
        console.log(`onNotice received: ${JSON.stringify(message)}`)
    }

    const onRequest = function (message: EventStructure__Output) {
        console.log(`onRequest received: ${JSON.stringify(message)}`)
    }

    const onEnd = function () {
        console.info("Stream End")
    }

    const onError = function (e: Error) {
        console.error(e)
    }

    const onStatus = function (status: grpc.StatusObject) {
        console.log(`Status: ${JSON.stringify(status)}`)
    }

    RegisterActiveListener(clients, EventType.EVENT_TYPE_CORE_EVENT, onCore, onEnd, onError, onStatus)
    RegisterActiveListener(clients, EventType.EVENT_TYPE_MESSAGE, onMessage, onEnd, onError, onStatus)
    RegisterActiveListener(clients, EventType.EVENT_TYPE_NOTICE, onNotice, onEnd, onError, onStatus)
    RegisterActiveListener(clients, EventType.EVENT_TYPE_REQUEST, onRequest, onEnd, onError, onStatus)

    // sendMessage(clients, { scene: "GROUP", peer: "635275515" },
    //     [{
    //         at: {
    //             uid: "u_w2DGIV0O00hf3fZXQOrA0w"
    //         }
    //     }], 3,
    //     (messageId, messageTime) => {
    //         console.log(`Message sent, id: ${messageId}, time: ${messageTime}`)
    //     }
    // )

} catch (error) {
    console.error(error)
}