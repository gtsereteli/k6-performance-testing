import http from 'k6/http';
import { sleep } from 'k6';

// Following option ignores insecure certificate
export const options = {
    insecureSkipTLSVerify: true,
  };

export default function () {
    http.get('https://self-signed.badssl.com/');
    sleep(1);
}
