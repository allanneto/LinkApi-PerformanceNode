const Cache = require('node-cache');

class CacheHelper {

    constructor() {
        this.cache = new Cache();
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        this.cache.set(key, value, 10);
    }
}

module.exports = new CacheHelper();