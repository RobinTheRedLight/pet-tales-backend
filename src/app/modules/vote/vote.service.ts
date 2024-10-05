import { IVote } from './vote.interface';
import { Vote } from './vote.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrUpdateVote = async (
  userEmail: string,
  postId: string,
  voteType: 'upvote' | 'downvote',
): Promise<IVote> => {
  const existingVote = await Vote.findOne({ userEmail, postId });

  if (existingVote) {
    if (existingVote.voteType === voteType) {
      // Remove the vote if the user clicks on the same vote type again
      await Vote.findByIdAndDelete(existingVote._id);
      throw new AppError(httpStatus.NO_CONTENT, 'Vote removed successfully');
    } else {
      // Update the vote type if different
      existingVote.voteType = voteType;
      await existingVote.save();
      return existingVote;
    }
  } else {
    // Create a new vote
    const newVote = await Vote.create({ userEmail, postId, voteType });
    return newVote;
  }
};

const getVotesByPostId = async (
  postId: string,
  userEmail?: string,
): Promise<{ upvotes: number; downvotes: number; userVotes?: IVote[] }> => {
  const upvotes = await Vote.countDocuments({ postId, voteType: 'upvote' });
  const downvotes = await Vote.countDocuments({ postId, voteType: 'downvote' });

  let userVotes: IVote[] = [];
  if (userEmail) {
    userVotes = await Vote.find({ postId, userEmail });
  }

  return { upvotes, downvotes, userVotes };
};

export const VoteService = {
  createOrUpdateVote,
  getVotesByPostId,
};
