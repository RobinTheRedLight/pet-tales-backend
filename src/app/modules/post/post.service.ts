import { IPost } from './post.interface';
import { Post } from './post.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createPost = async (postData: IPost): Promise<IPost> => {
  const newPost = await Post.create(postData);
  return newPost;
};

const getAllPosts = async (): Promise<IPost[]> => {
  const posts = await Post.find();
  return posts;
};

const getPostById = async (id: string): Promise<IPost | null> => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return post;
};

const updatePost = async (
  id: string,
  userEmail: string,
  updateData: Partial<IPost>,
): Promise<IPost | null> => {
  const post = await Post.findOneAndUpdate(
    { _id: id, author: userEmail },
    updateData,
    { new: true },
  );

  if (!post) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this post',
    );
  }

  return post;
};

const deletePost = async (
  id: string,
  userEmail: string,
): Promise<IPost | null> => {
  const post = await Post.findOneAndDelete({ _id: id, author: userEmail });
  if (!post) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this post',
    );
  }
  return post;
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
