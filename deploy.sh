#!/bin/bash
echo "Deploying the firestore rules and firebase functions..."
echo "!!Please note: hosting deploys on merge to dev!!"
if !(firebase deploy --only firestore); then
    echo "Firestore rules failed to deploy."
fi
echo "Firestore rules successfully deployed."
if !(firebase deploy --only functions); then
    echo "Firebase functions failed to deploy."
fi
echo "Firebase functions successfully deployed."
