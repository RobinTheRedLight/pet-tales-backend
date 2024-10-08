/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Vote } from '../vote/vote.model';
import { Post } from '../post/post.model';
import { Payment } from '../payment/payment.model';
import { Follow } from '../follow/follow.model';
import { Comment } from '../comment/comment.model';
import { IPost } from '../post/post.interface';

const getAllUsersFromDB = async () => {
  const users = await User.find().select('-password');
  return users;
};

const deleteUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const userEmail = user.email;

  const result = await Promise.all([
    User.findByIdAndDelete(id),
    Vote.deleteMany({ userEmail }),
    Post.deleteMany({ author: userEmail }),
    Payment.deleteMany({ userEmail }),
    Follow.deleteMany({
      $or: [{ userEmail }, { followingUserEmail: userEmail }],
    }),
    Comment.deleteMany({ userEmail }),
  ]);

  return result;
};

const updateUserAdminFromDB = async (payload: any) => {
  const { id, updateData } = payload;
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

const getAllPayments = async () => {
  const payments = await Payment.find();
  return payments;
};

const togglePublishStatus = async (id: string): Promise<IPost | null> => {
  const post = await Post.findOne({ _id: id });

  if (!post) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Post not found or you are not authorized to modify this post',
    );
  }

  post.isPublishable = !post.isPublishable;
  await post.save();

  return post;
};

export const AdminServices = {
  getAllUsersFromDB,
  deleteUserFromDB,
  updateUserAdminFromDB,
  getAllPayments,
  togglePublishStatus,
};
