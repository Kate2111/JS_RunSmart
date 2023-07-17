/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationToAdmin = functions.database
    .ref("/users/{usersId}")
    .onCreate((snapshot, context) => {
      const reviewData = snapshot.val();

      // Получение данных из созданной записи
      const {name, phone, email} = reviewData;

      // Отправка уведомления администратору
      const notificationMessage = `Заявка: ${name},
      телефон: ${phone},почта: ${email}`;

      // например, через FCM (Firebase Cloud Messaging)
      // или отправку письма по электронной почте.

      // Пример отправки уведомления через FCM
      const message = {
        notification: {
          title: "Новый клиент",
          body: notificationMessage,
        },
      };

      // Отправка уведомления через FCM
      return admin.messaging().send(message)
          .then(() => {
            console.log("Уведомление успешно отправлено");
            return null;
          })
          .catch((error) => {
            console.error("Ошибка отправки уведомления:", error);
            return null;
          });
    });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
