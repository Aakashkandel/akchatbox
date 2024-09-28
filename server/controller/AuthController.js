const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmpassword) {
        return res.status(400).json({ message: "passwords do not match" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 10);



    const user = new User({
        name,
        email,
        password: passwordHash
    });
    
    await user.save();
    const token = jwt.sign({ id: user._id }, 'shhhh', {
        expiresIn: 60 * 60 * 24
    });
    res.json({ auth: true, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne ({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user
        ._id }, 'shhhh', {
            expiresIn: 60 * 60 * 24
        });
    res.json({ auth: true, token ,id: user._id, name: user.name, email: user.email, image: user.image });
}

const upload = async (req, res) => {
    const { id } = req.user;
    const image = req.file.filename;
    

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    if (!req.file.mimetype.startsWith("image")) {
        return res.status(400).json({ message: "Please upload an image file" });
    }


    const user = await User.findByIdAndUpdate (id, { image });
    res.json({ message: "Image uploaded" });
}


const changepassword = async (req, res) => {
    const { id } = req.user;
    const { oldpassword, newpassword, confirmpassword } = req.body;
    if (!oldpassword || !newpassword || !confirmpassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(id);
    const isMatch = bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    if (newpassword !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    if (newpassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const passwordHash = await bcrypt.hash(newpassword, 10);
    await User.findByIdAndUpdate(id, { password: passwordHash });
    res.json({ message: "Password changed" });
}   

module.exports = { register, login, upload, changepassword };
