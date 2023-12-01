import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
//router object
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of user collection
 *          example: 6752fyt6t6751fgy
 *        name:
 *          type: string
 *          description: The auto-generated id of user name
 *          example: Leo
 *        email:
 *          type: string
 *          description: The auto-generated id of user email address
 *          example: leoMessi@fifa.com
 *        password:
 *          type: string
 *          description: The auto-generated id of user password
 *          example: messi0123
 *        location:
 *          type: string
 *          description: The auto-generated id of user location
 *          example: Argentina
 */


/**
 * @swagger
 * tags:
 *  name: auth
 *  description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *    summary: register new user
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *        200:
 *          description: Users created successfully
 *          content:
 *            application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
 *        500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *    summary: User login
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *        200:
 *          description: Logged in successfully
 *          content:
 *            application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
 *        500:
 *          description: Internal Server Error
 */

//register routes
router.post("/register", limiter, registerController);

//login routes
router.post("/login", limiter, loginController);

export default router;
