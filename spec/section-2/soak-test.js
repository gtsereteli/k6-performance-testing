import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Soak Test:
 * 
 * A soak test, also known as endurance or stability testing, is a type 
 * of performance testing that evaluates how a system performs under a 
 * sustained and prolonged workload. The primary goal of a soak test is 
 * to identify potential issues related to system resource utilization, 
 * memory leaks, or degradation in performance over an extended period.
 * 
 * 
 * When to Run:
 * 
 * After identifying performance issues in load tests.
 * To assess long-term system stability.
 * To identify memory leaks or gradual performance degradation
 */

export const options = {
    // Stages define the behavior of the test over time
    stages: [
        {
            duration: '5m',   // Ramp up to 1000 virtual users over 5 minutes
            target: 1000
        },
        {
            duration: '24h',  // Sustain 1000 virtual users for 24 hours
            target: 1000
        },
        {
            duration: '5m',   // Ramp down to 0 virtual users over 5 minutes
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
