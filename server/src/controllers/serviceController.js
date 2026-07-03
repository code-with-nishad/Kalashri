const serviceService = require("../services/serviceService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const { Groq } = require("groq-sdk");
const { jsonrepair } = require("jsonrepair");

const createService = asyncHandler(async (req, res) => {
    const service = await serviceService.createService(req.body);
    sendResponse(res, 201, true, "Service created successfully", service);
});

const createBulkServices = asyncHandler(async (req, res) => {
    const { services } = req.body;
    const result = await serviceService.createBulkServices(services);
    
    if (result.errorCount > 0 && result.successCount === 0) {
        return sendResponse(res, 400, false, "Failed to create services", result);
    }
    
    sendResponse(res, 201, true, `Created ${result.successCount} services successfully`, result);
});

const updateService = asyncHandler(async (req, res) => {
    const service = await serviceService.updateService(req.params.id, req.body);
    sendResponse(res, 200, true, "Service updated successfully", service);
});

const deleteService = asyncHandler(async (req, res) => {
    const service = await serviceService.deleteService(req.params.id);
    sendResponse(res, 200, true, "Service deleted successfully", service);
});

const getAllServices = asyncHandler(async (req, res) => {
    const services = await serviceService.getAllServices(req.query);
    sendResponse(res, 200, true, "Services retrieved successfully", services);
});

const getSingleService = asyncHandler(async (req, res) => {
    const service = await serviceService.getSingleService(req.params.id);
    sendResponse(res, 200, true, "Service retrieved successfully", service);
});

const parseBulkServicesAI = asyncHandler(async (req, res) => {
    const { textPrompt } = req.body;
    
    if (!textPrompt) {
        return sendResponse(res, 400, false, "Please provide the text containing the services");
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        
        const prompt = `
You are a helpful assistant for a Salon and Fashion Studio.
Extract all services and their prices from the following text and format them as a JSON array.
The JSON array should contain objects with the following keys:
- name (string): The name of the service
- category (string): Strictly one of ["Beauty", "Fashion", "Stitching"]
- price (number): The price of the service (only the numeric value)
- duration (number): The estimated duration in minutes (default to 60 if not specified)
- description (string): A short generated description for the service

Only return the raw JSON array, without any markdown formatting or backticks.

Text:
${textPrompt}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: process.env.GROQ_STREAM_MODEL || "llama-3.1-70b-versatile",
            temperature: 0.1,
        });

        let aiResponse = chatCompletion.choices[0].message.content.trim();
        
        // Remove markdown formatting if present
        if (aiResponse.startsWith("\`\`\`json")) {
            aiResponse = aiResponse.replace(/^\`\`\`json\n?/, "").replace(/\n?\`\`\`$/, "");
        } else if (aiResponse.startsWith("\`\`\`")) {
            aiResponse = aiResponse.replace(/^\`\`\`\n?/, "").replace(/\n?\`\`\`$/, "");
        }

        const repairedJson = jsonrepair(aiResponse);
        const parsedServices = JSON.parse(repairedJson);

        if (!Array.isArray(parsedServices)) {
            return sendResponse(res, 400, false, "AI did not return a valid list of services");
        }

        sendResponse(res, 200, true, "Services parsed successfully", parsedServices);
    } catch (error) {
        console.error("AI Parsing Error:", error);
        sendResponse(res, 500, false, "Failed to parse services using AI");
    }
});

module.exports = {
    createService,
    createBulkServices,
    updateService,
    deleteService,
    getAllServices,
    getSingleService,
    parseBulkServicesAI
};
