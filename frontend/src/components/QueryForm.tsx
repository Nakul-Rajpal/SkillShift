import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  createResponseService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

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

// Format string for GPT model
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
 * Creates a query box, interacting with a GPT backend service.
 * Created using a React Hook Form, with fields as defined in the above schema.
 * @returns a QueryBox component
 */
const QueryForm = () => {
  // These variables are used for interacting with the form's state
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false); // Whether to show loading animation or not
  const [error, setError] = useState(""); // The error message (if any)
  const [queryResponse, setQueryResponse] = useState(""); // The most recent query response

  // Handles the on-submit logic for the form
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

        {/* Submit Button */}
        <button className="btn btn-primary mb-3">Submit</button>

        {/* Loading Spinner */}
        {isLoading && <div className="spinner-border"></div>}
      </form>

      {/* Display query response */}
      <ExpandableText>{queryResponse}</ExpandableText>
    </div>
  );
};

export default QueryForm;