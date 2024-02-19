import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Load Test:
 * 
 * A load test is a type of performance testing that assesses 
 * how a system behaves under anticipated and sustained user loads. 
 * The primary objective is to identify the system's capacity, measure 
 * its response time, and uncover potential performance bottlenecks 
 * when subjected to varying levels of concurrent users or transactions.
 * 
 * 
 * When to Run:
 * 
 * Before releasing a new version.
 * To simulate expected user load.
 * To identify performance bottlenecks under normal conditions.
 */

export const options = {
    // Stages define the behavior of the test over time
    stages: [
        {
            duration: '1m',   // Ramp up to 100 virtual users over 1 minute
            target: 100
        },
        {
            duration: '5m',   // Sustain 100 virtual users for 5 minutes
            target: 100
        },
        {
            duration: '1m',   // Ramp down to 0 virtual users over 1 minute
            target: 0
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
