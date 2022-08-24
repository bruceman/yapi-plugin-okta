import React from 'react';
import axios from 'axios';


module.exports = function (options) {
    const { btnText = 'OKTA 登陆'} = options || {};

    const handleLogin = async (props = {}) => {
        const res = await axios.get('/api/plugin/okta/get_login_url');
        const url = res.data.data;

        if (url) {
            location.href = url;
        } else {
            alert('api call failed!');
        }
    };
    const OktaLoginComponent = (props = {}) => (
        <button onClick={() => handleLogin(props)} className='btn-home btn-home-normal btn-okta-login'>
            { btnText }
        </button>
    );

    this.bindHook('third_login', OktaLoginComponent);
};

