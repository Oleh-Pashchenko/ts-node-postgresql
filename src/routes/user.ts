import { Router } from "express";
import {
  getRead,
  getEmailVerify,
  getCollectedData,
  postLogin,
  postCreate,
  postRefreshToken,
  putPasswordReset,
  postPasswordForgot,
  putPasswordForgot,
  deleteUser,
  putUpdate,
  auth
} from "../controllers/user";
const router = Router();
router.get("/collected-data", auth, getCollectedData);
router.get("/email-verify", getEmailVerify);
router.get("/", auth, getRead);

router.post("/refresh-token", postRefreshToken);
router.post("/password-forgot", postPasswordForgot);
router.post("/login", postLogin);
router.post("/", postCreate);


router.put("/password-forgot", putPasswordForgot);
router.put("/password", auth, putPasswordReset);
router.put("/", auth, putUpdate);

router.delete("/", auth, deleteUser);

export default router;
