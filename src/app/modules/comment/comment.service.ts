import { IComment } from './comment.interface';
import { Comment } from './comment.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createComment = async (commentData: IComment): Promise<IComment> => {
  const newComment = await Comment.create(commentData);
  return newComment;
};

const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
  const comments = await Comment.find({ postId }).populate('userEmail', 'name');
  return comments;
};

const updateComment = async (
  commentId: string,
  userEmail: string,
  updateData: Partial<IComment>,
): Promise<IComment | null> => {
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, userEmail },
    updateData,
    { new: true },
  );

  if (!comment) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this comment',
    );
  }

  return comment;
};

const deleteComment = async (
  commentId: string,
  userEmail: string,
): Promise<IComment | null> => {
  const comment = await Comment.findOneAndDelete({ _id: commentId, userEmail });

  if (!comment) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this comment',
    );
  }

  return comment;
};

export const CommentService = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
