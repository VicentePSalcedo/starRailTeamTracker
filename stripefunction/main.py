import json
import os
from firebase_functions import https_fn, options
from firebase_admin import firestore, initialize_app
from flask import jsonify
import stripe
    
stripe.api_key = os.environ.get('STRIPE_KEY')
endpoint_secret = os.environ.get('STRIPE_WEB')
app = initialize_app()
client = firestore.client(app=app)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=[os.environ.get('CORS_CHECKOUT')],
        cors_methods=["post"],
    )
)
def create_checkout_session(request):
    print(os.environ.get('CORS_CHECKOUT'))
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
                    "price": os.environ.get('PRICE'),
                    "quantity": 1,
                },
            ],
            mode="subscription",
            metadata={
                "uid": uid
            },
            customer_update={"address": "auto"},
            success_url=os.environ.get('YOUR_DOMAIN'),
            cancel_url=os.environ.get('YOUR_DOMAIN'),
            automatic_tax={"enabled": True},
        )
    except Exception as e:
        print("failed")
        return str(e)
    return https_fn.Response(checkout_session.url)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=[os.environ.get('CORS_MY_WEB')],
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
