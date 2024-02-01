import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('users.json')).users;
});

export default function () {
    
    // Create new users using data from json file.

    // Navigate to users.json and change few values in username to have
    // unique data and avoid failures due to already existing user.
    // After completing above step, uncomment following code and run the script

    // userCredentials.forEach(user => {
    //     const credentials = {
    //         username: user.username,
    //         password: user.password
    //     };

    //     let registerRes = http.post(
    //         'https://test-api.k6.io/user/register/',
    //         JSON.stringify(credentials),
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     );

    //     check(registerRes, {
    //         'status is 201': (r) => r.status === 201
    //     });

    // });

    const randomCredential = randomItem(userCredentials);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });

    const accessToken = res.json().access;
}
