const checkClient = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "User not authenticated!",
      });
    }
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized: Clients only!",
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

export default checkClient;
