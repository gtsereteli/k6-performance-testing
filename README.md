# k6 Performance Testing Tool

## Overview

[k6](https://k6.io/) is an open-source performance testing tool designed for testing the performance of APIs, microservices, and websites. It allows developers and QA engineers to create and run performance tests using JavaScript.

## Features

- **Scripting in JavaScript/ES6:** Write test scripts using familiar JavaScript syntax.
- **Scalable Testing:** Simulate thousands of virtual users to test application scalability.
- **Metrics and Results:** Generate detailed performance metrics and analyze test results.
- **Cloud Integration:** Integrate with cloud services for distributed testing.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (for running k6 locally)

### Install k6

```
npm install -g k6
```

## Running Test Scripts with k6

### Load Testing
Run a load test to simulate 100 virtual users for 1 minute:

```bash
k6 run --vus 100 --duration 1m load_test.js
```

## Types of Performance Tests

### Load Testing
Load testing involves simulating a specified number of users to assess system performance under a specific load. With k6, you can easily simulate thousands of virtual users to identify bottlenecks and optimize your system.

### Stress Testing
Stress testing with k6 helps determine how your system behaves under stress by gradually increasing the load. This type of testing helps you understand the breaking point and failure modes of your application.

### API Testing
API testing using k6 allows you to validate API response times and reliability. You can create realistic scenarios to test different API endpoints and understand how they perform under various conditions.

### Endurance Testing
Endurance testing assesses system stability over an extended period. Use k6 to identify potential memory leaks, resource utilization issues, and other long-term performance concerns.

### Scalability Testing
Scalability testing evaluates the system's ability to scale with increased load. With k6, you can gradually increase the number of virtual users to test how well your system scales horizontally.
