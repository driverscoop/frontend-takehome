# Drivers Coop Software Engineering Takehome

This is a takehome technical project for applicants to The Drivers Cooperative.

Please read this README in its entirety before getting started.

## How to take this test

The goal is to write a new API on server and client similar to APIs we use at
TDC. In the followup discussion after you finish working on the takehome, you'll
discuss your solution and how you arrived at it.

Please don't spend more than 3-5 hours on this project. If you don't have a full
solution at the end of 3-5 hours, think about how you would complete the project
and send it in.

To submit, create a branch called `first-last` and commit your changes there.
Next, push your branch to a repo on your personal GitHub and share to
`jasonprado`. Email `jobs@drivers.coop` or your previous contact (probably
Jason) to let us know you're done.

## Getting Started

1. Run the server: `cd server && yarn install && yarn run start`
1. Run the frontend development server: `cd dispatchmap && yarn install && yarn run start`
1. Register for a
   [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
   and set it in the file at
   `dispatchmap/src/CarMap.tsx`. Consider using the `dotenv` package to avoid putting the key in source code.

At this point, the application should launch in your local browser and display a map.
  

## Background

The client experiences we build at TDC update information in real time. The
location of a driver and rider are continually updated over GPS. We must sync
this data between our backends and clients.

This project contains a simulation of vehicles in Manhattan. Each vehicle
chooses a random starting point and destination, and on each tick of a timer it
simulates moving towards its location. This simulates GPS updates from our fleet
of drivers.

## Objective

![Video of cars moving on the map](https://github.com/driverscoop/frontend-takehome/raw/main/CarClientDemo.gif)

In this project you will create an API on the server that publishes updates
about the simulated locations of vehicles as well as a client UX displaying the
simulated vehicles on a map. A simulation of vehicle locations is already
running in the server. Your task is to wire up this simulation to an API that
can be consumed by the client, and then to place markers on the client's map
representing each vehicle. Additionally, you should provide details about a
vehicle when the user taps on its icon. See the attached GIF for an example.


## Notes

* The vehicle simulation can be found in `server/src/carLocationGenerator.ts`.
  There is a comment suggesting where to publish updated locations.
* Support for GraphQL subscriptions has already been set up in both the client
  and the server.
* There is a png you can use for the vehicle marker at
  `src/Car.png`.


## Documentation

* Apollo GraphQL subscriptions are documented for
  [client](https://www.apollographql.com/docs/react/data/subscriptions/) and
  [server](https://www.apollographql.com/docs/apollo-server/data/subscriptions/).
* The `GoogleMap` is provided by
  [@react-google-maps](https://www.npmjs.com/package/@react-google-maps/api).
