## Endpoint: `/update`

### HTTP Method: `PATCH`

**Description:** This endpoint is used to update the player's profile.

**Request Body:** The request body should contain the following JSON fields:

-   `name`: string (required)
-   `password`: string (required)

Example Request Body:


`{
  "name": "JohnDoe",
  "password": "MySecurePassword123"
}` 

**Request Headers:** The request headers must contain a valid JWT token for authentication.

Example Request Headers:

`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc` 

**Response:**

-   Status Code: `200 OK`
-   Response Body: The response body will be empty.

**Possible Errors:**

-   `404 Not Found`: This error is returned if the user is not found.
-   `400 Bad Request`: This error is returned if the password is not provided or if there is an error during update.
-   `401 Unauthorized`: This error is returned if the JWT token is invalid or expired.
-   `500 Internal Server Error`: This error is returned if there is an internal server error during the update process.