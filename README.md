# Starter Project for Phaser 3 and Facebook Instant Games using TypeScript
### Phaser 3
Phaser 3 is a great free open source game engine which makes use of the native HTML5 elements and will work in the browser whether it supports WebGL or the simpler Canvas. 
Read more: [Phaser Home Page](http://phaser.io/)

It has many great examples covering all aspects of development at: [Phaser 3 Examples](http://labs.phaser.io/)

### Facebook Instant Games
Facebook Instant Games functionality is only testable once your game is being hosted on the Facebook servers. It was important to check where the game was being hosted before attempting to integrate the Facebook Instant Games script into any game code. This was easy by looking at the window.location.host string and checking it matched “www.facebook.com“ and then making adjustments in the code to account for the host not being on Facebook while developing. Read more: [Facebook Developers Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk)

## How to get started
### Clone
You can clone or download this and push any changes you might have

### Install packages
```
npm install
```
Install all the packages specified in package.json

### Run development server with webpack
```
npm run dev
```
Visit localhost:8080

### Build for production
```
npm run build
```
Output is bundle.js in dist folder

The dist folder can be compressed and uploaded to Facebook Instant Games Hosting and tested

## Built With
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - Development server
* [TypeSript](https://github.com/Microsoft/TypeScript) - Scalable JavaScript
* [Phaser 3 and Typings](https://github.com/photonstorm/phaser) - Game engine
* [Facebook Developers Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk) - FBInstant made available by index.html
