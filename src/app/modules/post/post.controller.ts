import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';
import httpStatus from 'http-status';
import { IPost } from './post.interface';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.userEmail;
  const postData: IPost = { ...req.body, author: userEmail };
  const post = await PostService.createPost(postData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
    data: post,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await PostService.getAllPosts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: posts,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getPostById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: post,
  });
});

const getPostsByUserEmail = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const posts = await PostService.getPostsByUserEmail(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: posts,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userEmail = req.user.userEmail;
  const updateData = req.body;

  const post = await PostService.updatePost(id, userEmail, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: post,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userEmail = req.user.userEmail;

  const post = await PostService.deletePost(id, userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: post,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserEmail,
  updatePost,
  deletePost,
};
