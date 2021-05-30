/**
 * Usage:
 * While `$fire` contains the initialized service instances
 * `$fireModule` gives you access to the (not-initialized) Firebase module itself with all its static methods
 */

export default {
  config: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  },
  services: {
    auth: {
      persistence: 'local',
      initialize: {
        onAuthStateChangedAction: 'onAuthStateChangedAction',
        subscribeManually: false
      },
    },
    firestore: true,
    storage: true,
  }
}