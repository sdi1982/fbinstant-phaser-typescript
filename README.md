# Starter Project for Phaser 3 and Facebook Instant Games using TypeScript

### Please be aware that this is currently in an example stage and does not necessarily work. This notice will be removed when it has been thoroughly tested and further improvised. (Please check back soon).

A TypeScript webpack project that includes the phaser library in its output. Base build size is ~700KB. Facebook Instant Games SDK is available when loaded in the browser. As no typings are available for the SDK there is a bit of guesswork involved with integrating it in game.

The aim of the project is to create a quicker entry to development using these libraries and exploiting them as much as possible.

### Phaser 3
Phaser 3 is a great free open source game engine which makes use of the native HTML5 elements and will work in the browser whether it supports WebGL or the simpler Canvas. 
Read more: [Phaser Home Page](http://phaser.io/)

It has many great examples covering all aspects of development at: [Phaser 3 Examples](http://labs.phaser.io/)

### Facebook Instant Games
Facebook Instant Games functionality is only testable once your game is being hosted on the Facebook servers. It was important to check where the game was being hosted before attempting to integrate the Facebook Instant Games SDK script into any game code. This was easy by looking at the window.location.host string and checking it matched “www.facebook.com“ and then making adjustments in the code to account for the host not being on Facebook while developing. Read more: [Facebook Developers Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk)

## How to get started
### Clone
You can clone or download this and use it as you wish and help improve it.

### Install Packages
```
npm install
```
Install all the packages specified in package.json

### Run Development Server with Webpack
```
npm run dev
```
Visit localhost:8080

### Build for Production
```
npm run build
```
Output is bundle.js in dist folder

The contents of dist folder can be compressed and uploaded to Facebook Instant Games Hosting and tested
* this includes index.html aswell as assets folder and bundle.js

## Built with
### Development Dependencies
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - Development server
* [webpack](https://github.com/webpack/webpack) - Production build bundler
* [webpack-merge](https://github.com/survivejs/webpack-merge) - Webpack config merger
* [webpack-cli](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) - Webpack command line interface
* [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) - Production build pipeline
* [typesript](https://github.com/Microsoft/TypeScript) - Scalable JavaScript
* [phaser typings](https://github.com/photonstorm/phaser3-docs/tree/master/typescript) - Typings for Phaser 3 (optional)

### Production Dependencies
* [phaser](https://github.com/photonstorm/phaser) - Game engine (part of bundle)

### Other
* [Facebook Developers Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk) - FBInstant made available by index.html (not part of bundle)

### How to Test/Publish on Facebook for Developers
#### 1) Setup App with Facebook
* Create a new App on Facebook for Developers
* Add 'Instant Games' Product

#### 2) Upload to Facebook
* Build Game for Production
* Compress contents of dist folder into .zip or .7z format
* Browse .zip or .7z file to Instant Games->Web Hosting section
* Enter a description in the about this version... section
* Upload
* Select the uploaded bundle and click the star 'Push to Production'

#### 3) Test the Game on Facebook Messenger App
When the app is uploaded it can be tested on Facebook Messenger App where your app will be under 'Games->In development'

### How to test in your browser
* First upload compressed dist folder contents to Facebook
* Install http-server globally
```
npm install -g http-server
```
* Generate cert.pem and key.pem with OpenSSL
```
openssl genrsa 2048 > key.pem
```
```
openssl req -x509 -days 1000 -new -key key.pem -out cert.pem
```
* Copy cert.pem and key.pem to dist folder
* Start http-server from within the dist folder
```
http-server --ssl -c-1 -p 8080 -a 127.0.0.1
```
* Visit https://localhost:8080/ and bypass any warnings to load the game
* Visit https://www.facebook.com/embed/instantgames/YOUR_GAME_ID/player?game_url=https://localhost:8080 to play the game as if it was on Facebook
* Success!

### Feature Requests
* Typings for Facebook Instant Games SDK to remove some of the guesswork when using it
* Cleaner interface between the game and scoring mechanisms to make integration with Facebook much nicer
* Tests, currently there are no tests but the functions should be simple enough to only accomplish one thing which they do
* Anyone with some imagination will be able to improve this starter project, to make it easier for others starting out using this workflow
* As with all game systems, a nice state management infrastructure goes a long way :)