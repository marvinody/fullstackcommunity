const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('Notification Added: ', doc));
};

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {
    const newlyCreatedProject = doc.data();
    const notification = {
      content: 'added a new project',
      user: `${newlyCreatedProject.authorFirstName} ${
        newlyCreatedProject.authorLastName
      }`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };
    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const newlyCreatedUser = doc.data();
      const notification = {
        content: 'joined the Fullstack community',
        user: `${newlyCreatedUser.firstName} ${newlyCreatedUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return createNotification(notification);
    });
});
