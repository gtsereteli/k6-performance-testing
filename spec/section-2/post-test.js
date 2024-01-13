import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '1s'
};

export default function () {    
    const url = 'https://dummyjson.com/posts/add';

    // Create a payload in JSON format.
    const payload = JSON.stringify({
        title: 'I think I should shift to the moon',
        userId: 5,
    });

    // Set the parameters for the HTTP request
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

     // Send an HTTP POST request and store the response.
    const response = http.post(url, payload, params);
    
     // Perform checks on the response
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is res body has username': (r) => r.body.includes('moon')
    });
}
