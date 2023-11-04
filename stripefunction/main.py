import json
import os
from firebase_functions import https_fn, options
from firebase_admin import firestore, credentials, initialize_app
import firebase_admin 
from flask import jsonify
import stripe
    
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"), "r") as D:
    secret = json.loads(D.read())
stripe.api_key = secret["key"]
endpoint_secret = secret["web"]
firestore_key = secret["firestore"]
app = initialize_app()

YOUR_DOMAIN='http://localhost:5000'

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def create_checkout_session(request):
    print(request.data)
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price": "price_1O6EOxE1Dt8s3Ho5N4qf7AtF",
                    "quantity": 1,
                },
            ],
            mode="subscription",
            # metadata={"test": request.data},
            client_reference_id=str(request.data),
            success_url=YOUR_DOMAIN,
            cancel_url=YOUR_DOMAIN,
            automatic_tax={"enabled": True},
        )
    except Exception as e:
        return str(e)
    return https_fn.Response(checkout_session.url)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def my_webhook_view(request):
    event = None
    payload = request.data
    try:
        event = json.loads(payload)
    except json.decoder.JSONDecodeError as e:
        print(" Webhook error wihle parsing basic request. " + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except stripe.error.SignatureVerificationError as e:
            print("⚠️  Webhook signature verification failed." + str(e))
            return jsonify(success=False)
    if event and event['type'] == 'checkout.session.completed':
        # print(event["data"]["object"])
        payment_intent = event['data']['object']
        # print(f'LINE 65{event["data"]["object"].client_reference_id}')
        client = firestore.client(app=app)
        characters = client.collection("Characters").stream()
        # print(characters.to_dict())
        for doc in characters:
            print(f"{doc.id} : {doc.to_dict()}")
            print('TEST')
        print('2TEST2')

        # print(characters.to_dict())        
            
            
    # else:
        # print("Unhandled event type {}".format(event["type"]))
    return jsonify(success=True)
