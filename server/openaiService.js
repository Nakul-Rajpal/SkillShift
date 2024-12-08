/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: ""
});

/**
 * Function for getting a response from the Llama model.
 * Uses the provided message history.
 * @param messages The message history to load in.
 * @returns Llama response object.
 */

const getResponse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


export { getResponse };