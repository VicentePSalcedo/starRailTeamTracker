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
client = firestore.client(app=app)


YOUR_DOMAIN='http://localhost:5000'

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def create_checkout_session(request):
    customer = stripe.Customer.create(
        metadata={
            "uid": str(request.data.decode("utf-8"))
        }
    )
    try:
        checkout_session = stripe.checkout.Session.create(
            customer=customer.id,
            line_items=[
                {
                    "price": "price_1O6EOxE1Dt8s3Ho5N4qf7AtF",
                    "quantity": 1,
                },
            ],
            mode="subscription",
            client_reference_id=str(request.data.decode("utf-8")),
            success_url=YOUR_DOMAIN,
            cancel_url=YOUR_DOMAIN,
            automatic_tax={"enabled": True},
        )
    except Exception as e:
        return https_fn.Response(response=e, status=400)
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
        paymentData = event['data']['object']
        clientIndex = "client_reference_id"
        subscribedField = "subscribed"
        if clientIndex in paymentData:
            userID = paymentData[clientIndex]
            ref = client.collection("Users").document(userID)
            
            if(ref.get().exists):
                ref.update({
                    subscribedField: True
                })
            else:
                ref.set({
                    subscribedField: True
                })
    return jsonify(success=True)
