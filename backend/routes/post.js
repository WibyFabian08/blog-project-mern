const express = require("express");
const router = express.Router();
const uploadImage = require("../middlewares/uploadImage");

const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

router.get("/", postController.getPosts);
router.get("/detail/:id", postController.getPost);
router.get("/search", postController.getPostBySearch);
router.post("/", auth, uploadImage, postController.createPost);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", auth, uploadImage, postController.editPost);
router.put("/:id/like", auth, postController.likePost);
router.put("/:id/comment", auth, postController.commentPost);

module.exports = router;
