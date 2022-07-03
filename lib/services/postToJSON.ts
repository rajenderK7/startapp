import { convertTimestamp } from "convert-firebase-timestamp";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const postToJSON = (doc: DocumentSnapshot<DocumentData>) => {
  const data = doc.data();

  const createdAt = convertTimestamp(data?.createdAt).toString();
  const updatedAt = convertTimestamp(data?.updatedAt).toString();
  const votes = votesModifier(data?.votes);

  return {
    ...data,
    votes,
    createdAt,
    updatedAt,
  };
};

const votesModifier = (votes: number): string => {
  let votesModified = votes.toString();

  if (votes >= 1000 && votes < 1000000) {
    votesModified = `${(votes / 1000).toFixed(1).toString()}K`;
  } else if (votes >= 1000000) {
    votesModified = `${(votes / 1000000).toFixed(1).toString()}M`;
  }

  return votesModified;
};

export default postToJSON;
