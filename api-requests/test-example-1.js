import http from 'k6/http';
import { check } from 'k6';

export default function () {

    // Create payload to register unique user
    const payload = JSON.stringify({
        username: 'user' + Date.now(),
        password: 'passsword' + + Date.now()
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Send POST request to register user
    const registerResponse = http.post('https://test-api.k6.io/user/register/', payload, params);
    check(registerResponse, {
        'is create new user status 201': (r) => r.status === 201
    });

    // Send POST request with existing user details to retrieve access and refresh tokens
    let res = http.post('https://test-api.k6.io/auth/token/login/', payload, params);
    check(res, {
        'is login status 200': (r) => r.status === 200,
        'res body contains access and refresh tookens': (r) => 'refresh' in r.json() && 'access' in r.json()
    });
}
