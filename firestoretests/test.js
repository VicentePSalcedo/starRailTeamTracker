import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing"
import { setDoc, getDoc } from "firebase/firestore";
import * as fs from 'fs'


const myId = "user_abc";
const theirId = "user_xyz";

let testEnv = await initializeTestEnvironment({
    projectId: "starrailteam",
    firestore: {
        rules: fs.readFileSync("../firestore.rules", "utf8"),
    },
});
beforeEach(async () => await testEnv.clearStorage())

describe("Our social app", () => {
    it("Can do math", async() => {
        const user = testEnv.unauthenticatedContext().storage();
        await assertSucceeds(getDoc(user.firestore(), 'Characters/Asta'));
    })
    // it("Can read items in the read-only collection", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Characters").doc("Asta");
    //     await firebase.assertSucceeds(testDoc.get());
    // })
    // it("Can't read items in the read-only collection", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Characters").doc("Asta");
    //     await firebase.assertFails(testDoc.set({foo: "bar"}));
    // })
    // it("Can read or write to a user's Teams collection with the same ID as our user", async() => {
    //     const admin = getAdminFirestore();
    //     const usersDoc = admin.collection("Users").doc(myId);
        // await usersDoc.set({subscribed: false});
        // const teamsDoc = usersDoc.collection("Teams").doc("1234");
        //
        // const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Users").doc(myId).collection("Teams").doc("1234");
    //     await firebase.assertSucceeds(testDoc.get());
    //     await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    // })
    // it("Can't read or write to a user Teams collection with the same ID as our user", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Users").doc(theirId);
    //     await firebase.assertFails(testDoc.get());
    //     await firebase.assertFails(testDoc.set({foo: "bar"}));
    // })
})
