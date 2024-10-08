import { Follow } from './follow.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const followUser = async (userEmail: string, userEmailToFollow: string) => {
  if (userEmail === userEmailToFollow) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can't follow yourself");
  }

  const newFollow = await Follow.create({
    userEmail,
    followingUserEmail: userEmailToFollow,
  });

  return newFollow;
};

const unfollowUser = async (userEmail: string, userEmailToUnfollow: string) => {
  const followRecord = await Follow.findOneAndDelete({
    userEmail,
    followingUserEmail: userEmailToUnfollow,
  });
  if (!followRecord) {
    throw new AppError(httpStatus.NOT_FOUND, 'Follow record not found');
  }
};

const getUserFollowers = async (userEmail: string) => {
  const followers = await Follow.find({ followingUserEmail: userEmail }).select(
    'userEmail',
  );
  return followers;
};

const getUserFollowing = async (userEmail: string) => {
  const following = await Follow.find({ userEmail }).select(
    'followingUserEmail',
  );
  return following;
};

export const FollowService = {
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
};
