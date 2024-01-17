import http from 'k6/http';

/**
 * Concept of Tags in k6: 
 * 
 * In k6, tags provide a way to categorize and filter measurement results 
 * during testing, allowing users to analyze specific subsets of data based 
 * on predefined criteria. Tags are often used to differentiate requests based 
 * on status codes, endpoints, or any custom criteria. 
 * 
 * In the following script, the http_req_duration thresholds are defined for the 
 * 95th percentile response time, and tags are applied to differentiate between 
 * requests with different status codes. 
 * 
 * The tags help in creating specific thresholds for requests with a particular status, 
 * enabling a more granular performance analysis. This script could benefit from comments 
 * to explain the purpose of each HTTP request and its expected behavior.
 */

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
};

export default function () {
    http.get('https://run.mocky.io/v3/cef9ccd3-7768-45f4-ab95-d2edd7f90db6');
    http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=2000ms');
}
