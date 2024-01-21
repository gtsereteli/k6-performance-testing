import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    };

    const registerResponse = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(registerResponse, { 'register status is 201': registerResponse.status === 201 });

    let loginResponse = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(loginResponse, { 'login status in 200': loginResponse.status === 200 });

    const accessToken = loginResponse.json().access;
    console.log('Access Token : ' + accessToken);

    const myCrocResponse = http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(myCrocResponse, { 'my crocodiles status in 200': myCrocResponse.status === 200 });
}
