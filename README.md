# Robotic Pickle Farm

"Make pickles, take over the world..."

Robotic Pickle Farm is an incremental/clicker 
game created by Riley Alexis as her first web dev project. 
The game is in the spirit of [Universal Paperclips](https://www.decisionproblem.com/paperclips/index2.html), [A Dark Room](https://adarkroom.doublespeakgames.com/) or 
[Kittens Game](http://kittensgame.com/web/#). It involves an iterative game style where a player's 
goal is to make as many pickles as possible. 
The eventual goal is to produce 2.8 trillion pickles, roughly 
equal to the annual global output of planet Earth.

## Release

This game is currently in the early stages of development but is playable and winable.

**Note: Local storage is not currently implemented. If a player selects New Game without signing in their game will not be saved **

### How to run this game

Clone repository:

```git clone https://github.com/RileyAlexis/roboticPickleFarm.git```

Install NPM dependencies

```npm install```

Install Postgre with Homebrew

```brew install postgresql```

Follow the instructions in database.sql to create the needed tables.

Start Node/Express Server

```npm run server```

Start React/webPack client server

```npm run client```

Direct browser to ```localhost:/3000```

### Gameplay

Each player starts with 5 seeds that can be planted. The seeds will grow into plants which in turn grow cucumbers. The cucumbers must be picked and then
pickled. Once a player reaches 100 pickles they can purchase robots to automate the planting, picking and pickling.

If you want to achieve the goal of 2.8 trillion pickles before the heat death of the universe upgrades must be purchased with pickles. At the top
is the progress toward the overall goal and the number of years required at current pickle production levels: the b stands for billion. 
 
### Technology Stack

 Robotic Pickle Farm is created using React, Redux, Redux-Saga, 
Node, Express and Postgres. User sessions handled by JSON Web 
Token and Bcrypt.

