const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const GeoFire = require("geofire");

const node_ref = "parkingSpots";
const CINEMA_NOVA = [-37.7978092, 144.9680124]; //[lat, lon]
const HOME = [-37.7978092, 144.9680124];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whooshkav1.firebaseio.com/"
});

const db = admin.database();
const ref = db.ref(node_ref);

// ref.once("value", function(snapshot) {
//   const data = snapshot.val();  //data is a large object, not array
//   console.log(Object.values(data));
// });

const geofire = new GeoFire(ref);

var geoQuery = geofire.query({
  center: HOME,
  radius: 10.5
});

const list = [];

//get keys within radius
onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, loc, dist) {
  list.push({ key, loc, dist }); //loc is an array
});

//after initial load, operate on the list...then cancel query
onReadyRegistration = geoQuery.on("ready", function() {
  console.log(list.slice(0, 5));

  console.log("Cancelling the geoQuery now that initial data has loaded...");

  geoQuery.cancel();
});

// ====================== REFERENCE NOTES ======================
/*

geofire.get('0-6483-COM').then(loc=>console.log(loc)) -> get the location of a given 'key'

var geoQuery = geoFire.query({            --> returns a GeoQuery object, on which listeners can be attached
  center: [10.38, 2.41],
  radius: 10.5                            --> in kms
});    

GeoQuery.on(eventType, callback)
Attaches a callback to this query which will be run when the provided eventType fires. 
Valid eventType values are ready, key_entered, key_exited, and key_moved. The ready event callback is passed no parameters.
All other callbacks will be passed three parameters:
1/ the location's key
2/ the location's [latitude, longitude] pair
3/ the distance, in kilometers, from the location to this query's center



*/
