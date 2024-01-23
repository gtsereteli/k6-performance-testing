import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    };

    const registerResponse = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(registerResponse, { 'is register status 201': (r) => r.status === 201 });

    const loginResponse = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(loginResponse, { 'is login status 200': (r) => r.status === 200 });

    const accessToken = loginResponse.json().access;
    const crocDetails = {
        name: 'crocodile_' + Date.now(),
        sex: 'M',
        dateOfBirth: "2020-01-01"
    };

    const privatePostResponse = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                "name": crocDetails.name,
                "sex": crocDetails.sex,
                "date_of_birth": crocDetails.dateOfBirth
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(privatePostResponse, {
        'is private response status 201': (r) => r.status === 201,
        'is croc name correct': (r) => r.json().name === crocDetails.name,
        'is croc gender correct': (r) => r.json().sex === crocDetails.sex,
        'is croc date of birth correct': (r) => r.json().date_of_birth === crocDetails.dateOfBirth,
    });


    const crocodileId = privatePostResponse.json().id;
    const getPrivateCrocRes = http.get(
        `https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(getPrivateCrocRes, {
        'is private GET response status 200': (r) => r.status === 200,
        'is GET crocodile name correct': (r) => r.json().name === crocDetails.name,
        'is GET crocodile id correct': (r) => r.json().id === crocodileId,
    });
}
