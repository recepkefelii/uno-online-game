## Yeni Oyun Oluşturma Eventi

Yeni bir oyun oluşturmak için `@SubscribeMessage('newGame')` eventi kullanılır. Bu event, `onNewGame` adında bir fonksiyon tarafından işlenir. Bu fonksiyon, `createGameDto` tipinde bir `body` parametresi ve `socket` adlı bir bağlantı parametresi alır.


Bağlantı parametresi, oyun sahibinin kullanıcı adını içeren `socket.handshake.query.username` özelliğinden alınır. Daha sonra, bu kullanıcı adı ve `body` parametresi `gameService.createGame` fonksiyonuna gönderilir.


`gameService.createGame` fonksiyonu, verilen `body` ve oyun sahibinin kullanıcı adını kullanarak oyunu oluşturur. İlk olarak, verilen oyun sahibinin kullanıcı adına ait bir oyuncu bulunur. Daha sonra, eğer oyun gizli (private) ise şifreleme işlemi yapılır ve şifrelenmiş şifre oyun veritabanına kaydedilir. Eğer oyun açık (public) ise şifreleme işlemi yapılmaz. Her iki durumda da oyun veritabanına kaydedilir ve tüm oyunlar geri döndürülür.

Oyun oluşturulduktan sonra, `socket.broadcast.emit` ile tüm bağlantılara `onNewGame` eventi gönderilir ve `newGame` objesi ile birlikte oyun verileri gönderilir. Son olarak, oluşan oyun verileri geri döndürülür.



##### Create Game Dto( `Data Transfer Objects` )
Projede kullanılan `create.game-dto.ts` dosyasının içerisindeki data tipleri.
| Property | Type | Validation |
|----------|------|-----------|
| name | string | @IsString()<br>@Length(10, 20) |
| currentPlayers | number | @IsNumber() |
| maxPlayers | number | @IsNumber() |
| password | string | @IsString() |
| isPrivate | boolean | @IsBoolean() |



## Örnek Kullanım json ile
Socket bağlandıktan sonra json veri göndermeniz gerekiyor socket eğer bağlanamıyorsanız
lütfen **kayıt** olma işlemini yapın ve sonra socket bağlanmayı tekrar deneyin.


Socket bağlandınızı varsayıyorum **json** formatında veri göndermeniz gerekiyor.
#### 1 : Public game oluşturma 
{
"name":"oda isminiz",
"maxPlayers":2,
"isPrivate":false
}

Yukarıdaki örneği olduğu gibi kopyalayarak kullanabilirsiniz.

#### 2 : Private game oluşturma

{

"name":"oda isminiz",
"maxPlayers":3,
"isPrivate":true,
"password":"şifreniz"
}

Odanızın eğer isPrivate propertysi true olucaksa bir şifre belirlemek zorundasınız ve şifreniz bir karakter **limitlemesi** henüz yok
