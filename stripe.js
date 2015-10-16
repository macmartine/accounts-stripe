Accounts.oauth.registerService('stripe');

if (Meteor.isClient) {
  Meteor.loginWithStripe = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Stripe.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: _.map(
      // publish access token since it can be used from the client (if
      // transmitted over ssl or on
      // localhost). https://developers.stripe.com/accounts/docs/OAuth2UserAgent
      // refresh token probably shouldn't be sent down.
      Stripe.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
      function (subfield) { return 'services.stripe.' + subfield; }),

    forOtherUsers: _.map(
      // even with autopublish, no legitimate web app should be
      // publishing all users' emails
      _.without(Stripe.whitelistedFields, 'email', 'verified_email'),
      function (subfield) { return 'services.stripe.' + subfield; })
  });
}
