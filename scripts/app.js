//initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-n7Niy8-8hkyaHPCAKNUyHe5wGU76GEc",
    authDomain: "weather-dashboard-3353f.firebaseapp.com",
    databaseURL: "https://weather-dashboard-3353f-default-rtdb.firebaseio.com",
    projectId: "weather-dashboard-3353f",
    storageBucket: "weather-dashboard-3353f.firebasestorage.app",
    messagingSenderId: "796019213516",
    appId: "1:796019213516:web:ac4942750de92517c6ae69",
    measurementId: "G-S8TTV1C1SH"
};

firebase.initializeApp(firebaseConfig);

//initalize firebase serve
const auth = firebase.auth();
const database = firebase.database();

//initialize MVC components
const authModel = new AuthModel(auth, database);
const storageModel = new StorageModel(database);
const weatherModel = new WeatherModel();

const authView = new AuthView();
const weatherView = new WeatherView();

const authController = new AuthController(authModel, authView);

document.addEventListener('DOMContentLoaded', () => {
    authController.init();

    //check auth state 
    auth.onAuthStateChanged(user => {
        if (user) {
            authView.showLogoutButton();
            storageModel.getUserLocation(user.uid, (locations) => {
                weatherView.displaySavedLocations(locations);
            });
        } else {
            authView.showLoginButton();
        }
    })
})