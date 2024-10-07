import { IVote } from './vote.interface';
import { Vote } from './vote.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Post } from '../post/post.model';

const createOrUpdateVote = async (
  userEmail: string,
  postId: string,
  voteType: 'upvote' | 'downvote',
): Promise<IVote> => {
  const existingVote = await Vote.findOne({ userEmail, postId });
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  if (existingVote) {
    if (existingVote.voteType === voteType) {
      // Remove the vote if the user clicks on the same vote type again
      await Vote.findByIdAndDelete(existingVote._id);
      if (voteType === 'upvote') {
        post.upvoteCount = Math.max((post.upvoteCount ?? 0) - 1, 0);
      } else {
        post.downvoteCount = Math.max((post.downvoteCount ?? 0) - 1, 0);
      }
      await post.save();
      throw new AppError(httpStatus.NO_CONTENT, 'Vote removed successfully');
    } else {
      // Update the vote type if different
      if (existingVote.voteType === 'upvote') {
        post.upvoteCount = (post.upvoteCount ?? 0) + 1;
        post.downvoteCount = Math.max((post.downvoteCount ?? 0) - 1, 0);
      } else {
        post.downvoteCount = (post.downvoteCount ?? 0) + 1;
        post.upvoteCount = Math.max((post.upvoteCount ?? 0) - 1, 0);
      }
      existingVote.voteType = voteType;
      await existingVote.save();
      await post.save();
      return existingVote;
    }
  } else {
    // Create a new vote
    const newVote = await Vote.create({ userEmail, postId, voteType });
    if (voteType === 'upvote') {
      post.upvoteCount = (post.upvoteCount ?? 0) + 1;
    } else {
      post.downvoteCount = (post.downvoteCount ?? 0) + 1;
    }
    await post.save();
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
