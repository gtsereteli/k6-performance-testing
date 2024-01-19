import { sleep } from 'k6';

/**
 * In k6, the lifecycle consists of three key stages: setup, main, and teardown. 
 * 
 * The setup() function is executed once at the start of the test, allowing for 
 * initialization tasks like authentication or resource validation. 
 * 
 * The default function (main) is the core of the test script and is repeatedly 
 * called during the test, representing the actions performed by each virtual 
 * user (VU). It contains the logic for making HTTP requests, performing checks, 
 * and simulating user behavior. 
 * 
 * The teardown() function is executed once at the end 
 * of the test, providing an opportunity for cleanup tasks, such as closing 
 * connections or releasing resources. 
 */

export const options = {
    vus: 1,
    duration: '3s'
};

console.log(' -- init stage --');

export default function (data) {
    console.log('-- VU stage --');
    console.log(data);
    sleep(1);
}

export function setup() {
    console.log('');
    console.log('-- setup stage (runs once per execution) --');
    sleep(3);
    const data = 'data from setup function';
    console.log('');
    return data;
}

export function teardown(data) {
    console.log('');
    console.log('-- Teardown stage (runs once per execution) --');
    console.log('');
}
