import { EventType } from '../generated/kritor/event/EventType';
import { init } from './api';

const host = ""
const account = ""

const clients = init(host)

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
clients.authClient.waitForReady(deadline, (error?: Error) => {
    if (error) {
        console.log(`Client connect error: ${error.message}`);
    } else {
        console.log('Client connected');
        clients.authClient.auth({
            ticket: 'ticket',
            account: account,
        }, (error?, rsp?) => {
            if (error) {
                console.error(error.message);
            } else if (rsp) {
                console.log(rsp);
            }
        })
        const eventStream = clients.eventClient.RegisterActiveListener(
            { type: EventType.EVENT_TYPE_MESSAGE }
        )
        eventStream.on('data', function (feature) {
            console.log(JSON.stringify(feature));
        });
        eventStream.on('end', function () {
            // The server has finished sending
        });
        eventStream.on('error', function (e) {
            // An error has occurred and the stream has been closed.
        });
        eventStream.on('status', function (status) {
            // process status
        });
    }
});