/**
 * @file index.js
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Express server that connects to the OpenAI backend.
 *              Defines the REST API route for GPT-powered career transition responses
 *              and user feedback collection.
 */

import express from'express';
import cors from "cors";
import { getResponse } from './openaiService.js';

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));

/**
 * Health-check route to verify the server is running.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @example
 * // GET http://localhost:8080/
 * // Response: "The server is up!"
 */
app.get('/', (req,res) => {
    res.send("The server is up!");
});

/**
 * Forwards user messages to GPT with no additional system context.
 * Extracts the message array from req.body.params and returns
 * the model's content string.
 *
 * @param {Object} req - Express request with body.params.messages.
 * @param {Object} res - Express response returning the GPT content string.
 *
 * @example
 * // POST http://localhost:8080/response
 * // Body: { params: { messages: [{ role: "user", content: "Hello" }] } }
 */
app.post('/response', async (req,res) => {
  const { messages } = req.body.params;
  console.log("MESSAGES", messages);
  const response = await getResponse(messages);
  res.send(response.choices[0].message.content);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
