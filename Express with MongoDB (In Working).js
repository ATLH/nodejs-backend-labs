import mongoose from "mongoose"
import { config as dotenv_Config } from "dotenv"
import express from "express"

dotenv_Config();

const app = express();
app.use(express.json());

const db_uri = process.env.MONGODB_URI;

(
    async () => {
        try {
            await mongoose.connect(db_uri)
            .then(() => console.log("Connection Successful."))
            .catch((err) => {
                console.log("Database Connection Error:\n\n", err);
                process.exit();
            });
        } catch (err) {
            console.log("Library Connection Error: ", err);
        }
    }
)();

const userSchema = new mongoose.Schema({
    id:Number,
    name:String
});

const User = mongoose.model('User', userSchema);
 
app.use('/get', (req, res) => {
    let user;
    (
        async () => {
            await User.findOne({id: req.body.id})
            .then(value => user = value)
            .catch(err => console.log("Error with get from database: ", err));

            if (user != null){
                res.send(`User Details: \n ${user}`);
            }
            else res.send("User with the requested id could not be located");
            console.log(user);
        }
    )();
});





app.use('/post', (req, res) => {
    let user;
    (
        async () => {
            await User.findOne({id: req.body.id})
            .then(value => user = value)
            .catch(err => console.log("Error with post from database: ", err));

            if (user != null){
                res.send(`Error! User Already Exists\n\nExisting User Details:\n${user}`);
            }
            else {
                await User.create({id:req.body.id, name:req.body.name})
                .then(() => res.send("User Successfully Created"))
                .catch(err => {
                    res.send("Error Incurred with User Creation");
                    console.log("Error Incurred with User Creation", err);
                });
            }
        }
    )();
});



app.use('/put', (req, res) => {
    let user;
    (
        async () => {
            await User.findOne({id: req.body.id})
            .then(value => user = value)
            .catch(err => console.log("Error with put from database: ", err));

            if (user != null){
                res.send(`Error! User Already Exists\n\nExisting User Details:\n${user}`);
            }
            else {
                await User.create({id:req.body.id, name:req.body.name})
                .then(() => res.send("User Successfully Created"))
                .catch(err => {
                    res.send("Error Incurred with User Creation");
                    console.log("Error Incurred with User Creation", err);
                });
            }
        }
    )();
});




app.use('/delete', (req, res) => {
    let user;
    (
        async () => {
            let delete_status;

            await User.deleteOne({id: req.body.id})
            .then(value => delete_status = value)
            .catch(err => console.log("Error with get from database: ", err));

            if (delete_status.acknowledged === true && delete_status.deletedCount != 0){
                res.send("User Deleted Successfully");
            }
            else res.send("Error! No user with given ID found");
        }
    )();
});

app.listen(3000);


