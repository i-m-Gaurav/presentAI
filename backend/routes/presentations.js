import express from "express";

const Router = express.Router();

// Simple stub endpoint to accept generation requests
Router.post("/generate", async (req, res) => {
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
});

export default Router;
