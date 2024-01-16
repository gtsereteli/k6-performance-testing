import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Breakpoint Test:
 * 
 * A breakpoint test is a performance testing strategy that focuses 
 * on determining the specific point at which a system's performance 
 * begins to degrade or fail. It involves gradually increasing the load 
 * on the system until a breaking point is reached, allowing testers to 
 * identify the maximum capacity, uncover bottlenecks, and understand 
 * the system's behavior under stress.
 * 
 * 
 * When to Run a Breakpoint Test:
 * 
 * Breakpoint tests are valuable after stress testing to pinpoint the 
 * load level at which a system degrades or fails. Perform breakpoint 
 * testing before production scaling, following system upgrades, during 
 * optimization efforts, and in preparation for major events or campaigns. 
 * This sequential approach ensures a systematic evaluation of system 
 * performance and resilience.
 */

export const options = {
    // Configure a single stage for the breakpoint test
    stages: [
        {
            duration: '2h',    // Run the test for 2 hours
            target: 100000     // Sustain a load of 100,000 virtual users
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
