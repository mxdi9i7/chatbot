var express = require('express');
var router = express.Router();
var builder = require('botbuilder');

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: 'ed1cf83d-a2cf-4e5a-b8c6-ff455d21a295',
  appPassword: 'amFNS816@+_]wysdaDBEE51'
});
var inMemoryStorage = new builder.MemoryBotStorage();

router.post('/api/messages', connector.listen())
const BMW = {
  X5: {
    name: "BMW X5 SUV",
    intro: "Great choice! The X5 models are spacious and conquer every terrain. But more importantly, they possess the same sports car prowess you expect in a BMW",
    photo: "https://goo.gl/kN4C1y" 
  },
  X6: {
    name: "BMW X6 SUV",
    intro: "Great choice! The X6 models are spacious and conquer every terrain. But more importantly, they possess the same sports car prowess you expect in a BMW",
    photo: "https://goo.gl/ZGQTf7"
  }
}
var bot = new builder.UniversalBot(connector, [
  (session) => {
      session.send('Hello! Welcome to BMW, we have a couple of new models coming in 2018, the X5 and the X6. Which one would you be interested in?')
      builder.Prompts.choice(session, "Which model? <br> ", ["X5","X6"], { listStyle: 3 });      
  },
  (session, results) => {
    const answer = results.response.entity;
    session.send(`Great choice! The ${BMW[answer].name} ${BMW[answer].intro} <br> Here's a sneak peak at the brand new 2018 ${BMW[answer].name}. <br> ![duck](${BMW[answer].photo})`)
    builder.Prompts.text(session, `Now, what would you like to know about the BMW ${answer.name}`);
    builder.Prompts.choice(session, `You could ask things like: `, ["MSRP", "Miles per Gallon", "Horsepower", "Seating", "iDrive"], { listStyle: 3});
  },
  (session, results) => {
      session.endDialog(`Hello ${results.response.entity}!`);
  },
  (session, results) => {
    session.endConversation()
  }
])



router.get('/', (req, res) => {
  res.send('123')
})
module.exports = router;
