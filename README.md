# quick-credit

## Badges

[![Build Status](https://travis-ci.org/suleyunus/quick-credit.svg?branch=develop)](https://travis-ci.org/suleyunus/quick-credit)
[![Coverage Status](https://coveralls.io/repos/github/suleyunus/quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/suleyunus/quick-credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b20df12709a5db62096/maintainability)](https://codeclimate.com/github/suleyunus/quick-credit/maintainability)

## About The Project

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners. 

## Built With

This project was developed with:
* [Express.js](https://expressjs.com/) - The server-side framework used
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - The Scripting language used
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - To structure UI templates
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - To style UI templates
* [PostgreSQL](https://postgresql.org) - Database to persist data

## Code Style

This project uses [editorConfig](https://editorconfig.org) to standardize text editor configuration.

This project uses [eslint](https://eslint.org/), together with the [Airbnb style guide](https://github.com/airbnb/javascript) to look out for suspicious code.

## Getting Started

### Prerequisites 

* Text editor such as [VS Code](https://code.visualstudio.com/)
* Install [node.js](https://nodejs.org/en/)
* Install [PostgreSQL](https://www.postgresql.org/)

### Installation 

1. Clone the repo 
```
git clone https://github.com/suleyunus/quick-credit.git
```
2. Install all dependencies using npm
```
npm install
```
## Running the Server

```
npm run start:dev
```
Once the server is running, open a REST client of choice (eg [Postman](https://getpostman.com)) to test the API endpoints.

## Running Tests

### Unit tests

These test logic to APIs including authentication and validation.

```
npm run test
```

### Coding style tests

These check for suspicious code

```
npm run eslint
```

## Deployment 

This app is yet to be deployed. Follow the project to get instructions on how to deploy on a live system.

## Features

This app has the following functionality:
* User (client) can sign up. 
* User (client) can login.
* User (client) can request for ​ only​  one loan at a time. 
* User (client) can view loan repayment history, to keep track of his/her liability or 
responsibilities. 
* Admin can mark a client as ​ verified​ , after confirming his/her home and work address. 
* Admin can view a specific loan application. 
* Admin can approve or reject a client’s loan application.
* Admin can post loan repayment transaction in favour of a client.
* Admin can view all loan applications. 
* Admin can view all current loans (not fully repaid). 
* dmin can view all repaid loans.

## API Endpoints

This app has the following API endpoints:
* POST /auth/signup
* POST /auth/signin
* PATCH /users/<:user-email>/verify
* GET /loans/<:loan-id>
* GET /loans?status=approved&repaid=false
* GET /loans?status=approved&repaid=true
* GET /loans 
* GET /loans/<:loan-id>/repayments
* POST /loans
* PATCH /loans/<:loan-id>
* POST /loans/<:loan-id>/repayment

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch 
5. Open a Pull Request

While contributing to the project, kindly adhere to the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and [naming conventions and best practices](https://github.com/andela/bestpractices/wiki/Git-naming-conventions-and-best-practices)

## Links

### User Interface Pages

[User Interface Pages](https://suleyunus.github.io/quick-credit/UI)

### Project Management

[Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2326969)

## Licence

### MIT
