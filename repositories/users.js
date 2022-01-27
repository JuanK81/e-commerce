const { create } = require('domain');
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

  //Methods
  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    })
    );
}

    async create(attrs) {
        const records = await this.getAll();
        records.push(attrs);
        
        await fs.promises.writeFile(this.filename, JSON.stringify(records))
    }
}

//testing
const test = async () => {
    const repo = new UsersRepository('users.json');

    await repo.create({email: 'tester@test.com', password: 'tester'});
    
    const users = await repo.getAll();

    console.log(users);
}


test();