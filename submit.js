// Import and configure Firebase with your credentials
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCuye29eNHYoUJcUw6TYImuht9cAX9dpBs",
    authDomain: "my-pic-c8522.firebaseapp.com",
    databaseURL: "https://my-pic-c8522-default-rtdb.firebaseio.com",
    projectId: "my-pic-c8522",
    storageBucket: "my-pic-c8522.appspot.com",
    messagingSenderId: "462655345945",
    appId: "1:462655345945:web:5f8ce72b8b2ed05823a188",
    measurementId: "G-X3PCMBFY7H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export default async (req, res) => {
    const { email } = req.body;
    const ip = ''; // You will obtain the IP address on the server side (Vercel)

    if (email) {
        const data = {
            email: email,
            ip: ip
        };

        try {
            // Push data to Firebase Realtime Database
            await database.ref('submissions').push(data);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error submitting data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ success: false, error: 'Invalid email address' });
    }
};
