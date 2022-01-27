const fs = require("fs");

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename.');
        }

        //no async code here, this is going to be used only once.
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
}

//testing
new UsersRepository('users.json');