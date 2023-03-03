## `PATCH api/auth/update`

Bu endpoint, kullanıcının hesap bilgilerini güncellemek için kullanılır. Bu işlem için, kullanıcının önceden kimlik doğrulama işleminden geçmiş olması gerekmektedir.

### Request

-   HTTP Method: `PATCH`
    
-   Endpoint: `/update`
    
-   Request Body: Bu endpoint, bir `UpdateDto` JSON nesnesi alır. Bu nesnenin özellikleri şunlardır:
    
    -   `name`: Yeni kullanıcı adı (string, zorunlu)
    -   `password`: Yeni şifre (string, zorunlu)
    
    Örnek request body:
    
    `{
      "name": "YeniKullaniciAdi",
      "password": "YeniGüçlüŞifre123"
    }` 
    
-   Headers: Bu istek için, kimlik doğrulama amacıyla JWT tokenı içeren `Authorization` header'ı gereklidir.
    

### Response

-   Status Code: `200 OK`
-   Response Body: Herhangi bir response body içermez.

### Possible Errors

-   `401 Unauthorized`: Bu hata, kullanıcının kimlik doğrulama işleminden geçmediği durumlarda döndürülür.
-   `404 Not Found`: Bu hata, kullanıcının verilen kimlik bilgilerine sahip hesabının bulunamadığı durumlarda döndürülür.
-   `500 Internal Server Error`: Bu hata, sunucu tarafında bir hata oluştuğunda döndürülür.

### Örnek Kullanım


`curl -X PATCH \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.9zo6UTdUxetTjT0zv1ZT0wZL-90KUa-A6U_Y_EsU9Pc" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "YeniKullaniciAdi",
        "password": "YeniGüçlüŞifre123"
      }' \
  http://localhost:3000/api/auth/update`