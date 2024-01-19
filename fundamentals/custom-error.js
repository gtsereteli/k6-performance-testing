import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<100'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['count>20'],
        http_reqs: ['rate>4'],
        vus: ['value>9'],
        checks: ['rate>=0.99'] // This check will fail due to condition on line 24
    }
}

export default function () {
    /**
     * Following line of code dynamically modifies URL based on the value of iterationInTest
     * If iterationInTest is 1, it appends 'foo' to the URL; otherwise, it appends an empty string
     * This allows for flexible URL construction and only fails 1 out of ~50 iterations. This is
     * just an example to check how k6 handles small rate of errors.
     */
    const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));

    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(2);
}
