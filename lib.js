// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";


// import {  db,storage,auth} from "./lib.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmHulznNeHIi4QTIUWNvmA7CJl4Nu_q68",
    authDomain: "test2-25cf7.firebaseapp.com",
    projectId: "test2-25cf7",
    storageBucket: "test2-25cf7.appspot.com",
    messagingSenderId: "877972847836",
    appId: "1:877972847836:web:5d4b59334251746a2a0819",
    measurementId: "G-8FF57ZBJ8F"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);





//                                                        SignUp



let create = document.querySelector("#Create");
create.addEventListener("click", createUSer);

async function createUSer() {

    let email = document.querySelector("#Email");
    let password = document.querySelector("#password");



    //                          creating user 

//    is tag ko apni index wali file me dale jis me lagana hai function
     /* <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> */


    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user =>",user)
            swal("Great!", "Your Account Is Created!", "success")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("user =>",errorMessage)
            swal("Error!", errorMessage, "error")

            // ..
        });



    //                               database

    var userDocRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userDocRef, {
        Name: fNAme.value,
        lastName: sName.value,
        Email: email.value,
        Password: password.value,
        UserCreatedDate: Timestamp.fromDate(new Date()),

        profilePic: url

    })



    
    
}

//                                    storgae

let fileUpload = document.querySelector("#profile-pic");
fileUpload.addEventListener("change", uploadpic)
let profileImg = document.querySelector("#profile-img");

// nichay wala btn se chalnay k lia or uper wala direct chcange hote hi chalanay k lia
let btn = document.querySelector("#upload-pic");
btn.addEventListener("click", uploadpic)
// let fileInput = fileUpload


var url ;

async function uploadpic() {
    // console.log("upload",fileUpload.files[0])
    let file = fileUpload.files[0];
    let imageRef = ref(storage, `images/${file.name}`)
    let uploaded = await uploadBytes(imageRef, file)
    console.log(uploaded, "image uploaded");
    url = await getDownloadURL(imageRef);
    profileImg.src = url
}