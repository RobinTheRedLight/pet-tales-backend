import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowService } from './follow.service';
import httpStatus from 'http-status';

const followUser = catchAsync(async (req: Request, res: Response) => {
  const { userEmailToFollow } = req.body;
  const userEmail = req.user?.userEmail;
  const follow = await FollowService.followUser(userEmail, userEmailToFollow);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: follow,
  });
});

const unfollowUser = catchAsync(async (req: Request, res: Response) => {
  const { userEmailToUnfollow } = req.body;
  const userEmail = req.user?.userEmail;
  await FollowService.unfollowUser(userEmail, userEmailToUnfollow);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollowed successfully',
    data: [],
  });
});

const getUserFollowers = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const followers = await FollowService.getUserFollowers(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: followers,
  });
});

const getUserFollowing = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const following = await FollowService.getUserFollowing(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: following,
  });
});

export const FollowController = {
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
};
