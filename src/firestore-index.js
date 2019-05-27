const admin = require("firebase-admin");
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");
const serviceAccount = require("../serviceAccount.json");
const points = require("./locationsDB/latlngs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

console.log("....running....\n");

var docRef = firestore.collection("sample_users").doc("ghonchu");
const geoFirestore = new GeoFirestore(firestore);
const geoCollectionRef = geoFirestore.collection("sample_geofirestore");

let loc = getFirestoreGeopoint(points.HOME[0], points.HOME[1]);

let currentLoc = getFirestoreGeopoint(-37.798791, 144.956162);


// Create a GeoQuery based on a location
const query = geoCollectionRef.near({
  center: currentLoc,
  radius: 2.5, //in kms
  limit: 1
});
query
  .get()
  .then(snapshot => {
    console.log(`there are ${snapshot.docs.length} results: \n`, snapshot.docs); // All docs returned by GeoQuery
  })
  .catch(err => console.log(err.message));

// createInFirestore("237r346wibdfk", {
//   name: "Royal Melbourne Hospital",
//   coordinates: currentLoc
// });

// const promises = [];
// for (let key in points) {
//     promises.push(
//       createInFirestore(key, {
//         name: key,
//         coordinates: getFirestoreGeopoint(points[key][0], points[key][1])
//       })
//     )
// }

// var setAda = docRef.set({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// });

/**
 *
 * @param {hash} hash a Unique key for the document that will be created in firestore
 * @param {Object} Object must include a property 'coordinates'. all other properties get started in the data object
 */
function createInFirestore(key, data) {
  geoCollectionRef
    .doc(key)
    .set(data)
    .then(() => {
      console.log("Provided document has been added in Firestore");
    })
    .catch(err => console.log("Error! ", err));
}

function getFirestoreGeopoint(lat, lon) {
  return new admin.firestore.GeoPoint(lat, lon);
}
