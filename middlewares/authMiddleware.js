import jwt from "jsonwebtoken";

//Header Section - MetaData + Token --> Behind the scene
// Body Section - Visible Part
const userAuth = async (req, res, next) => {
  //Getting the token from Header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
//   console.log(token);
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payLoad.userId,
    };
    next();
  } 
  catch (error) {
    next("Auth Failed",error);
  }
};
// userAuth()
export default userAuth;
