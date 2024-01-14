import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of a Load Test:
 * 
 * A load test is a type of performance testing that involves 
 * evaluating how a system behaves under expected and peak load conditions. 
 * The goal is to assess the system's performance, scalability, and 
 * reliability by simulating a realistic number of concurrent users 
 * or transactions.
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
