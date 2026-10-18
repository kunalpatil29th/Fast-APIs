const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let post = [
    {
        username : "sachin",
        password : "1234",
        content : "this is sachin post",
        
    },
    {
        username : "rohit",
        password : "1234",
        content : "this is rohit post",
    },
    {
        username : "virat",
        password : "1234",
        content : "this is virat post",
    },
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", { posts: post});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs", { error: null, values: {} });
});

app.post("/posts", (req, res)=>{
    const { username, password, content } = req.body;
    const values = { username, password, content };

    if (![username, password, content].every(value => typeof value === "string" && value.trim())) {
        return res.status(400).render("new.ejs", {
            error: "Please fill in your username, password, and post content.",
            values
        });
    }

    post.push({
        username: username.trim(),
        password: password.trim(),
        content: content.trim()
    });

    res.redirect("/posts");
});



app.listen(port , ()=>{
    console.log("listening  to port :  8080");

    
});
