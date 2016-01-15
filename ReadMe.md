# FavouriteVideos

> My first MEAN Stack application

### Setup

##### Development

1. Make sure that at least [NodeJS](https://nodejs.org/en/),
[Bower](http://bower.io/) and [MongoDB](https://www.mongodb.org/) are installed.
2. Clone and cd into this repository
3. Run `npm install`
4. Run `bower install`
5. Set the environment variables:
  - COOKIE_SECRET ('napoleon' should work)
  - SESSION_SECRET ('napoleon' should work)
  - DATABASE_HOST ('localhost' should work)
  - DATABASE_PORT ('27017' should work)
6. Open another shell instance and run `mongod`
7. Run `npm start`

##### Docker

```sh
# Set the SECRET environment variables
$ export COOKIE_SECRET=anystring
$ export SESSION_SECRET=anystring

# Build
$ docker-compose build

# Run
$ docker-compose up -d
```

The server's machine should now be redirecting its port 80 to the container's
port 8888.

To stop:
```sh
$ docker-compose stop
```
