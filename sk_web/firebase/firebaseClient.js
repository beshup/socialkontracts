const configClient = require("./fbclient.json")
import firebaseClient from 'firebase/app';
import 'firebase/auth';

firebaseClient.initializeApp(configClient);
export const auth = firebaseClient.auth