const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

/**
 * @api {get} /user/random for a random user
 * @apiDescription Get a random user
 * @apiPermission public
 *
 * @apiHeader N/A
 *
 * @apiParam  N/A
 * @apiParam  N/A
 *
 * @apiSuccess {Object{}} a random user.
 *
 * @apiError N/A
 * @apiError N/A
 */
router.get("/random", usersController.getRandomUser);

/**
 * @api {get} /user/all All Users
 * @apiDescription Get all Users
 *
 * @apiParam  {Number{1-}}         [limit=1]  Limit users data
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Bad Request 400)  Bad Request  Limit must be a number
 */
router.get("/all", usersController.getAllUsers);

/**
 * @api {post} /user/save Save a user
 * @apiDescription Save a user from request body. Must be includes required fields, id, gender, name, contact, address and photoUrl
 * @apiSuccess {Object{}} success message.
 *
 * @apiError (Bad Request 400)  Bad Request body is syntactically invalid
 */
router.post("/save", usersController.saveAUser);

/**
 * @api {patch} /user/update Update a user info
 * @apiDescription Update a user info from request body. Body will be a object and include id and updated fields
 * @apiSuccess {Object{}} success message.
 *
 * @apiError (Bad Request 400)  Bad Request  If invalid user id
 * @apiError (Bad Request 400)  Bad Request  If User id is not found
 */
router.patch("/update", usersController.updateUser);

/**
 * @api {patch} /user/bulk-update Update Multiple user info
 * @apiDescription Update multiple userinfo from request body. Body will be array of objects and object should be includes id and updated fields
 * @apiSuccess {Object{}} success message.
 *
 * @apiError (Bad Request 400)  Bad Request  If body is not an array
 */
router.patch("/bulk-update", usersController.bulkUpdate);

/**
 * @api {delete} /user/delete Delete a user with id
 * @apiDescription Delete a user, receive id as a object from body
 * @apiSuccess {Object{}} success message.
 *
 * @apiError (Bad Request 400)  Bad Request  If user id is not valid and user id not exists
 */
router.delete("/delete", usersController.deleteUser);

module.exports = router;
