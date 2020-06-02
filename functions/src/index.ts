import * as functions from 'firebase-functions';
import DB_ROUTES from '../../src/constants/firebase/Database/Database_Routes';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


export const numberRamndom = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
})

/*
export const deletePartida = functions.database.ref(DB_ROUTES.servidor.blackjack._this).onWrite(async (change) => {

    const parentRef = change.after.ref.parent;
    if (parentRef) {
        const snapshot = await parentRef.once('value');

        //let childCount = 0;
        const updates: any = {};
        snapshot.forEach((child) => {

            if (child.key) {
                updates[child.key] = null;
            }

        });
        // Update the parent. This effectively removes the extra children.
        return parentRef.update(updates);

    }


    return null;
})
*/