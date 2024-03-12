import express from "express";
import { User } from "../Models/userModel.js";
import { upload } from "../multerConfig.js";
import { PORT } from "../Config.js";
import Jwt from "jsonwebtoken";

const router = express.Router();

// Add user / register
router.post("/register", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, errors: "User already exist!" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
      image: req.body.image,
    });
    const savedUser = await User.create(user);
    // res.status(201).send(savedUser);

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = Jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Upload user image
router.post("/upload", upload("User").single("user"), async (req, res) => {
  try {
    if (req.file) {
      return res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/User/${req.file.filename}`,
      });
    } else {
      res.status(400).json({ success: 0, message: "No file uploaded" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// login
router.use("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = Jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
      } else {
        res.json({ success: false, error: "Wrong Password" });
      }
    } else {
      res.json({ success: false, error: "Wrong Email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token!" });
  } else {
    try {
      const data = Jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send(error);
    }
  }
};

// add product to cart
router.get("/addtocart", fetchUser, async (req, res) => {
  console.log("Added to cart", req.body.Itemid);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.Itemid] += 1;
  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added to cart");
});

// remove product from cart
router.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed from cart", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed from cart");
  }
});

// keep cart data after logout
router.post("/getcart", fetchUser, async (req, res) => {
  console.log("SetCart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ _id: id });
    res.status(201).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).send({ message: "User not found!" });
    } else {
      res
        .status(200)
        .send({ message: "User updated successfully", updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get one user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: "User not found!" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
