## Creating a New Game Event

  

The `@SubscribeMessage('newGame')` event is used to create a new game. This event is processed by a function named `onNewGame`. This function takes a `body` parameter of type `createGameDto` and a connection parameter named `socket`.

  

The connection parameter is obtained from the `socket.handshake.query.username` property, which contains the username of the game owner. The username and the `body` parameter are then sent to the `gameService.createGame` function.

  

The `gameService.createGame` function creates the game using the given `body` and the username of the game owner. Firstly, the player associated with the given username of the game owner is found. Then, if the game is private, encryption is performed and the encrypted password is saved in the game database. If the game is public, encryption is not performed. In both cases, the game is saved in the game database and all games are returned.

  

After the game is created, the `onNewGame` event is sent to all connections using `socket.broadcast.emit`, along with the game data in the `newGame` object. Finally, the created game data is returned.

  

##### Create Game Dto(Data Transfer Objects)

  

The data types used in the `create.game-dto.ts` file in the project.

  



| Property | Type | Validation |
|----------|------|-----------|
| name | string | @IsString()<br>@Length(10, 20) |
| currentPlayers | number | @IsNumber() |
| maxPlayers | number | @IsNumber() |
| password | string | @IsString() |
| isPrivate | boolean | @IsBoolean() |


  

## Example

  

You need to send data in the json format after connecting to the socket. If you cannot connect to the socket, please register and try connecting to the socket again.

  

I assume you have connected to the socket, you need to send data in **json** format.

  

#### 1 : Creating a public game

  

{ "name":"your room name", "maxPlayers":2, "isPrivate":false }

  

You can use the example above by copying it.

  

#### 2 : Creating a private game

  

{ "name":"your room name", "maxPlayers":3, "isPrivate":true, "password":"your password" }

  

If your room's isPrivate property is true, you must set a password and there is no character limit yet for your password.
