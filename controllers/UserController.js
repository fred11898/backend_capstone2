const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    }catch(err){
        throw err;
    }
};

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        throw err;
    }
};

const createUser = async (req, res) => {
    const { username, password, fullName } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    
    try {
        const user = await User.create({
            username: username,
            password: hashPassword,
            fullName: fullName
        });

        if (user){
            res.status(201).json({ msg: `Data inserted with ${user._id}` });
        } else {
            res.status(400).json({ msg: "Data not inserted" });
        } 
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ msg: "Username already exists" });
          } else {
            res.status(500).json({ msg: "Server error" });
          }   
    }
};

const updateUser = async (req,res) => {
    const { username, password, fullName, id } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (username) {
            user.username = username;
        }
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        if (fullName) {
            user.fullName = fullName;
        }

        await user.save();

        res.status(200).json({ msg: `Data Updated with id ${user._id}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({ msg: `Data Deleted with id ${user._id}` });
        } else {
            res.status(400).json({ msg: "Data not updated" });
        }
    } catch (err) {
        throw err;
    }
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };