const cacheHelper = require('../helpers/cache.helper');
const userModel = require('../models/user.model');

class UserRepository {
    async get() {
        const users = await userModel.find().limit(20);
        return users;
    }

    async getById(id) {
        const user = await userModel.findById(id).lean();
        return user;
    }
}

module.exports = new UserRepository();