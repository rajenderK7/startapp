import dayjs from "dayjs";
import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { format } from "timeago.js";

const postToJSON = (doc: DocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    // createdAt: dayjs.unix(data?.createdAt.seconds),
    // updatedAt: dayjs.unix(data?.updatedAt.seconds),
    createdAt: dayjs
      .unix((data?.createdAt as Timestamp).seconds)
      .format("YYYY-MM-DD"),
    updatedAt: dayjs
      .unix((data?.updatedAt as Timestamp).seconds)
      .format("YYYY-MM-DD"),
    // createdAt: format((data?.createdAt as Timestamp).seconds),
    // updatedAt: format((data?.createdAt as Timestamp).seconds),
    // createdAt: JSON.parse(JSON.stringify(data?.createdAt)),
    // updatedAt: JSON.parse(JSON.stringify(data?.updatedAt)),
    // createdAt: (data?.createdAt as Timestamp).toMillis(),
    // updatedAt: (data?.updatedAt as Timestamp).toMillis(),
  };
};

export default postToJSON;
