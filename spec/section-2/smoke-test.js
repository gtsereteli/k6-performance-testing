import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//     vus: 1,
//     duration: '10s'
// };

export const options = {
    stages: [
        { duration: '5s', target: 5 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
        { duration: '10s', target: 10 }, // stay at 100 users for 30 minutes
        { duration: '5s', target: 0 }, // ramp-down to 0 users
    ],
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}
