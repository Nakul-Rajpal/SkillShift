/**
 * @file api-client.ts
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Configures and exports a pre-configured Axios instance pointing
 *              to the local backend server. All HTTP services build on this client.
 */

import axios from 'axios';

/** Pre-configured Axios instance with the backend base URL. */
export default axios.create({
    baseURL: "http://127.0.0.1:8080/"
});
