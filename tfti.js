const login = require("facebook-chat-api");
const fs = require("fs");

//Uncomment this to set your own appstate.json
// var credentials = {
//    email: "",
//    password: ""
// };

//Idea to implement:
//Auto-switch nicknames to cause confusion based on a command

var triggerWords = ["with", "party", "drink", "drinks", "fucked", "fuck", "drinking", "fun", "frats", "parties", "sending", "/confirm", "come"];
var shutDown = ["shut up", "fuck off"];
var tftis = ["tfti"];
// login(credentials, (err, api) => {
login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
  //api.setOptions({selfListen: true});
  api.setOptions({ selfListen: true });

  var stopListening = api.listen((err, event) => {
    if (err) return console.error(err);

    switch (event.type) {
      case "message":
        //listen for tfti
        var parse = event.body.toLowerCase().replace(/\d+/g, '').replace(/'+/g, ' ').split(" ");
        console.log(parse);
        for (var i = 0; i < parse.length; i++) {
          console.log("parsing");
          if (triggerWords.indexOf(parse[i]) > -1) api.sendMessage(":( tfti", event.threadID);
        }

        //reacts
        if (tftis.indexOf(event.body) > -1) api.setMessageReaction("\uD83D\uDE22", event.messageID);
        for (var j = 0; j < parse.length; j++) {
          console.log("parsing");
          if (tftis.indexOf(parse[j]) > -1) api.setMessageReaction("\uD83D\uDE22", event.messageID);
        }

        if (shutDown.indexOf(event.body.toLowerCase()) > -1) {
          api.sendMessage("k bye triangle down", event.threadID);
          //Unblock the comment below to allow for saving of your own appstate
          // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
          return stopListening();
        }

      case "event":
        console.log(event);
        break;
    }

    //nameswap features -- see other repo for details
    // if (err) return console.error(err);
    // switch (event.type) {
    //   case "message":

    //     if (event.body === "/find") {
    //       api.getThreadInfoGraphQL(event.threadID, (err, info) => {
    //         if (err) return console.error(err);
    //         peopleID = info.participantIDs;
    //         peopleB = info.participantIDs;
    //         //Randomize order of array
    //         function shuffle(a) {
    //           var currInd = a.length, tempVal, randomIndex;
    //           while (0 !== currInd) {
    //             randomIndex = Math.floor(Math.random() * currInd);
    //             currInd -= 1;
    //             tempVal = a[currInd];
    //             a[currInd] = a[randomIndex];
    //             a[randomIndex] = tempVal;
    //           }
    //           return a;
    //         }
    //         peopleID = shuffle(peopleID);
    //         peopleA = peopleID;
    //         api.getUserInfo(peopleA, (err, ret) => {
    //           if (err) return console.error(err);
    //           for (var i = 0; i < peopleA.length; i++) {
    //             peopleA[i] = ret[peopleA[i]].name;
    //           }
    //         });
    //       });
    //     }

    //     if (event.body == "/switch") {
    //       console.log(peopleA);
    //       api.getThreadInfoGraphQL(event.threadID, (err, p) => {
    //         if (err) return console.error(err);
    //         peopleID = p.participantIDs;
    //         peopleB = p.participantIDs;
    //         for (var x = 0; x < peopleA.length; x++) {
    //           api.changeNickname(peopleA[x], event.threadID, peopleB[x], (err, app) => {
    //             if (err) return console.error(err);
    //           });
    //         }
    //       });
    //     }

    //     if (shutDown.indexOf(event.body.toLowerCase()) > -1) {
    //       api.sendMessage("Goodbye :(", event.threadID);
    //       //Necessary to uncomment below and create a .json file called appstate (empty) for login via appstate to work
    //       // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    //       return stopListening();
    //     }

    //   case "event":
    //     console.log(event);
    //     break;
    // }

  });
});
