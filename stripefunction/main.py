import json
import os
from firebase_functions import https_fn, options
from firebase_admin import firestore, initialize_app
from flask import jsonify
import stripe
    
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"), "r") as D:
    secret = json.loads(D.read())
stripe.api_key = secret["key"]
endpoint_secret = secret["web"]
app = initialize_app()
client = firestore.client(app=app)


YOUR_DOMAIN='https://starrailteamtracker.web.app/'

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["https://starrailteamtracker.web.app"],
        cors_methods=["post"],
    )
)
def create_checkout_session(request):
    uid = str(request.data.decode("utf-8"))
    customer = stripe.Customer.create(
        metadata={
            "uid": uid
        }
    )
    try:
        checkout_session = stripe.checkout.Session.create(
            customer=customer.id,
            line_items=[
                {
                    "price": "price_1O7019E1Dt8s3Ho54Aaf80mA",
                    "quantity": 1,
                },
            ],
            mode="subscription",
            metadata={
                "uid": uid
            },
            customer_update={"address": "auto"},
            success_url=YOUR_DOMAIN,
            cancel_url=YOUR_DOMAIN,
            automatic_tax={"enabled": True},
        )
    except Exception as e:
        return str(e)
    return https_fn.Response(checkout_session.url)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["https://my-webhook-view-h7x52e2twq-uc.a.run.app"],
        cors_methods=["post"],
    )
)
def my_webhook_view(request):
    event = None
    payload = request.data
    subscribedField = "subscribed"
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

            #### HANDLE COMPLETED PAYMENT ####
    if event['type'] == 'checkout.session.completed':

        paymentData = event['data']['object']
        customer = stripe.Customer.retrieve(paymentData["customer"])
        ref = client.collection("Users").document(customer.metadata["uid"])
        
        if(ref.get().exists):
            ref.update({
                subscribedField: True
            })
            
        else:
            ref.set({
                subscribedField: True
            })
    if event['type'] == 'customer.subscription.deleted' or event['type'] == 'invoice.payment_failed':
        paymentData = event['data']['object']
        customer = stripe.Customer.retrieve(paymentData["customer"])
        ref = client.collection("Users").document(customer.metadata["uid"])
        ref.update({
            subscribedField: False
        })
    return jsonify(success=True)
