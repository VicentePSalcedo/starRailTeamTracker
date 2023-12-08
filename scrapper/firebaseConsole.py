import firebase_admin
import os
from firebase_admin import firestore
from firebase_admin import credentials

class FirebaseConsole:
    def __init__(self):
        self.collections = "Characters"

        self.creds = credentials.Certificate(os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"))
        firebase_admin.initialize_app(self.creds)
        self.client = firestore.client()
    def grabCollection(self):
        characters = self.client.collection(self.collections).stream()
        for doc in characters:
            print(f"{doc.id} : {doc.to_dict()}")
    def setCollection(self, collection: str):
        self.collections = collection
    def grabDocument(self, document: str):
        doc = self.client.collection(self.collections).document(document).get()
        if(doc.exists):
            print(f"{doc.id} : {doc.to_dict()}")
        else:
            print("Document Does Not Exist")
    def writeToCollection(self, characterName: str, lightcone: str, relicSet: list, bodyMainStat: list, feetMainStat: list, ornamentSet: list, sphereMainStat: list, ropeMainStat: list):
        self.client.collection(self.collections).document(characterName).set({
            "Name" : characterName,
            "LightCone": {"data": lightcone, "checked": False},
            "Relics": {
                  "Set": relicSet,
                  "Body": bodyMainStat,
                  "Feet": feetMainStat
            },
            "Ornament": {
                  "Set": ornamentSet,
                  "Sphere": sphereMainStat,
                  "Rope": ropeMainStat
            }
        })
