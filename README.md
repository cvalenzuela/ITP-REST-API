# ITP REST API

A REST API to access realtime information about ITP. 

Hardware on the floor updates the database.

Clients connect via SMS or HTTP.

## API Reference

The API is live at `165.227.188.111:9888` and at the phone number given in class.

- ### `GET /api/food` or `TEXT 'Food'`

  > Get the current free food status of the floor.

- ### `POST /api/food`

  > Update the status of free food. It requires a valid access token. This method accepts three values must be sent in the body:
  > - status: true or false - Required
  > - token: APIKEY - Required
  > - image: A .jpg, .png or .gif of the current food - Optional

- ### `TEXT 'I want food'`

  > Subscribe to food anouncements. You will receive a SMS notification everytime there is free food on the floor.

- ### `TEXT 'No food for me'`

  > Unsubscribe to food anouncements. You will no longer receive SMS notifications.

- ### `GET /api/forks` or `TEXT 'Forks'`

  > Get the current amount of forks in the kitchen.

- ### `GET /api/floor` or `TEXT 'Floor'`

  > Get the status of the floor. Is it open or not.

- ### `TEXT 'Make me a sandwich' (or something similar)`

  > Make a sandwich.
  
## Made by
- Pilar Gomez-Ruiz
- Mithru Vigneshwara
- Cristóbal Valenzuela