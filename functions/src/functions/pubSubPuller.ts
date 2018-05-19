import { base64Decode } from '@firebase/util';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase)

var db = admin.firestore();

export default class PubSubPuller {
  getPubSubPuller(message: functions.pubsub.Message){
    db.collection('pubsub').doc().set({message : base64Decode(message.data), time: Math.floor((new Date).getTime()/1000)})
    .catch(err => {
      console.error(err);
    });
  };
};