# Endpoint: `api/auth/login`

HTTP Method: `POST`

## Description

This endpoint is used to authenticate an existing player and generate a JWT token for authentication purposes.

## Request Body

The request body must contain the following JSON fields:

-   `name`: string (required)
-   `password`: string (required)

Example request body:

jsonCopy code

`{
  "name": "JohnDoe",
  "password": "MySecurePassword123"
}` 

## Response

### Status Codes

-   `200 OK`: Returned when the request is successful.

### Response Body

The response body will contain the JWT token to be used for authentication purposes.

Example response:


`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc` 

### Possible Errors

-   `400 Bad Request`: This error is returned if any of the required fields are missing or if there is an error during registration.
-   `404 Not Found`: This error is returned if a user with the given username cannot be found.
-   `401 Unauthorized`: This error is returned if the credentials provided by the user are invalid.

## Example

### Request


`POST /login HTTP/1.1
Content-Type: application/json

{
  "name": "JohnDoe",
  "password": "MySecurePassword123"
}` 

### Response


`HTTP/1.1 200 OK
Content-Type: application/json

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc`