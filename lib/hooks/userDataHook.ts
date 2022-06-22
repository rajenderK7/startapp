import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  // unsubscribe the realtime listening
  useEffect(() => {
    let unsubscribe;

    if (user) {
      try {
        unsubscribe = onSnapshot(doc(db, "users", user?.uid), (doc) => {
          setUsername(doc.data()?.username);
        });
      } catch (err) {
        console.log(err);
      }
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

export default useUserData;
