# Endpoint: `/login`

HTTP Method: `POST`

## Description

Bu endpoint, mevcut bir oyuncunun kimlik doğrulamasını gerçekleştirmek ve kimlik doğrulama için JWT token oluşturmak için kullanılır.

## Request Body

İstek gövdesi, aşağıdaki JSON alanlarını içermelidir:

-   `name`: string (zorunlu)
-   `password`: string (zorunlu)

Örnek istek gövdesi:

jsonCopy code

`{
  "name": "JohnDoe",
  "password": "MySecurePassword123"
}` 

## Response

### Status Codes

-   `200 OK`: İstek başarılı olduğunda döndürülür.

### Response Body

Yanıt gövdesi, kimlik doğrulama amaçları için kullanılacak JWT token'ı içerecektir.

Örnek yanıt:

Copy code

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc` 

### Possible Errors

-   `400 Bad Request`: Bu hata, gerekli alanlardan herhangi birinin eksik olması veya kayıt sırasında bir hata olması durumunda döndürülür.
-   `404 Not Found`: Bu hata, kullanıcı adına sahip bir kullanıcının bulunamaması durumunda döndürülür.
-   `401 Unauthorized`: Bu hata, kullanıcının sağladığı kimlik bilgilerinin geçersiz olması durumunda döndürülür.

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