const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt');

const register = async (req, res) => {
  try {
    const { name, surname, nick, email, password, role, image } = req.body;
    if (!name || !nick || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos por enviar' });
    }
    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { nick: nick.toLowerCase() }
      ]
    });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      surname,
      nick,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user',
      image: image || ''
    });
    await user.save();
    return res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el registro', error });
  }
};

// Autenticación de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan datos por enviar' });
    }
    // Buscar usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No existe el usuario' });
    }
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    // Generar token
    const token = jwt.createToken(user);
    // Excluir la contraseña antes de devolver los datos del usuario
    user.password = undefined;
    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image
      },
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el login', error });
  }
};

// Listar usuarios (sin contraseñas)
const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ date: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener usuario por id
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// Actualizar usuario por id
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const update = { ...req.body };
    // Si envían password, encriptarla
    if (update.password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    }
    const user = await User.findByIdAndUpdate(userId, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario actualizado', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

// Eliminar usuario por id
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

module.exports = { register, login, listUsers, getUser, updateUser, deleteUser };


