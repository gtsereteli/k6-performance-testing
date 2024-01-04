import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '1s'
};

export default function () {
    const url = 'https://dummyjson.com/posts/add';
    const payload = JSON.stringify({
        title: 'I think I should shift to the moon',
        userId: 5,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is res body has username': (r) => r.body.includes('moon')
    });
}
