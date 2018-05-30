# Starter Project for Phaser 3 and Facebook Instant Games using TypeScript
## Introduction
I only heard about Facebook Instant Games recently and was quick to jump on board and develop my first web friendly game. With Phaser 3 being the choice and TypeScript being the language of preference the game was on to develop. 

### Phaser 3
Phaser 3 is a great free open source game engine which makes use of the native HTML5 elements and will work in the browser whether it supports WebGL or the simpler Canvas. 
Read more: 
[Phaser Home Page](http://phaser.io/)

It has many great examples covering all aspects of development at: 
[Phaser 3 Examples](http://labs.phaser.io/)

### Facebook Instant Games
Facebook Instant Games functionality is only testable once your game is being hosted on the Facebook servers. It was important to check where the game was being hosted before attempting to integrate the Facebook Instant Games script into any game code. This was easy by looking at the window.location.host string and checking it matched “www.facebook.com“ and then making adjustments in the code to account for the host not being on Facebook while developing.
Read more:
[Facebook Developers Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk)

## What the Project uses
### Webpack for Production build
Check out webpack.prod.js for information

### Webpack-dev-server for Development
Check out webpack.dev.js for information

## How to Get Started
### Clone
You can clone or download this and push any changes you might have

### NPM Install
Install all the packages specific in package.json

### Run development server with webpack
npm run dev
Visit localhost:8080

### Build for production
npm run build
Output is bundle.js in dist folder
