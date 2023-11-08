#!/bin/bash
firebase emulators:exec --only firestore "cd firestoretests && npm test"
