import firebase_admin
import time
import datetime
from firebase_admin import credentials, firestore
from random import *
import pytz

cred = credentials.Certificate("creds/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
db.collection("Scheduled").get()
IST = pytz.timezone('Asia/Kolkata')
while 1:
    random_number = randint(1, 100)
    db.collection('Scheduled').add({'Random': random_number, 'DateTime': datetime.datetime.now(IST)})
    print(datetime.datetime.now(IST))
    time.sleep(5)

