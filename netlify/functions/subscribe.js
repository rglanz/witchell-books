exports.handler = async (event, context) => {
  // Ensure this is a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse the incoming form data from the client
  const { firstName, lastName, email } = JSON.parse(event.body);

  // Validate inputs
  if (!firstName || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const apiKey = process.env.KIT_API_KEY; // Access the environment variable
  const apiUrl = "https://api.kit.com/v4/subscribers";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName || "", // Handle cases where lastName is optional
        email_address: email,
        website: "witchellbooks.com",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Subscription successful" }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: data.message || "Subscription failed",
        }),
      };
    }
  } catch (error) {
    console.error("Error in Netlify Function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
