export const generatePresentation = async (req, res) => {
  try {
    const { prompt, templateId, slideCount, duration, tone } = req.body || {};
    console.log("Received generation request:", req.body);
    if (!prompt || !templateId) {
      return res
        .status(400)
        .json({ message: "prompt and templateId are required" });
    }

    // Simulate processing
    await new Promise((r) => setTimeout(r, 500));

    return res.status(200).json({
      message: "Generation request received",
      data: { prompt, templateId, slideCount, duration, tone },
      presentationId: `demo_${Date.now()}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const uploadPDF = (req, res) => {
    try {

        console.log("File upload request received",req.file);
        // Assuming file is available in req.file (using multer or similar middleware)
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Process the uploaded PDF file (e.g., save to server, extract text, etc.)
        // For demonstration, we'll just return the file info
        res.status(200).json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const convertToPPT = (req,res) => {
  // write the logic to take the pdf file and convert it to ppt and send it to the downloadable. response
  res.send("Convert to PPT endpoint - logic to be implemented");
}




