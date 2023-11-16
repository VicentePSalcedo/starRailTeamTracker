#!/bin/bash
echo "Running tests ..."
if !(firebase emulators:exec --only firestore "cd firestoretests && npm test"); then
    echo "One or more firestore unit tests are failing."
    return 1
fi
