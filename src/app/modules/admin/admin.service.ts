/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const getAllUsersFromDB = async () => {
  const users = await User.find().select('-password');
  return users;
};

const deleteUserFromDB = async (id: string) => {
  const deleteResult = await User.findByIdAndDelete(id);

  if (!deleteResult) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found or already deleted',
    );
  }

  return deleteResult;
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

export const AdminServices = {
  getAllUsersFromDB,
  deleteUserFromDB,
  updateUserAdminFromDB,
};
