const Models = require("../modelORMs/index")
const UserModel = Models.Users

const getUserById = async (id) => {
    return await UserModel.findByPk(id);
};

const createUser = async (userData) => {
    return await UserModel.create(userData);
};

const updateUser = async (id, updateData) => {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    await user.update(updateData);
    return user;
};

const deleteUser = async (id) => {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
};

const getAllUsers = async () => {
    return await UserModel.findAll();
};

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
};
