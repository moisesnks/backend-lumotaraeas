import firebase from "../firebase.js";
import User from "../models/userModel.js";

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        // await addDoc(collection(db, "users"), data);
        console.log(data);
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await getDocs(collection(db, "users"));
        const usersArray = [];

        if (users.empty) {
            res.status(400).send("No users found");
        } else {
            users.forEach((doc) => {
                const user = new User(
                    doc.id,
                    doc.data().displayName,
                    doc.data().email,
                    doc.data().photoURL,
                    doc.data().rol,
                    doc.data().rut,
                    doc.data().team,
                    doc.data().cargo,
                    doc.data().horas,
                    doc.data().tareasReference
                );
                usersArray.push(user);
            });
            res.status(200).send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getDoc(doc(db, "users", id));
        if (!user.exists()) {
            res.status(400).send("User not found");
        } else {
            const userData = user.data();
            const userObject = new User(
                user.id,
                userData.displayName,
                userData.email,
                userData.photoURL,
                userData.rol,
                userData.rut,
                userData.team,
                userData.cargo,
                userData.horas,
                userData.tareasReference
            );
            res.status(200).send(userObject);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await updateDoc(doc(db, "users", id), data);
        res.status(200).send("User updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, "users", id));
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}