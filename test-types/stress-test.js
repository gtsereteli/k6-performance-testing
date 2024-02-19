import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Stress Test:
 * 
 * A stress test is a performance testing method designed 
 * to evaluate a system's robustness and stability under 
 * extreme conditions or beyond its expected maximum capacity. 
 * The primary goal is to identify how well the system can handle 
 * increased load, assess its behavior under stress, and determine 
 * whether it degrades gracefully or experiences failures.
 * 
 * 
 * When to Run a Stress Test:
 * 
 * Stress tests are crucial after load testing to evaluate how well 
 * a system handles increased load. Conduct stress testing before production 
 * deployments, during peak usage periods, following infrastructure changes, 
 * and in response to identified performance issues.
 */

export const options = {
    stages: [
        {
            duration: '10s',  // First stage: 10 seconds
            target: 1000      // Simulate 1000 virtual users
        },
        {
            duration: '30m',  // Second stage: 30 minutes
            target: 1000      // Maintain 1000 virtual users
        },
        {
            duration: '10s',  // Third stage: 10 seconds
            target: 0         // Ramp down to 0 virtual users
        }
    ]
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}
