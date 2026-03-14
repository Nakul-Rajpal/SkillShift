/**
 * @file openaiService.js
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Establishes the OpenAI client connection and exposes a wrapper
 *              function for requesting chat completions from the GPT model.
 */

import OpenAI from 'openai';

/** OpenAI client instance configured with the project API key. */
const openai = new OpenAI({
    apiKey: ""
});

/**
 * Sends a message history to the GPT-4o-mini model and returns the completion.
 *
 * @param {Array<{role: string, content: string}>} messages - The conversation history to send.
 * @returns {Promise<Object>} The full OpenAI chat completion response object.
 *
 * @example
 * const response = await getResponse([{ role: "user", content: "Hello!" }]);
 * console.log(response.choices[0].message.content);
 */
const getResponse = async (messages) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
});

export { getResponse };
