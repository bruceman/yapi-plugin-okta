const baseController = require('controllers/base.js');
const yapi = require('yapi.js');

class OktaController extends baseController {
  constructor(ctx) {
    super(ctx);
  }

  // get okta login url
  async getLoginUrl(ctx) {
    // reuse okta client 
    if (this.client) {
        const url = this.client.authorizationUrl({
            scope: 'openid profile',
            state: Date.now(),
        });

        return (ctx.body = yapi.commons.resReturn(url));

    } else {
        return (ctx.body = yapi.commons.resReturn(null));
    }
    
  }

}

module.exports = OktaController;