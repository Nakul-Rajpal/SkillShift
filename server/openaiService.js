/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: "<ENTER API KEY HERE>"
});

/**
 * Function for getting a response from the Llama model.
 * Uses the provided message history.
 * @param messages The message history to load in.
 * @returns Llama response object.
 */

const getLlamaResponse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
});


export { getLlamaResponse };