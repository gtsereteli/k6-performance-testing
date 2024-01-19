import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

/**
 * The abort functionality in k6 is used to stop the test execution based on 
 * specified conditions. In the provided script, the setup function is used 
 * to make an initial request to check the status of the application. 
 * If the response indicates an error, the exec.test.abort function is 
 * called to abort the test, providing a reason for the abort.
 */

export const options = {
    vus: 10,
    duration: '60s'
};

/**
 * The setup function is executed once at the beginning of the test, 
 * and its purpose is to prepare any necessary resources or perform 
 * actions needed before the main test logic runs.
 */
export function setup() {
    let res = http.get('https://test.k6.local/status');
    if (res.error) {
        exec.test.abort('Aborting test. Application is DOWN');
    }
} 

export default function () {
    // Following incorrect url will cause an error
    http.get('https://test.k6.local/some-page');
    sleep(1);
}
