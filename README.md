What can you do with repo?

You can run the client part of the meteor application separately (building with webpack), with or without the server running.(you need the server to be run at least once though, after that, the server could be anywhere). There is no major code changes to the original mantra-sample-blog-app. (So there is no new learning involved)

```
cd server
meteor

cd client
npm install
npm start


```
You can go to localhost:8080 to see your app.

--TODO
-wallaby.js / mocha etc may need modifications.
-will update them in due course in the sample
