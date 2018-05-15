import { base64Decode } from '@firebase/util';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as PubSub from '@google-cloud/pubsub';

const pubsub = new PubSub();

admin.initializeApp(functions.config().firebase)

var db = admin.firestore();

export const sendPubMessage = functions.https.onRequest((request, response) => {
    const topic = pubsub.topic(request.body.topic);
    const publisher = topic.publisher();

    response.contentType('application/json')

    publisher.publish(Buffer.from(request.body.message))
      .then(() => response.status(200).send())
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
    });
});

export const pubSubPuller = functions.pubsub.topic('iot-topic').onPublish((message) => {
    db.collection('pubsub').doc().set({message : base64Decode(message.data)})
    .catch(err => {
      console.error(err)
    });
});