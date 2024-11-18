/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: "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"
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