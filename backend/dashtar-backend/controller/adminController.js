require("dotenv").config();
const  pg = require('pg');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize'); 
// let Sequelize = new Sequelize(/*...*/);
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
const  {Admins}  = require('../models/Admin');
// const { Pool } = require('pg')
// const pool = new Pool()
const Sequelize = ('../config/db');

const registerAdmin = async (req, res) => {
  try {
    // console.log('email', req.body.email)
    const isAdded = await Admins.findOne({where :{ email: req.body.email }});
    // const all = await Admins.findAll()
    // console.log('res', isAdded)
    if (isAdded) {
      return res.status(403).send({
        message: 'This Email already Added!',
      });
    } else {
     const staff = await Admins.create(
     {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password),
     })
    //  console.log('res2',staff)
     const token = signInToken(staff);
      res.send({
        token,
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


 const loginAdmin = async function(req, res) {
  try {
    const admin = await Admins.findOne({where: { email: req.body.email }}); 
    // console.log(admin2)
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {

      const token = signInToken(admin);
      res.send({
        token,
        id: admin.id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
      admin.token = token;
    } else {
      res.status(401).send({
        message: 'Invalid Admin or password!',
      });
    }
  } catch (err) {
   console.log('admin not found 2');
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const isAdded = await Admins.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: 'Admin/Staff Not found with this email!',
    });
  } else {
    const token = tokenForVerify(isAdded);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: 'Password Reset',
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>Dashtar</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.ADMIN_URL}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>

        
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@dashtar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Dashtar Team</strong>
             `,
    };
    const message = 'Please check your email to reset password!';
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const staff = await Admins.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: 'Token expired, please try again!',
        });
      } else {
        staff.password = bcrypt.hashSync(req.body.newPassword);
        staff.save();
        res.send({
          message: 'Your password change successful, you can login now!',
        });
      }
    });
  }
};

const addStaff = async (req, res) => {
  try {
    const isAdded = await Admins.findOne({
     where: { email: req.body.data.email }
    });
    if (isAdded) {
      return res.status(500).send({
        message: 'This Email already Added!',
      });
    } else {
      const newStaff = new Admins({
        name: req.body.data.name,
        email: req.body.data.email,
        password: bcrypt.hashSync(req.body.data.password),
        phone: req.body.data.phone,
        joiningdate: req.body.data.joiningdate,
        role: req.body.data.role,
        image: req.body.data.image,
      });

      await newStaff.save();
      res.status(200).send({
        message: 'Staff Added Successfully!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const admins = await Admins.findAll({});
    res.send(admins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    res.send(admin);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    if (admin) {
      admin.name = req.body.data.name;
      admin.email = req.body.data.email;
      admin.phone = req.body.data.phone;
      admin.role = req.body.data.role;
      admin.joiningData = dayjs().utc().format(req.body.data.joiningdate);
      admin.password = req.body.data.password
        ? bcrypt.hashSync(req.body.data.password)
        : admin.password;
      admin.image = req.body.data.image;
      const updatedAdmin = await admin.save();
      const token = signInToken(updatedAdmin);
      res.send({
        token,
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
        joiningData: updatedAdmin.joiningData,
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteStaff = async (req, res) => {
  try{
  console.log(req.params, typeof(req.params.id))
  const newId = Number(req.params.id)
  console.log(newId, typeof(newId))
  const response = await Admins.destroy({ where: { id: newId } })
  console.log(response)
  res.status(200).send({
    message: 'Admin Deleted Successfully!',
  });
  }
  catch(e) {
    console.log(e)
    res.status(500).send({
     message: err.message,
})
}
};


module.exports = {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
