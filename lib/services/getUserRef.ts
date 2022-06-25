import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUserByUsername = async (
  username: string | string[] | undefined
) => {
  try {
    const collectionRef = collection(db, "users");
    const docsRef = query(
      collectionRef,
      where("username", "==", username),
      limit(1)
    );
    const userDoc = (await getDocs(docsRef)).docs[0];

    return userDoc;
  } catch (err) {
    console.log(err);
  }
};
