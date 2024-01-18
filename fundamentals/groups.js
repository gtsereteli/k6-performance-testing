import http from 'k6/http';
import { sleep, group, check } from 'k6';

/**
 * Groups in k6 provide a way to organize and structure your load test script. 
 * They allow you to logically group related HTTP requests and user actions, 
 * making it easier to understand and maintain your test scripts. Groups can 
 * be nested, forming a hierarchy that represents the structure of your application
 */

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<350']
    }
};

export default function () {
    // Group for the main page
    group('Main page', function () {
        const res = http.get('https://test.k6.io/');

        check(res, { 'is status 200': (r) => r.status === 200 });

        // Nested group for assets
        group('Assets', function () {
            // HTTP requests for CSS and JavaScript assets
            const res2 = http.get('https://test.k6.io/static/css/site.css');
            const res3 = http.get('https://test.k6.io/static/js/prisms.js');

            check(res2, { 'is status 200': (r) => r.status === 200 });
            check(res3, { 'status text contains 200': (r) => r.status_text.includes('200 OK') });

            console.log(res3.status_text);
            console.log(res3.headers);
        });
    });

    // Group for the news page
    group('News page', function () {
        const newsRes = http.get('https://test.k6.io/news.php');

        check(newsRes, { 'is status 200': newsRes.status === 200 });
    });

    sleep(1);
}
