const User = require('../../../../server/models/User');

export default class Passport {
    constructor() {
        // 用户登录标识
        this.isLogin = false;
    }

    login(username, psd, callback) {
        User.find({ name: username, password: psd }, (err, doc) => {
            if (err) {
            } else {
                this.isLogin = true;
            }
        });
    }
}
