# **42 ft_transcendence**

## **Backend**
- [NestJS](https://docs.nestjs.com/)
- [useGlobalPipes](https://docs.nestjs.com/pipes#global-scoped-pipes): Can be used to apply a global [ValidationPipe](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe) For validating DTOs
- [useGlobalFilters](https://docs.nestjs.com/exception-filters#binding-filters): Can be used to apply [ExceptionFilters](https://docs.nestjs.com/exception-filters#exception-filters-1) to catch all thrown exception in Controllers and Services
- [enableCors](https://docs.nestjs.com/security/cors#getting-started): If your frontend is in a different host, your back should configure cors to allow your frontend host
- [cookieParser](): An external package that can pass into `app.use()` for parsing HTTP cookies
- [swagger](https://docs.nestjs.com/openapi/introduction): NestJS has its own module for swagger and its being used to document APIs
- [useGuards](https://docs.nestjs.com/guards#binding-guards): Its a decorator for endpoints that will give permission to whether to activate the controller based off the HTTP request body. There is also a global guards or it can also be module specific
- [useWebSocketAdapter](https://www.youtube.com/watch?v=4CZkqP_IH-Q&t=549s): This allows you to configure your own websocket adapter, for CORS, middleware and more.
- [Prisma](https://docs.nestjs.com/recipes/prisma): Prisma is an ORM for Nodejs and Typescript. It is easy to use and well documented.
- [NextAuthJS](https://next-auth.js.org/): NextAuth is a frontend authentication library. It requires some configuration for the [database](https://authjs.dev/reference/adapter/prisma)
- [Gateways](https://docs.nestjs.com/websockets/gateways#installation): Create [socket.io](https://socket.io/docs/v4/server-installation/) gateways in NestJS

## **Frontend**
- [Antd](https://ant.design/components/overview/): A frontend library and has many ready to use components and ease the development
- [Antd ProComponents](https://procomponents.ant.design/en-US/components): A set of ready to use components
- [NextAuthJS](https://next-auth.js.org/)
- [pixi-react](https://github.com/pixijs/pixi-react): A library that allows you to render PIXI application in react. This is being installed for the pong game
- [socket.io-client](https://socket.io/docs/v4/client-installation/): A client side socket.io which allows your to connect to gateways at backend and emit messages

## **Challenges**
- Learning socket.io and implement it in both frontend and backend.
- Constructing the Pong game logic flow from start of the game to end of the game, while syncing the game state for both clients and making sure that disconnection can resume to the same game room.
- Add some custom fields and extract some informations from the 42 Oauth callbacks while using NextAuthJS.
- Deployment with docker, both backend and frontend, and able to run on the local network so other machines the local network are able to connect to the side.
