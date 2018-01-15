const login = require("facebook-chat-api");
const fs = require("fs");

//Uncomment this to set your own appstate.json
// var credentials = {
//    email: "",
//    password: ""
// };

var triggerWords = ["with", "party", "drink", "drinks", "fucked", "fuck", "drinking", "fun", "frats", "parties", "sending", "Sending", "/confirm"];
var shutDown = ["shut up", "Shut up", "fuck off", "Fuck off"];
var tftis = ["tfti", "Tfti", "tfti'd", "Tfti'd"];
// login(credentials, (err, api) => {
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
   //api.setOptions({selfListen: true});

   var stopListening = api.listen((err, event) => {
     if(err) return console.error(err);

      switch(event.type){
         case "message":
            //listen for tfti
            var parse = event.body.replace(/\d+/g, '').split(" ");
            console.log(parse);
            for(var i=0; i<parse.length; i++){
               console.log("parsing");
               if (triggerWords.indexOf(parse[i]) > -1) api.sendMessage(":( tfti", event.threadID);
            }

            //reacts
            if (tftis.indexOf(event.body) > -1) api.setMessageReaction("\uD83D\uDE22", event.messageID);
            for(var j=0; j<parse.length; j++){
               console.log("parsing");
               if (tftis.indexOf(parse[j]) > -1) api.setMessageReaction("\uD83D\uDE22", event.messageID);
            }

            if(shutDown.indexOf(event.body) > -1){
               api.sendMessage("k bye triangle down", event.threadID);
               //Unblock the comment below to allow for saving of your own appstate
               // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
               return stopListening();
            }

         case "event":
            console.log(event);
            break;
        }
      });
});
