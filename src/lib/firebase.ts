import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAe1EiCxsF7wO9qR4qjlw-9-YoI3OcWdVE",
  authDomain: "vlvu-website.firebaseapp.com",
  projectId: "vlvu-website",
  storageBucket: "vlvu-website.appspot.com",
  messagingSenderId: "330643425296",
  appId: "1:330643425296:web:03a187f22a35fe0cc36295",
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
