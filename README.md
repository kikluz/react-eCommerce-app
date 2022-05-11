## Notes

#### Older React Version

```
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-scripts": "3.4.3",
```

#### Current React Version

```
"react": "^17.0.1",
"react-dom": "^17.0.1",
"react-scripts": "4.0.0",
```

#### Alternative fix

.env file in the root
FAST_REFRESH=FALSE


------------------------------------------------
# MY NOTES
### Better-comments
https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
## Better Comments
The Better Comments extension will help you create more human-friendly comments in your code.
With this extension, you will be able to categorise your annotations into:

-Alerts
-Queries
-TODOs
-Highlights
-Commented out code can also be styled to make it clear the code shouldn't be there
-Any other comment styles you'd like can be specified in the settings
------------------------------------------------

# .env vars
REACT_APP_AUTH_DOMAIN=
REACT_APP_CLIENT_ID=
REACT_APP_STRIPE_PUBLIC_KEY=
REACT_APP_STRIPE_SECRET_KEY=
# Extra Setup
npm install dotenv@8.2.0 stripe@8.130.0 @stripe/react-stripe-js@1.1.2 @stripe/stripe-js@1.11.0 netlify@6.0.12
npm install netlify-cli -D

## install netlify install globally
### sudo npm i -g netlify-cli
### run the commend [netlify dev] or [ntl dev]

# stipe link and how to code this area
https://github.com/john-smilga/react-course-comfy-sloth-store/blob/main/src/components/StripeCheckout.js

# React stripe payments
https://stripe.com/docs/payments/quickstart