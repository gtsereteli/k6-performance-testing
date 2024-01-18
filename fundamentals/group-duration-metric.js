import http from 'k6/http';
import { sleep, group, check } from 'k6';

// Set performance thresholds for response duration and group durations
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<2000'],
        'group_duration{group:::News page}': ['p(95)<2000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

export default function () {
    // Using Mocky APIs custom delay is added to each endpoint to test conditions for duration
    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=1000ms');
        });
    });


    group('News page', function () {
        http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=5000ms');
    });

    sleep(1);
}
