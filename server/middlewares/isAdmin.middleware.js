const checkAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "User not authenticated!",
      });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized: Admins only!",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export default checkAdmin;
