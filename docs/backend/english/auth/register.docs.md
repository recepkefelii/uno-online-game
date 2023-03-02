# Endpoint: `api/auth/register`

HTTP Method: `POST`

## Description

This endpoint is used to create a new player registration and generate a JWT token for authentication purposes.

## Request Body

The request body must contain the following JSON fields:

-   `name`: string (required)
-   `password`: string (required)

Example request body:

jsonCopy code

`{ "name": "JohnDoe", "password": "MySecurePassword123" }`

## Response

### Status Codes

-   `200 OK`: Returned when the request is successful.

### Response Body

The response body will contain the JWT token that will be used for authentication purposes.

Example response:

Copy code

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc`

### Possible Errors

-   `400 Bad Request`: Returned when any of the required fields are missing or there is an error during registration.
-   `500 Internal Server Error`: Returned when there is an internal server error during the registration process.