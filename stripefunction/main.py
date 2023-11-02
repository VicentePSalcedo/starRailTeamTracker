import json
import os
from firebase_functions import https_fn, options
from flask import Flask, jsonify, request
import stripe
    
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"), "r") as D:
    secret = json.loads(D.read())
stripe.api_key = secret["key"]
endpoint_secret = secret["web"]

app = Flask(__name__)

YOUR_DOMAIN='http://localhost:5000'

@app.post('/create_checkout_session')
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1O6EOxE1Dt8s3Ho5N4qf7AtF',
                    'quantity': 1,
                },
        ],
        mode='subscription',
        success_url=YOUR_DOMAIN,
        cancel_url=YOUR_DOMAIN,
        automatic_tax={'enabled': True},
        )
    except Exception as e:
        return str(e)
    return (str(checkout_session.url))

@app.post('/my_webhook_view')
def my_webhook_view():
    event = None
    payload = request
    print('#######################################')
    print(payload)
    print('#######################################')
    try:
        event = json.loads(str(payload))
    except json.decoder.JSONDecodeError as e:
        print(' Webhook error wihle parsing basic request. ' + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return jsonify(success=False)
    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print('Payment for {} succeeded'.format(payment_intent['amount']))
    else:
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def request(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()
