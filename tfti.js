const login = require("facebook-chat-api");

var credentials = {
   email: "",
   password: ""
};

var triggerWords = ["with", "party", "drink", "drinks", "fucked", "drinking", "fun"];
var shutDown = ["shut up", "Shut up", "fuck off", "Fuck off"];
login(credentials, (err, api) => {
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
            if (event.body == "tfti" || event.body == "Tfti") api.setMessageReaction("\uD83D\uDE22", event.messageID);

            if(shutDown.indexOf(event.body) > -1){
               return stopListening();
            }

         case "event":
            console.log(event);
            break;
        }
      });
});
