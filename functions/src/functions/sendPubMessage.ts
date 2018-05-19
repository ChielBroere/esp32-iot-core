import * as functions from 'firebase-functions';
import * as PubSub from '@google-cloud/pubsub';

const pubsub = new PubSub()

export default class sendPubMessage {
    publish(request: functions.Request, response: functions.Response){
        const topic = pubsub.topic(request.body.topic);
        const publisher = topic.publisher();

        response.contentType('application/json')

        publisher.publish(Buffer.from(request.body.message))
        .then(() => response.status(200).send())
        .catch((err) => {
            console.error(err);
            response.status(500).send(err);
        });
    };
};