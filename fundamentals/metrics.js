import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

// Configuration for k6 options, including virtual users (vus), duration, and thresholds
export const options = {
    vus: 10, // Number of virtual users (concurrent users) to simulate
    duration: '10s', // Duration of the test
    thresholds: {
        // 95th percentile response time should be below 100ms
        http_req_duration: ['p(95)<100'], 
        // Maximum response time should be below 2 seconds
        http_req_duration: ['max<2000'], 
        // Failure rate should be below 10%
        http_req_failed: ['rate<0.1'], 
        // Total number of requests should be more than 20
        http_reqs: ['count>20'], 
        // Request rate should be more than 4 requests per second
        http_reqs: ['rate>4'], 
        // Number of Virtual Users should be more than 9
        vus: ['value>9'], 
        // Success rate of checks should be 99% or higher
        checks: ['rate>=0.99'] 
    }
};

// Main test function
export default function () {
    // HTTP request to the specified URL based on the iteration
    const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));

    // Check assertions on the response
    check(res, {
        'is status 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });

    // Introduce a sleep of 2 seconds between iterations
    sleep(2);
}
