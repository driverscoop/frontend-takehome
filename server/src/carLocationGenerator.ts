import {
  computeDestinationPoint,
  getDistance,
  getGreatCircleBearing,
  isPointInPolygon,
} from "geolib";

const UPDATE_INTERVAL_MS = 1000;
const CAR_SPEED_METERSPERMS = 8 / 1000.;
const MAX_CAR_DISTANCE_PER_UPDATE_INTERVAL_METERS =
  UPDATE_INTERVAL_MS * CAR_SPEED_METERSPERMS;

// This is the function that simulates the location of cars.
// Each car picks a random destination and moves towards it on each tick.
// When a car reaches its destination, it picks a new location.
function startPublishingLocationUpdates() {
  const numCars = 10;

  let cars = [
    ...Array.from({length: numCars}, (_, i) => i + 1).map((i) => ({
        id: i.toString(),
        location: randomPointInManhattan(),
        destination: randomPointInManhattan(),
        distanceToDestination: -1,
    })),
  ];

  setInterval(() => {
    cars.forEach((car) => {
      const currentLocation = car.location;
      const destination = car.destination;

      car.distanceToDestination = getDistance(currentLocation, destination);
      if (car.distanceToDestination < 50) {
        // Car has arrived. On to the next location.
        car.destination = randomPointInManhattan();
      } else {
        const bearing = getGreatCircleBearing(currentLocation, destination);
        const distanceToTravel = Math.min(
          MAX_CAR_DISTANCE_PER_UPDATE_INTERVAL_METERS,
          car.distanceToDestination
        );
        car.location = computeDestinationPoint(
          currentLocation,
          distanceToTravel,
          bearing
        );
      }
    });

    // At this point the locations of the cars have been updated.
    // It would make sense to broadcast this update somehow.
    // See https://www.apollographql.com/docs/apollo-server/data/subscriptions/#the-pubsub-class
  }, UPDATE_INTERVAL_MS);
}

type Coordinates = { latitude: number; longitude: number };

type Car = {
  id: String;
  location: Coordinates;
  destination: Coordinates;
  distanceToDestination: number;
};

const MANHATTAN_POLYGON = [
  { latitude: 40.702991, longitude: -74.014721 },
  { latitude: 40.751363, longitude: -74.008356 },
  { latitude: 40.87603, longitude: -73.926651 },
  { latitude: 40.871877, longitude: -73.911368 },
  { latitude: 40.835451, longitude: -73.93522 },
  { latitude: 40.809018, longitude: -73.934462 },
  { latitude: 40.796543, longitude: -73.928966 },
  { latitude: 40.78321, longitude: -73.944091 },
  { latitude: 40.776028, longitude: -73.942374 },
  { latitude: 40.737121, longitude: -73.973501 },
  { latitude: 40.728782, longitude: -73.971639 },
  { latitude: 40.711024, longitude: -73.977577 },
  { latitude: 40.708741, longitude: -73.997474 },
  { latitude: 40.700748, longitude: -74.013168 },
];

function randomPointInManhattan() {
  const minLatitude = Math.min(
      ...MANHATTAN_POLYGON.map((coord) => coord.latitude)
    ),
    maxLatitude = Math.max(...MANHATTAN_POLYGON.map((coord) => coord.latitude)),
    minLongitude = Math.min(
      ...MANHATTAN_POLYGON.map((coord) => coord.longitude)
    ),
    maxLongitude = Math.max(
      ...MANHATTAN_POLYGON.map((coord) => coord.longitude)
    );

  while (true) {
    const newPoint = {
      latitude: Math.random() * (maxLatitude - minLatitude) + minLatitude,
      longitude: Math.random() * (maxLongitude - minLongitude) + minLongitude,
    };
    if (isPointInPolygon(newPoint, MANHATTAN_POLYGON)) {
      return newPoint;
    }
  }
}

export { startPublishingLocationUpdates };
