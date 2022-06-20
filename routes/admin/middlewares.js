const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templatefunc) {
        return (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
              return res.send(templatefunc({ errors }));
            };

            next();
        }
    }
}