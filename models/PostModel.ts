type PostModel = {
  uid: string;
  title: string;
  desc: string;
  images?: string[];
  username: string;
  photoURL: string;
  votes: number;
  resourceLinks: string[];
  // createdAt: Date;
  // updatedAt: Date;
};

export default PostModel;
