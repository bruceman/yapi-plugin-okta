# yapi-plugin-okta 
Okta login plugin for YApi 


### install plugin

> npm i yapi-plugin-okta 

or

> yarn add yapi-plugin-okta 


### install dependency 
Note: should install the dependency under yapi 

> npm i openid-client

or

> yarn add openid-client

### add settings in config.js of yapi 
```
"plugins": [
    {
        "name": "okta",
        "options": {
          "issuer": "https://auth.sample.com",
          "client_id": "123123",
          "client_secret": "456456",
          "redirect_uri": "http://127.0.0.1:3030/api/user/login_by_token",
          "btnText": "Okta Login"
        }
    }
  ]
```    
The options descriptions:
- `issuer` okta issuer url  
- `client_id`  the okta client id
- `client_secret` the okta client secret 
- `redirect_uri` the redirect url after okta login successfully 
- `btnText` the text of okta login button (optional)


