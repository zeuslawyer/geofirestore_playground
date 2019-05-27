### FIREBASE
- cloud functions uses TypeScript

# myUniversalServer
Firebase Functions Express Server for all my work


# INITIAL SETUP - FIREBASE FUNCTIONS

To initialize your project:

1. Run firebase login to log in via the browser and authenticate the firebase tool.
2. Go to your Firebase project directory.
3. Run "__firebase init functions__". The tool gives you an option to install dependencies with npm. It is safe to decline if you want to manage dependencies in another way.  If your new project is now showing up in the CLI list use "__firebase -P <projectId> init functions__" to associate project folder with the right project from firebase.


# QUICK REFERENCES
1. create an express webapp (cors set headers etc):  https://cloud.google.com/functions/docs/writing/http#writing_http_helloworld-nodejs
2. CORS and Authentication on Google Cloud Functions for Node:  https://cloud.google.com/functions/docs/writing/http#writing_http_helloworld-nodejs

3. HTTP Function with authorisation (Firebase app users only) sample:  https://github.com/firebase/functions-samples/tree/master/authorized-https-endpoint

4. npm cors module:  https://www.npmjs.com/package/cors

5. understanding CORS in node:  https://flaviocopes.com/cors/

# NOTES TO SELF
1. using cloud functions to make external API calls (outside google) is a chargeable feature.  Needed to upgrade to Blaze Plan to support.
2. uses the geokit npm package to hash lat/longs
3. uses geofirestore to write and read from the db

# TODOS
    - consider useing Geokit instead of geofirestore?