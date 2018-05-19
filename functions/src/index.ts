import { base64Decode } from '@firebase/util';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as PubSub from '@google-cloud/pubsub';
import * as express from 'express';
import PubSubPuller from './functions/pubSubPuller';
import SendPubMessage from './functions/sendPubMessage'

const API_PREFIX = 'api';
const app = express();

const psb = new PubSubPuller();
const p = new SendPubMessage();

export const sendPubMessage = functions.https.onRequest((request, response) => {
    p.publish(request, response)
});

export const pubSubPuller = functions.pubsub.topic('iot-topic').onPublish((message) => {
    psb.getPubSubPuller(message)
});

app.use((req, res, next) => {
    if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
        req.url = req.url.substring(API_PREFIX.length + 1);
    }
    next();
});

app.post('/pubMessage', (req, res) => {
    sendPubMessage(req, res);
});

exports[API_PREFIX] = functions.https.onRequest(app);