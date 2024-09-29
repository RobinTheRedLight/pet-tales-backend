/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);

  const { _doc } = result as any;

  const { password, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: userWithoutPassword,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: users,
  });
});

const getUser = catchAsync(async (req, res) => {
  let token: any = req.headers.authorization;
  const splitToken = token.split(' ');
  token = splitToken[1];
  const result = await UserServices.getUserFromDB(token);

  const { _doc } = result as any;

  const { password, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: userWithoutPassword,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  let token: any = req.headers.authorization;
  const splitToken = token.split(' ');
  token = splitToken[1];
  const updateData = req.body;
  const result = await UserServices.updateUserFromDB({ updateData, token });
  const { _doc } = result as any;
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: userWithoutPassword,
  });
});

const updateUserAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await UserServices.updateUserAdminFromDB({ updateData, id });
  const { _doc } = result as any;
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: userWithoutPassword,
  });
});

export const UserControllers = {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  updateUserAdmin,
};
