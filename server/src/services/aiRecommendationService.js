const generateRebookingMessage = async (customerName, pastServiceName, dayOfWeek, timeStr) => {
    try {
        const systemPrompt = `You are the Gayatri Beauty Studio AI Consultant, a luxurious beauty assistant. 
You address customers warmly with names like "Queen", "Gorgeous", or their actual name if provided.
Your task is to write a short, highly engaging, personalized push notification reminding a customer to re-book.

Customer Name: ${customerName}
Last Service: ${pastServiceName} (28 days ago)
Their Favourite Slot: ${dayOfWeek}s at ${timeStr}

CRITICAL RULES:
1. Keep the message under 150 characters.
2. It MUST be a single string without quotes. 
3. Recommend they book the same service or a related one to keep their "glow" up.
4. Mention their favourite time slot implicitly or explicitly (e.g., "Your favourite Saturday slot is open!").`;

        const groqMessages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Write the notification text." }
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: process.env.GROQ_STREAM_MODEL || "llama-3.1-8b-instant",
                messages: groqMessages,
                temperature: 0.7,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Groq API error: ${response.statusText} - ${errBody}`);
        }

        const data = await response.json();
        let reply = data.choices[0].message.content.trim();
        
        // Remove surrounding quotes if the AI added them
        if (reply.startsWith('"') && reply.endsWith('"')) {
            reply = reply.slice(1, -1);
        }

        return reply;
    } catch (err) {
        console.error("Error generating AI rebooking message:", err);
        // Fallback message
        return `Time for your monthly glow, ${customerName}? Your favourite slot on ${dayOfWeek} at ${timeStr} is open. Book now!`;
    }
};

module.exports = {
    generateRebookingMessage
};
