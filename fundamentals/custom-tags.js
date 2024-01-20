import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

// Define global thresholds for various metrics
export const options = {
    thresholds: {
        // 95th percentile response time should be below 300ms
        http_req_duration: ['p(95)<300'],  
        // Threshold specific to 'order' page
        'http_req_duration{page:order}': ['p(95)<2500'], 
        // No global HTTP errors allowed
        http_errors: ['count==0'],  
        // No errors allowed for 'order' page
        'http_errors{page:order}': ['count==0'],
        // 99% or more checks should pass globally 
        checks: ['rate>=0.99'],
        // 99% or more checks should pass for 'order' page  
        'checks{page:order}': ['rate>=0.99'],  
    }
};


let httpErrors = new Counter('http_errors');

// Default function that represents the test scenario
export default function () {
    // Make an HTTP request to a mock API
    let res = http.get('https://run.mocky.io/v3/cef9ccd3-7768-45f4-ab95-d2edd7f90db6');

    if (res.error) {
        httpErrors.add(1);
    }

    // Perform a check to validate the response status
    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Make another HTTP request with a custom tag for 'order' page
    res = http.get(
        'https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    // Perform a check with a custom tag to validate the response status for 'order' page
    check(res, { 'status is 201': (r) => r.status === 201 }, { page: 'order' });

    // Sleep for 1 second between iterations
    sleep(1);
}
