import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const makeAdmin = async (userId) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { role: "admin" });
    setUsers(users.map(user => user.id === userId ? { ...user, role: 'admin' } : user));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
         <Helmet>
                <title>Adopt Me | Dashboard</title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <div>
              {user.name} ({user.email}) - {user.role}
            </div>
            {user.role === "user" && (
              <button
                className="p-2 bg-green-500 text-white rounded"
                onClick={() => makeAdmin(user.id)}
              >
                Make Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
