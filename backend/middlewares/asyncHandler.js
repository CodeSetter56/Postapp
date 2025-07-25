export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(`Error in ${fn.name}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}