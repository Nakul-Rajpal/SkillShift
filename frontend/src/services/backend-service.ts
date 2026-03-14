/**
 * @file backend-service.ts
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Defines the HttpService class and factory functions for creating
 *              service instances that communicate with the Express backend.
 */

import { ServiceCategory } from "../types";
import apiClient from "./api-client";

/**
 * Reusable HTTP service class.
 * Wraps Axios calls with AbortController support for cancellation.
 */
class HttpService {
    endpoint: string;

    /**
     * Creates an HttpService bound to the given endpoint.
     * The base URL is defined in the api-client module.
     *
     * @param {string} endpoint - The target API route (e.g., "/response").
     *
     * @example
     * const svc = new HttpService("/response");
     */
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Performs a GET request, appending `info` to the endpoint path.
     *
     * @param {string} info - The path segment appended after the endpoint.
     * @returns {{ request: Promise, cancel: Function }} The Axios promise and an abort function.
     *
     * @example
     * const { request, cancel } = service.get("some-id");
     * request.then(res => console.log(res.data));
     */
    get(info: string) {
        const controller = new AbortController();
        const request = apiClient.get(this.endpoint + "/" + info, { signal: controller.signal });
        return { request, cancel: () => controller.abort() };
    }

    /**
     * Performs a POST request with a structured message history array.
     * Used for sending conversation context to the GPT backend.
     *
     * @param {Array<{role: string, content: string}>} messages - The conversation message history.
     * @returns {{ request: Promise, cancel: Function }} The Axios promise and an abort function.
     *
     * @example
     * const { request } = service.postMessages([{ role: "user", content: "Hello" }]);
     */
    postMessages(messages: { role: string; content: string; }[]) {
        const controller = new AbortController();
        const request = apiClient.post(this.endpoint, { params: { messages: messages }, signal: controller.signal });
        return { request, cancel: () => controller.abort() };
    }
}

/**
 * Creates an HttpService for unmodified chat interactions.
 *
 * @returns {HttpService} Service pointing to the "/response" route.
 *
 * @example
 * const svc = createResponseService();
 */
const createResponseService = () => {
    return new HttpService("/response");
}

/**
 * Generic factory that creates an HttpService for any valid service category.
 *
 * @param {ServiceCategory} type - The service category used to build the route.
 * @returns {HttpService} Service pointing to the "/<type>" route.
 *
 * @example
 * const svc = createService("response");
 */
const createService = (type: ServiceCategory) => {
    return new HttpService("/" + type);
}

export { createResponseService, createService };
