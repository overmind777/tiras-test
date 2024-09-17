import { initializeApp } from 'firebase/app';
import { getToken, getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyA8KeMnqi2JUQos5z9mPUGwCSeeFeIjVN4',
  authDomain: 'tiras-test.firebaseapp.com',
  projectId: 'tiras-test',
  storageBucket: 'tiras-test.appspot.com',
  messagingSenderId: '790921268840',
  appId: '1:790921268840:web:aca83ecb58f87d53daf5dd',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const generateToken = async () => {
  
  const permission = await Notification.requestPermission();
  
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey:
        'BIaqp2Vm9bc56ajpxT6aJYpe-W-arFzwv3pn5k_v231QFTIRvE6cHhU5YMQkik5-SOpePzXiTNXcg-dyFbbPoho',
    });
    console.log('token', token);

    return token;
  }
};


export {generateToken}