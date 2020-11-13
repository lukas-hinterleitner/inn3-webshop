# REST API Web Service
This file will contain all documentation related to web-shop Restful APIs and server side implementation used for this project.

To start the web service, you should use Apache server to run it.

## Public API list
| Type | Name                     | Description                                   |
|------|--------------------------|-----------------------------------------------|
| GET  | /products                | Get all products                              |
| GET  | /products/:id            | Get product with specific ID                  |
| GET  | /get-product/:internCode | Get product with specific intern article code |
| POST | /login                   | API for login existing user                   |
| POST | /register                | API for registration of existing user         |
| GET  | /user-info               | Authorization to get user data                |

#### Login example:
```json
{
    "pwd": "MyPass1234",
    "email": "sm@test-mail.com"
}
```

#### User info example:
Header Key: Authorization
Header Value: Bearer {token}

#### Registration example:
```json
{
    "firstname": "Stefan",
    "lastname": "Miljevic",
    "pwd": "MyPass1234",
    "email": "sm@test-mail.com",
    "country": "Austria",
    "city": "Vienna",
    "address": "MyAdress 42",
    "zip": "1234"
}
```