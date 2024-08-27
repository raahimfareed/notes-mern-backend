import { Router } from "express";

const router = Router();

router.get('/authenticate', (req, res) => {
  res.json({
    message: "Logging in"
  })
});

export default router;
