import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

/**
 * Thresholds in k6:
 * 
 * Thresholds in k6 are criteria set to evaluate the performance test results 
 * and determine whether the application meets the specified performance goals. 
 * They help in defining acceptable performance levels and identifying areas for 
 * improvement. Thresholds can be set on various metrics such as response time, 
 * failure rate, request count, and more. 
 * 
 * In the following script, thresholds are configured in the options block to 
 * check metrics like response time, failure rate, request count, and the 
 * success rate of checks.
 */

export const options = {
    vus: 10, // Simulate 10 Virtual Users (concurrent users)
    duration: '10s',
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
        // Example of how to combine multiple checks
        http_reqs: ['count>20', 'rate>4'],
        // Number of Virtual Users should be more than 9
        vus: ['value>9'],
        // Success rate of checks should be 99% or higher
        checks: ['rate>=0.99']
    }
};

export default function () {
    // Send an HTTP GET request to 'https://test.k6.io/'
    const res = http.get('https://test.k6.io/');

    // Perform checks on the response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is start page': (r) => r.body.includes('Collection of simple web-pages')
    });

    // Sleep for 2 seconds
    sleep(2);
}
