/*
ITP Food API

Utils
Messages
*/

module.exports = {
  subscription : {
    new: `Hello fellow ITPier, welcome to the "ITP Automated Free Food Alerts and Management Services for Hungry People" (ITPAFFAMSHP) . You are now subscribed to the service. You will receive notifications each time there's food on the floor. Yummy!. To unsubscribe text: 'No food for me'`,
    delete: `Sorry to see you go! (We are not really sorry, as there will be more food for the rest of us!). To subscribe again text: 'I want food'`,
    error: `Ups! Something went wrong. Sorry!`
  },
  food: {
    true: `Yes! There is food! Run now!`,
    false: `Nop. There is currently no food at the floor. What if you brought something in for everyone?`,
    announcement: `FOOD ALERT! There is free food available! Hurry! Hurry!`,
    updated: `Thanks for updating the current food status`
  },
  others: {
    forks: `Amount of forks in the kitchen: 0`,
    again: `Sorry, I didn't catch that!`
  },
  devices: {
    noStatus: `You need to provide a status value in the request. This must be either true or false`,
    noPicture: `You need to provide an image of the current food. This must be sent with a form request`,
    noData: `You need to provide at least a status (true or false) and an image if the status is true`
  }
}
