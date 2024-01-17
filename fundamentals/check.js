import http from 'k6/http';
import { check } from 'k6';


export default function () {

    // Send an HTTP GET request to the specified URL
    const res = http.get('https://test.k6.io/');

    // Perform checks on the response
    check(res, {
        // Check if the status code is 200 (OK)
        'status is 200': (r) => r.status === 200,

        // Verify if the response body contains specific text indicating the start page
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages'),

        // Illustrate an example of an error condition by checking for incorrect text value
        'error example': (r) => r.body.includes('incorrect text value')
    });
}
