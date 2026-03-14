/**
 * @file QueryForm.tsx
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description The main career transition query form. Collects user profile data
 *              (skills, job role, industry interests, etc.), builds a structured
 *              prompt, and sends it to the GPT backend. Results are stored in
 *              localStorage and displayed on the results page.
 */

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  createResponseService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

/** Zod schema defining all form fields for the career transition questionnaire. */
const schema = z.object({
  info: z.string(),
  job: z.string(),
  skills: z.string(),
  industries: z.string(),
  challenges: z.string(),
  additional: z.string(),
  specific: z.string(),
  time: z.string(),
  pref: z.string(),
});

type FormData = z.infer<typeof schema>;

/**
 * Builds the full GPT prompt by interpolating user responses into a
 * structured instruction template. The prompt asks the model to return
 * four sections (futureIndustries, jobMarketStats, skillsNeeded, onlineCourses)
 * separated by "---" delimiters.
 *
 * @param {string} info - User's name, gender, and age.
 * @param {string} job - Current job title or role.
 * @param {string} skills - Current skill set.
 * @param {string} industries - Target industries for transition.
 * @param {string} challenges - Career transition challenges.
 * @param {string} additional - Additional skills the user thinks they need.
 * @param {string} specific - Specific job roles the user is aiming for.
 * @param {string} time - Timeline for career transition.
 * @param {string} pref - Remote vs. in-office preference.
 * @returns {string} The fully constructed GPT prompt string.
 *
 * @example
 * const prompt = formatString("John, Male, 30", "Driver", "Navigation", "Tech", "", "", "", "6 months", "Remote");
 */
const formatString = (
  info: string,
  job: string,
  skills: string,
  industries: string,
  challenges: string,
  additional: string,
  specific: string,
  time: string,
  pref: string
) => {
  return (
    `You are a system that is designed to help gig workers transition to a new job.

    SOME ESSENTIAL INFORMATION: if users type NA or nothing, then there is no response for that category. You will not mention that there is no response, just do not use the information.

    FOR ALL OF THESE RESPONSES MAKE THE RESPONSES VERY IN DEPTH. FOR THE ONLINE COURSES PROVIDE AT LEAST 5 LINKS. DO NOT PROVIDE ANY TITLES OR INTRODUCTION TO THE SECTIONS JUST PRINT THE FOUR DESCRIPTIONS

    This is the information of the users: [${info}].
    This is the current job title/role that this user holds: [${job}].
    This is their current skills: [${skills}]
    This is the industries that they are interested in transitioning into (THIS SHOULD NOT HOLD RESPONSES DOWN: if users cannot translate their current skills into this industry, let them know and suggest other industries): [${industries}].
    These are the current challenges they are experiencing: [${challenges}].
    These are additional skills/knowledge the user might think they need: [${additional}].
    These are specific job roles that the user is looking to go into: [${specific}].
    This is how soon the user wants to transition: [${time}].
    These are the user preferences regarding remote/in-office work. [${pref}].

    Provide the following response separated by '---'

    futureIndustries: List potential industries that align with the user's skills and interests,
    including both current capabilities and aspirations.
    Suggest industries that are growing and have a demand for the skills the user possesses or is interested in acquiring.

    jobMarketStats: Provide detailed statistics about both the current job market the user is in and the market they are considering transitioning into.
    Include data on employment rates, growth projections, and demand for specific roles within these markets.

    skillsNeeded: Enumerate essential skills required for transitioning into the future industries identified.
    Categorize these skills into technical, soft, and industry-specific skills, explaining their importance and application to target roles or industries.

    onlineCourses: Recommend at least five online courses from reputable platforms that can help the user acquire necessary skills for their career transition.
    Include links to each course and describe what each course offers, including any certifications or credentials awarded upon completion.
    `
  );
};


/**
 * Renders the career transition questionnaire form.
 * On submission, sends the constructed prompt to the GPT backend,
 * splits the response into four sections by "---", stores each in
 * localStorage, and opens the results page in a new tab.
 *
 * @returns {JSX.Element} The QueryForm component.
 *
 * @example
 * <QueryForm />
 */
const QueryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [queryResponse, setQueryResponse] = useState("");

  /**
   * Handles form submission. Constructs the GPT prompt from form data,
   * posts it to the backend, and routes the sectioned response to localStorage.
   *
   * @param {FieldValues} data - The form field values collected by react-hook-form.
   */
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    const { request } = createResponseService().postMessages([
      {
        role: "user",
        content: formatString(data.info, data.job, data.skills, data.industries, data.challenges, data.additional, data.specific, data.time, data.pref),
      },
    ]);

    request
      .then((res) => {
        // Split the GPT response by "---" delimiter into four result sections
        const sections = res.data.split('---');
        localStorage.setItem('futureIndustries', sections[0]);
        localStorage.setItem('jobMarketStats', sections[1]);
        localStorage.setItem('skillsNeeded', sections[2]);
        localStorage.setItem('onlineCourses', sections[3]);
        window.open('/results.html', '_blank');
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Please enter your name, gender, and age.
          </label>
          <input {...register("info")} id="subject" type="text" className="form-control" />

          <label htmlFor="modifier" className="form-label">
            What is your current job title or role?
          </label>
          <input {...register("job")} id="modifier" type="text" className="form-control" />

          <label htmlFor="additional1" className="form-label">
            What skills do you currently have?
          </label>
          <input {...register("skills")} id="additional1" type="text" className="form-control" />

          <label htmlFor="ignore1" className="form-label">
            What industries are you interested in transitioning into?
          </label>
          <input {...register("industries")} id="ignore1" type="text" className="form-control" />

          <label htmlFor="additional2" className="form-label">
            What challenges are you facing in your career transition?
          </label>
          <input {...register("challenges")} id="additional2" type="text" className="form-control" />

          <label htmlFor="additional3" className="form-label">
            What additional skills or knowledge do you think you need?
          </label>
          <input {...register("additional")} id="additional3" type="text" className="form-control" />

          <label htmlFor="additional4" className="form-label">
            Are there any specific job roles you're aiming for?
          </label>
          <input {...register("specific")} id="additional4" type="text" className="form-control" />

          <label htmlFor="additional5" className="form-label">
            How soon are you planning to make this career transition?
          </label>
          <input {...register("time")} id="additional5" type="text" className="form-control" />

          <label htmlFor="additional6" className="form-label">
            Do you have any preferences regarding remote or in-office work?
          </label>
          <input {...register("pref")} id="additional6" type="text" className="form-control" />

        </div>

        <button className="btn btn-primary mb-3">Submit</button>

        {isLoading && <div className="spinner-border"></div>}
      </form>

      <ExpandableText>{queryResponse}</ExpandableText>
    </div>
  );
};

export default QueryForm;
