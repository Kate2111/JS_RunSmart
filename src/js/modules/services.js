
import { initializeApp } from "firebase/app";
import { getDatabase, get, set, push, put, ref, storage } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvcuoqy4RCoFJswxl2wyQsKFgAHmYZaH0",
  authDomain: "myrunsmart.firebaseapp.com",
  databaseURL: "https://myrunsmart-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "myrunsmart",
  storageBucket: "myrunsmart.appspot.com",
  messagingSenderId: "746845981121",
  appId: "1:746845981121:web:8293d2a2cc6fa949530740",
  measurementId: "G-776EZJ939G"
};



const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();
//const dbStorage = storage();

function getResource(recourse) {
  const recourseRef = ref(db, recourse);
  return new Promise((resolve, reject) => {
    get(recourseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const recourseValue = snapshot.val();
          resolve(recourseValue);
        } else {
          console.log("Данные отсутствуют");
          resolve(null);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}


function postData(data) {
  
  const recourseRef = ref(db, "reviews");
  return new Promise((resolve, reject) => {
    const newElem = push(recourseRef);
    set(newElem,data)
    .then(() => {
      resolve(data);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

/* function postPhoto() {
  const recourseRef = ref(dbStorage,'photoUsers');
  const task = recourseRef.put();
  
} */

export {postData};
export {getResource};
//export {postPhoto};

