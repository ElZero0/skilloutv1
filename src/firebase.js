import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEd3UHy0RyS-rQdDTed6MDHriHZsRX5TE",
  authDomain: "skill-ddc8f.firebaseapp.com",
  projectId: "skill-ddc8f",
  storageBucket: "skill-ddc8f.appspot.com",
  messagingSenderId: "923285658751",
  appId: "1:923285658751:web:9bac70034ce96e2af0334a",
  measurementId: "G-YD2SXWHL0L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function getUsers() {
  console.log("ping");
  const usersCol = collection(db, "usuarios");
  const userSnapshot = await getDocs(usersCol);

  const userList = userSnapshot.docs.map((doc) => doc.data());

  console.log("user list", userList);
  return userList;
}

async function getReactions() {
  const reactionsCol = collection(db, "REACTIONS");

  // get docs in realtime

  const reactionSnapshot = await getDocs(reactionsCol);
  const reactionList = reactionSnapshot.docs.map((doc) => doc.data());
  return reactionList;
}

async function getRealtimeReactions(setReactions) {
  const reactionsCol = collection(db, "REACTIONS");

  const unsub = await onSnapshot(reactionsCol, (snapshot) => {
    const reactionList = snapshot.docs.map((doc) => doc.data());
    console.log("reactionList", reactionList);
    setReactions(reactionList);
    return reactionList;
  });
}

async function getRealtimeReactionPoints(setReactionPoints) {
  const reactionPointsDoc = doc(db, "REACTION_POINTS", "xSoqA5Dx1e0tA4WistLn");

  const unsub = onSnapshot(reactionPointsDoc, (snapshot) => {
    const reactionPoints = snapshot.data();
    console.log("reactionPoints", reactionPoints);
    setReactionPoints(reactionPoints.points);
    return reactionPoints;
  });
}

async function getRenderedProgress(setRenderedProgress) {
  const renderedProgressDoc = doc(
    db,
    "RENDERED_PROGRESS",
    "DMrIGRHKOcgY1CDNM6vS"
  );

  const unsub = onSnapshot(renderedProgressDoc, (snapshot) => {
    const renderedProgress = snapshot.data();
    console.log("renderedProgress", renderedProgress);
    setRenderedProgress(renderedProgress.progress);
    return renderedProgress;
  });
}

async function getGoals(setGameState) {
  const gameStateDoc = doc(db, "GAME_STATE", "1");

  const unsub = onSnapshot(gameStateDoc, (snapshot) => {
    const gameState = snapshot.data();
    console.log("gameState", gameState);
    setGameState(gameState.state);
  });
}

async function createReaction(reactions, id) {
  // set a new document with a generated id.
  const docRef = doc(db, "REACTIONS", id);

  const reactionSnapshot = await setDoc(docRef, reactions, { merge: true });
  return reactionSnapshot;
}

async function updateRenderedProgress(progress) {
  const docRef = doc(db, "RENDERED_PROGRESS", "DMrIGRHKOcgY1CDNM6vS");

  const response = await updateDoc(docRef, { progress });
  return response;
}

async function updateReactionPoints(points) {
  const docRef = doc(db, "REACTION_POINTS", "xSoqA5Dx1e0tA4WistLn");

  const response = await updateDoc(docRef, { points });
  return response;
}

async function updateReactions(reactions) {
  // loop through the reactions and update them
  const newReactions = reactions.map(async (reaction) => {
    const docRef = doc(db, "REACTIONS", reaction.id);
    const response = await setDoc(docRef, reaction, { merge: true });
    return response;
  });

  console.log("newReactions", newReactions);
  return newReactions;
}

export {
  db,
  getReactions,
  getGoals,
  getRealtimeReactions,
  getRealtimeReactionPoints,
  getRenderedProgress,
  createReaction,
  updateRenderedProgress,
  updateReactionPoints,
  updateReactions,
  auth,
  getUsers
};
