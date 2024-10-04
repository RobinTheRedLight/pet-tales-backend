import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentService } from './comment.service';
import httpStatus from 'http-status';
import { IComment } from './comment.interface';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.userEmail;
  const commentData: IComment = { ...req.body, userEmail: userEmail };
  const comment = await CommentService.createComment(commentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Comment created successfully',
    data: comment,
  });
});

const getCommentsByPostId = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const comments = await CommentService.getCommentsByPostId(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: comments,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userEmail = req.user.userEmail;
  const updateData = req.body;

  const comment = await CommentService.updateComment(
    commentId,
    userEmail,
    updateData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: comment,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userEmail = req.user.userEmail;

  const comment = await CommentService.deleteComment(commentId, userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: comment,
  });
});

export const CommentController = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
