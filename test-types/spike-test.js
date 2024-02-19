import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Spike Test:
 * 
 * A spike test is a type of performance testing that involves rapidly increasing or 
 * decreasing the number of virtual users to evaluate how the system handles sudden 
 * spikes or drops in load. The provided code simulates a spike by quickly increasing 
 * the number of virtual users to 2000 and then ramping down to 0, allowing you to 
 * observe the system's behavior under varying levels of load.
 * 
 * 
 * When to Run:
 * 
 * During marketing events or promotions.
 * When expecting sudden increases in traffic.
 * To assess how the system handles rapid load changes.
 */

export const options = {
    stages: [
        {
            duration: '2m', // First stage: 2 minutes
            target: 2000    // Ramp up to 2000 virtual users
        },
        {
            duration: '1m', // Second stage: 1 minute
            target: 0       // Ramp down to 0 virtual users
        }
    ]
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
