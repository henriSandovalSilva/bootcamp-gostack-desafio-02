import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    // busca o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // verifica se a senha está correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const { id, name } = user;

    // gera o token e retorna para o front
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
