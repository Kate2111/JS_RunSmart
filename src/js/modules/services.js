import { nanoid } from 'nanoid';
import { initializeApp } from "firebase/app";
import { getDatabase, get, set, remove, ref, child } from "firebase/database";

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
  const enterId = nanoid(5);
  const recourseRef = ref(db, "Users/" + enterId);
  return new Promise((resolve, reject) => {
    set(recourseRef,data)
    .then(() => {
      resolve(data);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

export {postData};
export {getResource};

