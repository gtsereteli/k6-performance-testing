import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        // Duration of HTTP requests should be below 250 milliseconds for at least 95% of executions
        http_req_duration: ['p(95)<250'],
        // Duration of this group should be below 200 milliseconds for at least 95% of executions
        'group_duration{group:::Main page}': ['p(95)<200'],
        // Duration of this group should be below 200 milliseconds for at least 95% of executions
        'group_duration{group:::Main page::Assets}': ['p(95)<200'],
    }
};

export default function () {
    group('Main page', function () {
        const res = http.get('https://test.k6.io/');
        check(res, { 'is status 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });


    group('News page', function () {
        const newsRes = http.get('https://test.k6.io/news.php');
        check(newsRes, { 'is status 200': (r) => r.status === 200 });
    });

    sleep(1);
}
