/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await AdminServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: users,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const updateUserAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AdminServices.updateUserAdminFromDB({ updateData, id });
  const { _doc } = result as any;
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: userWithoutPassword,
  });
});

export const AdminControllers = {
  getAllUsers,
  deleteUser,
  updateUserAdmin,
};
