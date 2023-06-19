require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const auth = require("./middlewares/auth");
const cors = require("cors");
const logger = require("./middlewares/logger");


// Models
const Info = require("./models/Info");
const Favorites = require("./models/Favorites");
const Confession = require("./models/Confession");
const ToOwner = require("./models/ToOwner");
const SocialMedia = require("./models/SocialMedia");
const User = require("./models/User");


// Routes
const UserRoutes = require("./routes/User");
const authenticationRoutes = require("./routes/Authentication");

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_STRING + process.env.DB_NAME, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Successfully Connected ....."));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use("/api/user", UserRoutes);
app.use(logger);

app.use("/api", authenticationRoutes);

// app.use(auth);


// API POST for Friends

// API find
app.get("/api/friends", async (req, res) => {
    const friends = await Info.find({})
    .populate("favorites")
    .populate("confession")
    .populate("socialMedia")
    .populate("toOwner")
    .sort({createdAt: -1})
    .limit(20);
    res.status(200).send(friends);
});

app.get("/api/myinfo/:id", async (req, res) => {
    const friends = await Info.findById(req.params.id)
    .populate("favorites")
    .populate("confession")
    .populate("socialMedia")
    .populate("toOwner");

    if (!friends) {
        return res.status(404).send("Not Found");
    }
    res.status(200).send(friends);
});

// API findById
app.get("/api/friend/:userId", async (req, res) => {

    try{

        const userId = req.params.userId;

        const friends = await Info.find({ user: userId })
        .populate("favorites")
        .populate("confession")
        .populate("socialMedia")
        .populate("toOwner")
        .exec();
    
        if(!friends || friends.length === 0){
            return res.status(404).send("You don't have autograph yet");
        }
        res.status(200).send(friends);

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

});

// API CREATE/ADD

app.post("/api/forms/:userId", async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        suffix,
        nickname,
        birthday,
        age,
        email,
        address,
        phoneNumber,
        color,
        dish,
        fruit,
        movie,
        anime,
        pet,
        music,
        person,
        tvSeries,
        celebrity,
        crush,
        firstLove,
        firstRelationship,
        firstKiss,
        status,
        ambitions,
        talent,
        themeSong,
        motto,
        moment,
        hobbies,
        facebook,
        instagram,
        twitter,
        unforgettable,
        likes,
        message,
      } = req.body;
  
      const userId = req.params.userId;
  
      const newFavorites = await Favorites.create({
        color,
        dish,
        fruit,
        movie,
        anime,
        pet,
        music,
        person,
        tvSeries,
        celebrity,
      });
  
      const newConfession = await Confession.create({
        crush,
        firstLove,
        firstRelationship,
        firstKiss,
        status,
        ambitions,
        talent,
        themeSong,
        motto,
        moment,
        hobbies,
      });
  
      const newSocialMedia = await SocialMedia.create({
        facebook,
        instagram,
        twitter,
      });
  
      const newToOwner = await ToOwner.create({
        unforgettable,
        likes,
        message,
      });
  
      const newInfo = await Info.create({
        first_name,
        middle_name,
        last_name,
        suffix,
        nickname,
        birthday,
        age,
        email,
        address,
        phoneNumber,
        favorites: newFavorites._id,
        confession: newConfession._id,
        socialMedia: newSocialMedia._id,
        toOwner: newToOwner._id,
        user: userId,   
      });
  
      res.status(201).send(newInfo);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
  

// API UPDATE/EDIT

app.put("/api/friend-update/:id", async(req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        suffix,
        nickname,
        birthday,
        age,
        email,
        address,
        phoneNumber,
        color,
        dish,
        fruit,
        movie,
        anime,
        pet,
        music,
        person,
        tvSeries,
        celebrity,
        crush,
        firstLove,
        firstRelationship,
        firstKiss,
        status,
        ambitions,
        talent,
        themeSong,
        motto,
        moment,
        hobbies,
        facebook,
        instagram,
        twitter,
        unforgettable,
        likes,
        message
    } = req.body

    try {
        const friends = await Info.findById(req.params.id)
        .populate("favorites")
        .populate("confession")
        .populate("socialMedia")
        .populate("toOwner");
        const favorites = await Favorites.findById(friends.favorites);
        const confession = await Confession.findById(friends.confession);
        const socialMedia = await SocialMedia.findById(friends.socialMedia);
        const toOwner = await ToOwner.findById(friends.toOwner); 

        if (!friends) {
            return res.status(404).send("Name of friend not found");
        }

        if (first_name) friends.first_name = first_name;
        if (middle_name) friends.middle_name = middle_name;
        if (last_name) friends.last_name = last_name;
        if (suffix) friends.suffix = suffix;
        if (nickname) friends.nickname = nickname;
        if (birthday) friends.birthday = birthday;
        if (age) friends.age = age;
        if (email) friends.email = email;
        if (address) friends.address = address;
        if (phoneNumber) friends.phoneNumber = phoneNumber;
        if (favorites) {
            if (color !== undefined) friends.favorites.color = color;
            if (dish !== undefined) friends.favorites.dish = dish;
            if (fruit !== undefined) friends.favorites.fruit = fruit;
            if (movie !== undefined) friends.favorites.movie = movie;
            if (anime !== undefined) friends.favorites.anime = anime;
            if (pet !== undefined) friends.favorites.pet = pet;
            if (music !== undefined) friends.favorites.music = music;
            if (person !== undefined) friends.favorites.person = person;
            if (tvSeries !== undefined) friends.favorites.tvSeries = tvSeries;
            if (celebrity !== undefined) friends.favorites.celebrity = celebrity;
            await friends.favorites.save();
        }
        if (confession) {
            if (crush !== undefined) friends.confession.crush = crush;
            if (firstLove !== undefined) friends.confession.firstLove = firstLove;
            if (firstRelationship !== undefined) friends.confession.firstRelationship = firstRelationship;
            if (firstKiss !== undefined) friends.confession.firstKiss = firstKiss;
            if (status !== undefined) friends.confession.status = status;
            if (ambitions !== undefined) friends.confession.ambitions = ambitions;
            if (talent !== undefined) friends.confession.talent = talent;
            if (themeSong !== undefined) friends.confession.themeSong = themeSong;
            if (motto !== undefined) friends.confession.motto = motto;
            if (moment !== undefined) friends.confession.moment = moment;
            if (hobbies !== undefined) friends.confession.hobbies = hobbies;
            await friends.confession.save();
        }
        if (socialMedia) {
            if (facebook !== undefined) friends.socialMedia.facebook = facebook;
            if (instagram !== undefined) friends.socialMedia.instagram = instagram;
            if (twitter !== undefined) friends.socialMedia.twitter = twitter;
            await friends.socialMedia.save();
        }
        if (toOwner) {
            if (unforgettable !== undefined) friends.toOwner.unforgettable = unforgettable;
            if (likes !== undefined) friends.toOwner.likes = likes;
            if (message !== undefined) friends.toOwner.message = message;
            await friends.toOwner.save();
        }

        await friends.save();

        res.status(200).send(friends);
        }catch(err) {
            console.log(err)
            res.status(500).send("Server Error");
        }
});

// API DELETE/REMOVE

app.delete("/api/friend-remove/:id", async (req, res) => {
    try {
        const friends = await Info.findById(req.params.id);

        if (!friends){
            return res.status(404).send("Friend not Found");
        }
        
        await friends.deleteOne();

        res.status(200).send("Friend Remove Successfully");
    }catch (err){
        res.status(500).send("Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}...`)
});