import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const payload = JSON.stringify({
        username: 'test' + Date.now(),
        password: 'test' + + Date.now()
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post('https://test-api.k6.io/user/register/', payload, params);
}
