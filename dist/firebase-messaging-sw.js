importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA8KeMnqi2JUQos5z9mPUGwCSeeFeIjVN4",
  authDomain: "tiras-test.firebaseapp.com",
  projectId: "tiras-test",
  storageBucket: "tiras-test.appspot.com",
  messagingSenderId: "790921268840",
  appId: "1:790921268840:web:aca83ecb58f87d53daf5dd",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

