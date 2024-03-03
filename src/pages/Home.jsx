import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { storage } from '../firebase';
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { doc as Doc, updateDoc } from "firebase/firestore";


export function Home() {

    const [currentUser, setUser] = useState('null')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [userImage, setUserImage] = useState('')
    const [count, setCount] = useState(0)

    const navigate = useNavigate()

    const getCurrentCount = async () => {
        if (!currentUser) return;
        const q = query(collection(db, 'Users'), where('email', '==', currentUser));
        const userSnapShot = await getDocs(q);
        userSnapShot.forEach((doc) => {
            setCount(doc.data().visit || 0);
        });
    };

    useEffect(() => {
        getCurrentCount();
    }, [currentUser]); // Update count whenever currentUser changes

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
            } else {
                console.log("user is logged out")
            }
        });
    }, [])


    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/signin");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    const upload = async () => {
        //image uploading logic
        if (image === null) {
            alert("Please select an image");
            return;
        }
        const imageRef = storageRef(storage, `images/${image.name}`);
        uploadBytes(imageRef, image)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        console.log(url)
                        setImageUrl(url)
                        await addDoc(collection(db, 'Users'),{
                            email : currentUser, 
                            visit : 0, 
                            imageUrl : url
                        })
                        alert('Uploaded Image Url : ' + url)
                    })
                    .catch((error) => {
                        alert(error)
                        return
                    });
            })
            .catch((error) => {
                alert(error)
                return
            });
    }
    return (
        <div className="container mx-auto bg-white text-black">
      <div className="flex justify-between p-3 w-screen">
        <p className="text-2xl font-bold">Welcome Home</p>
        <p className="text-xl font-bold">User: {currentUser}</p>
      </div>
      <div className="w-screen p-3">
        <p className="text-2xl font-bold" id="text">Current Image visits : {count}</p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="rounded-full py-2 px-4 border border-gray-400"
        />
        <button onClick={upload} className="bg-gray-800 text-white rounded-full py-2 px-4 ml-2 hover:bg-gray-700">
          Upload
        </button>
      </div>
      
      <div className="w-screen text-center">
      <h1 className="text-2xl font-bold mt-8">Get other User's Image</h1>
      </div>
      
      <div className="mt-4 w-screen flex justify-center">
        
        <input
          type="text"
          placeholder="Image Url"
          onChange={(e) => setUserImage(e.target.value)}
          className="rounded-full py-2 px-4 border border-gray-400"
        />
        <button onClick={async () => {
                const imageRef = query(collection(db,'Users'), where('imageUrl', '==', userImage));
                const querySnapshot = await getDocs(imageRef);
                querySnapshot.forEach(async (doc) => {
                    const currentVisits = doc.data().visit || 0;
                    const updatedVisits = currentVisits + 1;
                    const userRef = Doc(db, 'Users', doc.id)
                    const user = await updateDoc(userRef, { visit: updatedVisits })
                    alert('Visited successful')
                })
            }} className="ml-3 bg-gray-800 text-white rounded-full py-2 px-4 mt-2 hover:bg-gray-700">
          Get Image
        </button>
        
      </div>
      <div className=" text-center p-4 mt-10">
        <button onClick={handleLogout} className="bg-gray-800 text-white rounded-full py-2 px-4 hover:bg-gray-700">
          Logout
        </button>
      </div>
    </div>
    )
}

