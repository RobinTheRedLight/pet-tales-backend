import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowService } from './follow.service';
import httpStatus from 'http-status';

const followUser = catchAsync(async (req: Request, res: Response) => {
  const { userIdToFollow } = req.body;
  const userEmail = req.user?.userEmail;
  const follow = await FollowService.followUser(userEmail, userIdToFollow);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: follow,
  });
});

const unfollowUser = catchAsync(async (req: Request, res: Response) => {
  const { userIdToUnfollow } = req.body;
  const userEmail = req.user?.userEmail;
  await FollowService.unfollowUser(userEmail, userIdToUnfollow);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollowed successfully',
    data: [],
  });
});

const getUserFollowers = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const followers = await FollowService.getUserFollowers(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: followers,
  });
});

const getUserFollowing = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const following = await FollowService.getUserFollowing(userId);

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
