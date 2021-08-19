const fs = require('fs');

const useRoutes = function() {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        // 动态导入路由
        const router = require(`./${file}`);
        // 注意 this 的隐式绑定 
        this.use(router.routes());
        this.use(router.allowedMethods());
    })
} 

module.exports = useRoutes;