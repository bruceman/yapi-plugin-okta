const { Issuer } = require('openid-client');
const yapi = require('yapi.js');
const controller = require('./controller');

module.exports = function (options) {
    const { issuer, client_id, client_secret, redirect_uri } = options || {};

    let client = null;

    const initClient = async () => {
        try {
            const oktaIssuer = await Issuer.discover(issuer);

            client = new oktaIssuer.Client({
                client_id,
                client_secret,
                redirect_uris: [redirect_uri],
                response_types: ['code'],
            }); 

            // register client for controller
            controller.prototype.client = client;

            yapi.commons.log('init openid client successfully');

        } catch (err) {
            yapi.commons.error('init openid client failed: ' + ( err.message || err.cause) , 'error');
        }
    }

    initClient();

    this.bindHook('third_login', (ctx) => {
        return new Promise((resolve, reject) => {
            const params = client.callbackParams(ctx.url);
            // get auth token 
            client.callback(redirect_uri, params, { state: params.state }).then((tokenSet) => {
                const { userid, preferred_username } = tokenSet.claims();
                resolve({
                    username: userid,
                    email: preferred_username
                });

            }).catch((err) => {
                reject(err);
            });

        });
    });

    this.bindHook('add_router', function(router) {  
        router({
          controller: controller,
          method: 'get',
          path: 'okta/get_login_url',
          action: 'getLoginUrl'
        });
        
      });
};
