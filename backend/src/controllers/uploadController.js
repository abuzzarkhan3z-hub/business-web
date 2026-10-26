// @desc    Upload single image (Hero image, card photo, etc.)
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
  }

  // Construct accessible URL for the uploaded image
  const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
  const relativePath = `/uploads/${req.file.filename}`;
  const fullUrl = `${serverBaseUrl}${relativePath}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    filename: req.file.filename,
    path: relativePath,
    url: fullUrl,
  });
};
