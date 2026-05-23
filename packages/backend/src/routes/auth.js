const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db/pool");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 900000,
    max: 3,
    message: " maximum attemp exceeded"
})

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Invalid input" });

  const { rows } = await pool.query("SELECT id, email, password_hash, role FROM users WHERE email = $1", [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
    );

    const refreshToken = jwt.sign(
          { sub: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,{ expiresIn: "7d" }
    );
  
  res.json({ accessToken, refreshToken });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, role = "agent" } = req.body;
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
    const { rows } = await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email, hash, role]
    );
    res.status(201).json({ user: rows[0] });
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "Email taken" });
    next(err);
  }
});


//returns current logged in users info from the token
router.get("/me",  requireAuth, async (req, res) =>{
    return res.status(200).json(req.user)
});

router.post("/refresh", async (req, res) =>{
    //Get the refresh token from the request body
    const { refreshToken } = req.body;
    //verify it
    try{
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    // Create a new access token using the payload
    const accessToken = jwt.sign(
        { sub: payload.sub, email: payload.email, role: payload.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m"}
    )
    res.json({ accessToken });
    }catch(err){
        return res.status(401).json({ error: "Invalid refresh token"})
    }

});



module.exports = router;