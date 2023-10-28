# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import os
import stripe
from flask import Flask, redirect, request
from firebase_functions import https_fn
from firebase_admin import initialize_app

# This is your test secret API key.
with open('key.json', 'r') as d:
    stripe.api_key = d.read()

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

YOUR_DOMAIN = 'http://localhost:4200'

@app.route('/create-checkout-session', methods=['GET'])
def create_checkout_session():
#    try:
#        checkout_session = stripe.checkout.Session.create(
#            line_items=[
#                {
                    # Provide the exact Price ID  (for example, pr_1234) of the product you want to sell
#                    'price': 'price_1O5DBEE1Dt8s3Ho54sPzwMGN',
#                    'quantity': 1,
#                },
#            ],
#            mode='subscription',
#            success_url=YOUR_DOMAIN,
#            cancel_url='www.youtube.com',
#            automatic_tax={'enabled': True},
#        )
#    except Exception as e:
#        return str(e)
#
    return 'Can you see me?'

if __name__ == '__main__':
    app.run(port=5001)
