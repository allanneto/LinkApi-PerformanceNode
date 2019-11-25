require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
// const { RateLimit } = require('koa2-ratelimit');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const start = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Mongodb connected!');

    const app = new Koa();
    const router = new Router();

    // const limiter = RateLimit.middleware({
    //     interval: { min: 15 }, // 15 minutes = 15*60*1000
    //     delayAfter: 1,
    //     max: 5, // limit each IP to 100 requests per interval
    // });

    // //  apply to all requests
    // app.use(limiter);

    // routes
    const userRouter = require('./controllers/user.controller');
    const asyncRouter = require('./controllers/async.controller');

    router.get('/users', userRouter.get);
    router.get('/users/:id', userRouter.getById);

    router.get('/sequencial', asyncRouter.sequencialRequests);
    router.get('/parallel', asyncRouter.parallelRequests);

    app.use(router.routes());

    const server = app.listen(process.env.PORT);
    console.log(`Http server listening on port: ${process.env.PORT}`);

    // setupGracefulShutdown(server);
};

(async () => {
    if (cluster.isMaster) {
        console.log('Master process is running');
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    } else {
        await start();
    }
})();
