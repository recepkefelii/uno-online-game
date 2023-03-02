# Endpoint: `api/auth/register`

HTTP Method: `POST`

## Description

Bu endpoint, yeni bir oyuncu kaydı oluşturmak ve kimlik doğrulama için JWT token oluşturmak için kullanılır.

## Request Body

İstek gövdesi aşağıdaki JSON alanlarını içermelidir:

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
-   `500 Internal Server Error`: Bu hata, kayıt süreci sırasında bir dahili sunucu hatası olması durumunda döndürülür.