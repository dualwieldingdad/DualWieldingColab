const sendGrid = require('@sendgrid/mail');

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, message } = JSON.parse(event.body);

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'dualwieldingdad@gmail.com',
        from: email,
        subject: `New contact form submission from ${name}`,
        text: message,
    };

    try {
        await sendGrid.send(msg);
        return { statusCode: 200, body: "Message sent!" };
    } catch (error) {
        return { statusCode: 500, body: "Error sending email" };
    }
};