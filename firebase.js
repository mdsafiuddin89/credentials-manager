// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTYh_HQbewFiWak0OGYrM7C-w4zRTkT2k",
  authDomain: "credentialsmanager-deec3.firebaseapp.com",
  projectId: "credentialsmanager-deec3",
  storageBucket: "credentialsmanager-deec3.firebasestorage.app",
  messagingSenderId: "270291675159",
  appId: "1:270291675159:web:3804878fe6e175c7511452"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(alert);
}

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(alert);
}

function resetPassword() {
  const email = document.getElementById("email").value;
  auth.sendPasswordResetEmail(email)
    .then(() => alert("Reset link sent!"))
    .catch(alert);
}

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

function addEmployee() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  db.collection("employees").add({ name, role })
    .then(() => window.location.href = "dashboard.html")
    .catch(alert);
}

function updateEmployee() {
  const id = new URLSearchParams(window.location.search).get("id");
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  db.collection("employees").doc(id).update({ name, role })
    .then(() => window.location.href = "dashboard.html")
    .catch(alert);
}

auth.onAuthStateChanged(user => {
  if (document.body.contains(document.getElementById("employee-list")) && user) {
    db.collection("employees").get().then(snapshot => {
      const list = document.getElementById("employee-list");
      snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `<div>${data.name} - ${data.role}
          <a href="edit.html?id=${doc.id}">Edit</a></div>`;
      });
    });
  }
});
