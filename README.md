# fbinstant-phaser-typescript
Starter Project for Phaser 3 and Facebook Instant Games using TypeScript
I only heard about Facebook Instant Games recently and was quick to jump on board and develop my first web friendly game. With Phaser 3 being the choice and TypeScript being the language of preference the game was on to develop. 
Phaser 3 is a great free open source game engine which makes use of the native HTML5 elements and will work in the browser whether it supports WebGL or the simpler Canvas. 
Read More: phaser.io 
It has many great examples covering all aspects of development at 
labs.phaser.io
Facebook Instant Games functionality is only testable once your game is being hosted on the Facebook servers. It was important to check where the game was being hosted before attempting to integrate the Facebook Instant Games script into any game code. This was easy by looking at the window.location.host string and checking it matched “www.facebook.com“ and then making adjustments in the code to account for the host not being on Facebook while developing.
Read more: facebook.com/instantgames/sdk
