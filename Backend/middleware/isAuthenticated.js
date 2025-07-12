import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "Unauthorized Access",
                success:false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);  

        if(!decode){    //decode is an object with user id that we get from token
            return res.status(401).json({
                message: "Invalid Token",
                success:false
            })
        }

        req.id = decode.userId;  // req.id is the user id that we get from token

        next(); // next is a function that calls the next middleware in the stack and passes the request and response objects to it
    }
    catch(error){
        console.log(error);
    }
}

export default isAuthenticated;