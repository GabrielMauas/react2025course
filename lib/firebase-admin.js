import admin from 'firebase-admin';

// try {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//           client_email: process.env.FIREBASE_CLIENT_EMAIL,
//           private_key: process.env.FIREBASE_PRIVATE_KEY,
//           project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
//         }),
//         databaseURL: 'https://fast-feedback-demo.firebaseio.com'
//     });
// } catch (error) {
//   /*
//    * We skip the "already exists" message which is
//    * not an actual error when we're hot-reloading.
//    */
//   if (!/already exists/u.test(error.message)) {
//     // eslint-disable-next-line no-console
//     console.error('Firebase admin initialization error', error.stack);
//   }
// }

// export const db = admin.firestore();

const adminConfig = {
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  databaseURL: 'https://fast-feedback-demo.firebaseio.com',
};

if (!admin.apps.length) {
  admin.initializeApp(adminConfig);
}

const db = admin.firestore();
const auth = admin.auth();
// const db = getFirestore();
// const auth = getAuth();

export { db, auth };
