import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VoteService } from './vote.service';
import httpStatus from 'http-status';

const createOrUpdateVote = catchAsync(async (req: Request, res: Response) => {
  const { postId, voteType } = req.body;
  const userEmail = req.user.userEmail;
  const vote = await VoteService.createOrUpdateVote(
    userEmail,
    postId,
    voteType,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vote recorded successfully',
    data: vote,
  });
});

const getVotesByPostId = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userEmail = req.query.userEmail as string;
  console.log(req.user);
  const votes = await VoteService.getVotesByPostId(postId, userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: votes,
  });
});

export const VoteController = {
  createOrUpdateVote,
  getVotesByPostId,
};
