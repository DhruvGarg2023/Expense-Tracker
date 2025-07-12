import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation

export const register = async (req, res) => {
    try{
        const {fullname, email, password} = req.body;
        console.log(req.body); // Log the request body for debugging

        if(!fullname || !email || !password) {      //if one of the fields is empty
            return res.status(400).json({ 
                message: "All fields are required",
                success: false 
            });
        }

        const user = await User.findOne({ email }); // Check if the user already exists
        if(user) {
            return res.status(400).json({ 
                message: "User already exists",
                success: false 
            });
        } 

        //Hash means to convert the password into a secure format
        // bcrypt is used to hash the password before saving it to the database
        const hashesdPassword = await bcrypt.hash(password, 10);  ////10 is the salt number rounds, which determines the complexity of the hashing

        await User.create({
            fullname,
            email,
            password: hashesdPassword // Store the hashed password
        });

        return res.status(201).json({ 
            message: "User registered successfully",
            success: true 
        });
        
        
    }
    catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(req.body); 

        if(!email || !password) {      //if one of the fields is empty
            return res.status(400).json({ 
                message: "All fields are required",
                success: false 
            });
        }

        const user = await User.findOne({ email }); // Check if the user exists
        if(!user) {
            return res.status(400).json({ 
                message: "Incorrect email or password",
                success: false 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in database
        if(!isPasswordValid) {
            return res.status(400).json({ 
                message: "Incorrect email or password",
                success: false 
            });
        }

        //Now we generate a token for the user so that it can be saved in the cookie and used for authentication in future requests
        const tokenData = {
            userId: user._id, // Store the user's ID in the token
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'}); // Generate a JWT token with a 1-day expiration

        //this response will be sent to the frontend, which will then store the token in a cookie
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite:'Strict'}).json({  // Set the token in a cookie with a max age of 1 day; 
            message: `Welcome back ${user.fullname}`,
            success: true,
            user:{         // Return user details in the response
                fullname: user.fullname,
                email: user.email,
                id: user._id
            }
        })      
        //cross site scripting attacks are prevented by setting the httpOnly flag, which means the cookie cannot be accessed via JavaScript in the browser
    }
    catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({ // Clear the token cookie by setting its max age to 0
            message: "Logged out successfully",
            success: true
        });
    }
    catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


/* This is default export, not compatible with named import
export default {
    register,
    login,
    logout
}; */