const Models = require("../modelORMs/index")
const CustomItem = Models.CustomItems;

// Create a new custom item
async function createCustomItem(data) {
    return await CustomItem.create(data);
}

// Get all custom items
async function getAllCustomItems() {
    return await CustomItem.findAll();
}

// Get a custom item by ID
async function getCustomItemById(customItemsId) {
    return await CustomItem.findByPk(customItemsId);
}

// Update a custom item by ID
async function updateCustomItem(customItemsId, data) {
    const item = await CustomItem.findByPk(customItemsId);
    if (!item) return null;
    await item.update(data);
    return item;
}

// Delete a custom item by ID
async function deleteCustomItem(customItemsId) {
    const item = await CustomItem.findByPk(customItemsId);
    if (!item) return null;
    await item.destroy();
    return true;
}

module.exports = {
    createCustomItem,
    getAllCustomItems,
    getCustomItemById,
    updateCustomItem,
    deleteCustomItem
};