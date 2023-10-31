from firebase_functions import https_fn, options
import stripe
import json
import os
from flask import jsonify, redirect
    
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"), "r") as D:
    secret = json.loads(D.read())
stripe.api_key = secret["key"]

YOUR_DOMAIN='https://localhost:5000'

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def create_checkout_session(req: https_fn.Request): # -> https_fn.Response:
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


    # return redirect(str(checkout_session.url), code=302)
    return https_fn.Response(checkout_session.url)
    # return https_fn.Response(req)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["post"],
    )
)
def my_webhook_view(request):
  payload = request.body

  # For now, you only need to print out the webhook payload so you can see
  # the structure.
  print(payload)

  return https_fn.Response(status=200)
