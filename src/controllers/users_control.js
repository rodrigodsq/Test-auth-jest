const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

exports.LoginUser = async (req, res) => {
    try {
        const { email = '', password = '' } = req.body;

        if (!email || !password) {
        return res.status(401).json({ errors: ['Credenciais invalidas'] });
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
        return res.status(401).json({ errors: ['Usuario não existe'] });
        }

        const passValid = await user.passwordIsValid(password);

        if (!passValid) {
        return res.status(401).json({ errors: ['Senha invalida'] });
        }

        // console.log('chegou aqui!!');
        // console.log(process.env.TOKEN_SECRET);
        // console.log(process.env.TOKEN_EXPIRATION);

        const { id } = user;
        console.log('****************')
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
        });

        return res.json({ ok: true, token, user: { nome: user.nome, id, email } });
    } catch (error) {
        return res.json({error, ok: false});
    }
}
