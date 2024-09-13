// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase конфігурація
const firebaseConfig = {
  apiKey: 'AIzaSyA8KeMnqi2JUQos5z9mPUGwCSeeFeIjVN4',
  authDomain: 'tiras-test.firebaseapp.com',
  projectId: 'tiras-test',
  storageBucket: 'tiras-test.appspot.com',
  messagingSenderId: '790921268840',
  appId: '1:790921268840:web:aca83ecb58f87d53daf5dd',
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація FCM для повідомлень
const messaging = getMessaging(app);

const VAPID_KEY =
  'BIDTgsMSJqW00l5YwX08QQPNlElzhnqGzr9AmoISYH-cqItZeUfiUcasitjgoUtrCoyJ0o2F7_S3RrhTaSuBEk4';

// Функція для отримання токена
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log('FCM Token:', currentToken);
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      );
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

// Функція для обробки вхідних повідомлень
export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
