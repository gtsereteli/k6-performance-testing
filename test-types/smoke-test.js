import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Concept of Smoke Test:
 * 
 * The concept of a "smoke test" typically refers to a quick and minimal test 
 * to ensure that the basic functionalities of an application or system are 
 * working under a specified level of load. Smoke tests are usually designed 
 * to catch major issues quickly, making them a useful practice before running 
 * more comprehensive performance tests.
 * 
 * 
 * When to Run:
 * 
 * Before major releases.
 * After significant changes to the application.
 * As a quick check for critical functionality.
 */

export const options = {
    vus: 1,
    duration: '30s'
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}
