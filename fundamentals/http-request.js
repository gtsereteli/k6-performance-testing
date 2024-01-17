import http from 'k6/http';

/**
 * Fetches test data from 'https://test.k6.io/' using a GET request
 * and logs response properties.
 */
export default function () {
    // Send an HTTP GET request to 'https://test.k6.io/'
    const res = http.get('https://test.k6.io/');

    // Log HTTP status code
    console.log(`HTTP Status: ${res.status}`);

    // Log response time
    console.log(`Response Time: ${res.timings.duration} ms`);

    // Log the full response body
    console.log(`Full response body: ${res.body}`);
}
