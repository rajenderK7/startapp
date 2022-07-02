import { FieldValue } from "firebase/firestore";

type PostModel = {
  uid: string;
  postID: string;
  title: string;
  desc: string;
  images: string[];
  username: string;
  photoURL: string;
  votes: number;
  published: boolean;
  resourceLinks: string[];
  createdAt: any;
  updatedAt: any;
};

export default PostModel;
