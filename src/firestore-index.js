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

let loc = new admin.firestore.GeoPoint(points.HOME[0], points.HOME[1]);

// createInFirestore("237r346wibdfk", {
//   name: "Cinema Nova",
//   coordinates: loc
// });

const promises = [];
for (let key in points) {
    promises.push(
      createInFirestore(key, {
        name: key,
        coordinates: new admin.firestore.GeoPoint(points[key][0], points[key][1])
      })
    )
}


// var setAda = docRef.set({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// });

// Create/set viewer's location in Firestore
/**
 * 
 * @param {hash} hash a Unique key for the document that will be created in firestore
 * @param {Object} Object must include a property 'coordinates'. all other properties get started in the data object
 */
function createInFirestore(key, data) {
  geoCollectionRef
    .doc(key)
    .set(data)
    .then(
      () => {
        console.log("Provided document has been added in Firestore");
      }
    )
    .catch(err => console.log("Error! ", err));
}
