const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "starrailteamtracker";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = {uid: myId};

function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}


describe("Our social app", () => {
    it("Can read items in the read-only collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("Characters").doc("Asta");
        await firebase.assertSucceeds(testDoc.get());
    })
    it("Can't read items in the read-only collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("Characters").doc("Asta");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })
    it("Can read or write to a user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("Users").doc(myId);
        await firebase.assertSucceeds(testDoc.get());
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    })
    it("Can't read or write to a user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("Users").doc(theirId);
        await firebase.assertFails(testDoc.get());
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })
})
