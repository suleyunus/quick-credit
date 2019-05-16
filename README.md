# quick-credit

## Badges

[![Build Status](https://travis-ci.org/suleyunus/quick-credit.svg?branch=develop)](https://travis-ci.org/suleyunus/quick-credit)
[![Coverage Status](https://coveralls.io/repos/github/suleyunus/quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/suleyunus/quick-credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b20df12709a5db62096/maintainability)](https://codeclimate.com/github/suleyunus/quick-credit/maintainability)

## About The Project

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners. 

## Motivation

This project has been built in response to the Andela Developer Challenge.

## Built With

This project was developed with:
* Express.js
* JavaScript
* HTML
* CSS
* JavaScript Objects as Database

## Code Style

This project uses [editorConfig](https://editorconfig.org) to standardize text editor configuration.

This project uses [eslint](https://eslint.org/), together with the [Airbnb style guide](https://github.com/airbnb/javascript) to look out for suspicious code.

## Getting Started

### Prerequisites 

* Text editor
* Install [node.js](https://nodejs.org/en/) 

### Installation 

1. Clone the repo 
```
git clone https://github.com/suleyunus/quick-credit.git
```
2. Install all dependencies using npm
```
npm install
```
### Running the Server

```
npm run start:dev
```

### Running Tests

```
npm run test
```

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

### Entity Specification

1. Users
```
{
  ​“id” ​:​ ​Integer​,  
  ​“email” ​:​ ​String​, 
  ​“firstName” ​:​ ​String​, 
  ​“lastName” ​:​ ​String​, 
  “password” ​:​ ​String​, 
  “address” ​:​ ​String​, 
  ​“status” ​:​ ​String​,​             ​// unverified or verified 
  “isAdmin” ​:​ ​Boolean​
} 
```

2. Loans

```
{
  "id” ​:​ ​Integer​,  
  “user” ​:​ ​String​,               // user email 
  ​“createdOn” ​:​ ​DateTime​, 
  ​“status” ​:​ ​String​,             // pending, approved, rejected 
  “repaid” ​:​ ​Boolean​, 
  ​“tenor” ​:​ ​Integer​,             // maximum of 12 months 
  ​“amount” ​:​ ​Float​,   
  “paymentInstallment” ​:​ ​Float​,  // monthly installment payment = (amount + interest) / tenor 
  ​“balance” ​:​ ​Float​, 
  ​“interest”​: ​Float​           // 5% of amount 
}
```

3. Repayments

```
{
  ​“id” ​:​ ​Integer​,   
  ​“createdOn” ​:​ ​DateTime​, 
  “loanId” ​:​ ​Integer​, 
  ​“amount” ​:​ ​Float​
}
```

### API Endpoint Specification

1. ``` POST /api/v1/auth/signup```

Creates User Account

Response Spec
```
{
  “status” ​:​ ​201​,  
  ​“data” ​:​ ​{ 
    “token” ​:​ ​ “45erkjherht45495783” 
    ​“id”​:​ Integer​,     // id of newly created user 
    ​“firstName”​: ​String​, 
    ​“lastName”​: ​String​, 
    ​“email”​: ​String​, 
    ... 
  ​}
}
```

2. ``` POST /api/v1/signin```

Login a User

Response Spec:
```
{
  "status” ​:​ ​200​, 
  ​“data” ​:​ ​{ 
    “token” ​:​ ​ “45erkjherht45495783” 
    ​“id”​:​ Integer​,     // user id 
    ​“firstName”​: ​String​, 
    ​“lastName”​: ​String​, 
    ​“email”​: ​String​, 
    ... 
  ​}
}
```

3. ```PATCH  /users/<:user-email>/verify```

Mark a User as Verified

Response Spec:
```
{
  “status” ​:​ ​200​, 
  ​“data” ​:​ ​{  
    ​“email” ​:​ ​String​, 
    ​“firstName” ​:​ ​String​, 
    ​“lastName” ​:​ ​String​, 
    “password” ​:​ ​String​, 
    “address” ​:​ ​String​,   
    ​“status” ​:​ ​String​, 
    ... 
  }
}
```

4. ```GET  /loans/<:loan-id>```

Get a Specific Loan Application

Response Spec:
```
{
  “status” ​:​ ​200​, 
  ​“data” ​:​ ​{ 
    ​“id” ​:​ ​Integer​,  
    “user” ​:​ ​String​,   
    ​“createdOn” ​:​ ​DateTime​, 
    ​“status” ​:​ ​String​,   
    “repaid” ​:​ ​Boolean​, 
    ​“tenor” ​:​ ​Integer​,   
    ​“amount” ​:​ ​Float​,   
    “paymentInstallment” ​:​ ​Float​,  
    ​“balance” ​:​ ​Float​, 
    “interest” ​:​ ​Float​, 
    ... 
  }
}
```

5. ```GET  /loans?status=approved&repaid=false```

Get all current loans that are not fully repaid

Response Spec:
```{
  “status” ​:​ ​200​, 
  ​“data” ​:​ ​[ 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      “interest” ​:​ ​Float​, 
      ... 
    }, 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​,
        ... 
    }, 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    } 
  ​]
}
```

6. ```GET  /loans?status=approved&repaid=true```

Get all repaid loans

```
{
  “status” ​:​ ​200​, 
  ​“data” ​:​ ​[ 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    }, 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    }, 
    {“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    } 
  ​]
}
```

7. ```GET  /loans```

Get all loan applications

```
{
  “status” ​:​ ​200​, 
  ​“data” ​:​ ​[ 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    }, 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    }, 
    { 
      ​“id” ​:​ ​Integer​,  
      “user” ​:​ ​String​,   
      ​“createdOn” ​:​ ​DateTime​, 
      ​“status” ​:​ ​String​,   
      “repaid” ​:​ ​Boolean​, 
      ​“tenor” ​:​ ​Integer​,   
      ​“amount” ​:​ ​Float​,   
      “paymentInstallment” ​:​ ​Float​,  
      ​“balance” ​:​ ​Float​, 
      ​“interest” ​:​ ​Float​, 
      ... 
    } 
  ​]
}
```

8. ```GET  /loans/<:loan-id>/repayments```

View loan repayment history

Response Spec:

```
{
  “status” ​:​ ​Integer​, 
  ​“data” ​:​ ​{ 
    ​“loanId” ​:​ ​Integer​, 
    “createdOn” ​:​ ​DateTime​, 
    ​“monthlyInstallment”​: ​Float​,  // what the user is expected to pay 
    “amount” ​:​ ​Float​, 
    ... 
  }
}
```

9. ```POST /loans```

Create a loan application

```
{
  “status” ​:​ ​Integer​, 
  ​“data” ​:​ ​{ 
    “loanId”​: ​Number​, 
    ​“firstName”​: ​String​, 
    ​“lastName”​: ​String​, 
    ​“email”​: ​String​, 
    ​“tenor”​: ​String​, 
    ​“amount” ​:​ ​Float​, 
    “paymentInstallment” ​:​ ​Float​, 
    “status” ​:​ ​String​,      // should default to pending 
    ​“balance” ​:​ ​Float​, 
    ​“interest” ​:​ ​Float​, 
    ... 
  ​}
}
```

10. ```PATCH  /loans/<:loan-id>```

Approve or reject a loan application. Specify the status in the request’s body. 

Response Spec:

```
{
    
  “status” ​:​ ​Integer​, 
  ​“date” ​:​ ​{  
    ​“loanId” ​:​ ​Integer​, 
    ​“loanAmount”​: ​Float​, 
    ​“tenor”​: ​Integer​, 
    ​“status” ​:​ ​String​,       // approved or rejected 
    ​“monthlyInstallment” ​:​ ​Float​, 
    ​“interest” ​:​ ​Float​, 
    .... 
  }
}
```

11. ```POST  /loans/<:loan-id>/repayment```

Create a loan repayment record

Response Spec:

```
{
  ​“status” ​:​ ​Integer​,  
  ​“data” ​:​ ​{ 
    ​“id” ​:​ ​Integer​, 
    “loanId”: ​Integer​,   
    ​“createdOn” ​:​ ​DateTime​, 
    “loanId” ​:​ ​Integer​, 
    ​“amount” ​:​ ​Float​,             // loan amount 
    ​“monthlyInstallment”​: ​Float​,  // what the user is expected to pay 
    “paidAmount” ​:​ ​Float​, 
    ​“balance”​: ​Float​, 
    ....  
  }
}
```

## Contributing

While we love contributions, this project doesn't allow contributions. You can fork it, however.

## Links

### User Interface Pages

[User Interface Pages](https://suleyunus.github.io/quick-credit/UI)

### Project Management

[Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2326969)

## Licence

### MIT