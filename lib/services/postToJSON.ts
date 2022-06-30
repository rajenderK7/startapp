import { convertTimestamp } from "convert-firebase-timestamp";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const postToJSON = (doc: DocumentSnapshot<DocumentData>) => {
  const data = doc.data();

  const createdAt = convertTimestamp(data?.createdAt).toString();
  const updatedAt = convertTimestamp(data?.updatedAt).toString();

  return {
    ...data,
    createdAt,
    updatedAt,
  };
};

export default postToJSON;
