Package.describe({
  summary: "Login service for Stripe accounts",
  version: "1.0.0",
  name: "99miles:accounts-stripe"
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.3', 'METEOR@0.9.4', 'METEOR@1.0']);
  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('99miles:stripe@1.0.0', ['client', 'server']);

  api.addFiles('stripe_login_button.css', 'client');
  api.addFiles("stripe.js");
});
