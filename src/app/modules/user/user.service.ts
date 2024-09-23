import User from './user.model'

const getAllUserFromDB = async () => {
  const res = await User.find()
  return res
}

const updateUserRoleIntoDB = async (id: string) => {
  const res = await User.findByIdAndUpdate(
    id,
    {
      role: 'admin',
    },
    { new: true, runValidators: true },
  )
  return res
}

const updateUserProfile = async (
  id: string,
  payload: { name: string; email: string; phone: string },
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const UserService = {
  getAllUserFromDB,
  updateUserRoleIntoDB,
  updateUserProfile,
}
