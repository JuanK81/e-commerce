const fs = require('fs');
const { report } = require('process');

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

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    }));
  }
}

//testing
const test = async () => {
    const repo = new UsersRepository('users.json');

    const users = await repo.getAll();

    console.log(users);
}


test();