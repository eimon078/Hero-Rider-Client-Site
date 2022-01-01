import { useEffect, useState } from "react";
import firebaseInit from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

firebaseInit();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [admin, setAdmin] = useState(false);
    const auth = getAuth();
    let navigate = useNavigate();
    // const googleProvider = new GoogleAuthProvider();

    // user Register 
    const registerUser = (email, password, name) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // one time added to user name 
                const newUser = { email, displayName: name };
                setUser(newUser);

                // send user name to firebase after creation 
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {
                        navigate(`/${email}`);
                    }).catch((error) => {
                    });

                // history.replace('/');

            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);

            })
            .finally();
    }


    //user login
    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                navigate(`/${email}`);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);

            })
            .finally();
    }

    // observer 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                setUser({});
            }
        });
        return () => unsubscribe
    }, [])

    //user logout
    const logout = () => {
        signOut(auth).then(() => {

        }).catch((error) => {

        })
            .finally();
    }

    //Get Role
    useEffect(() => {
        fetch(`https://stormy-stream-30371.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user.email])

    return {
        user,
        admin,
        registerUser,
        logout,
        loginUser,
    }
}

export default useFirebase;