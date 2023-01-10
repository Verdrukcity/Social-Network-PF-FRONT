// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCRHu2iB70krGfATbX091vMYqW0FKPyXvw",
//     authDomain: "reply-4e692.firebaseapp.com",
//     projectId: "reply-4e692",
//     storageBucket: "reply-4e692.appspot.com",
//     messagingSenderId: "915695107521",
//     appId: "1:915695107521:web:f162590baa8e9624ef8340"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// export function crearUsuario(email, password ) {
//   createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user)
//     // ...
//     sendEmailVerification(auth.currentUser)
//     .then((response) => {
//       console.log(response)
//       // Email verification sent!
//       // ...
//     });
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage)
//     // ..
//   });
// } 




