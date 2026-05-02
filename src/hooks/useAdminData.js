import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useAdminData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const allUsers = [];
      snapshot.forEach((doc) => {
        allUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(allUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const approveUser = async (targetUid) => {
    const targetRef = doc(db, 'users', targetUid);
    await setDoc(targetRef, { settings: { status: 'approved' } }, { merge: true });
  };

  const rejectUser = async (targetUid) => {
    const targetRef = doc(db, 'users', targetUid);
    await setDoc(targetRef, { settings: { status: 'rejected' } }, { merge: true });
  };

  const getPendingUsers = () => {
    return users.filter(u => u.settings?.status === 'pending');
  };

  const getTrackedUsers = () => {
    // Include all users (including the admin), but exclude pending users
    return users.filter(u => u.settings?.status !== 'pending');
  };

  return { users, loading, approveUser, rejectUser, getPendingUsers, getTrackedUsers };
}
