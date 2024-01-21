import http from 'k6/http';

/**
 * Use following cli commands for debugging
 * 
 * --http-debug logs the HTTP requests and responses, skipping the body.
 * --http-debug="full" logs the HTTP requests and responses, including the full body.
 * 
 * Example: k6 run --http-debug="full" spec\section-4\http-get.js
 */

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
}
