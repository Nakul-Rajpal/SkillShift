import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  createResponseService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

const schema = z.object({
  subject: z.string(),
  modifier: z.string(),
  additional: z.string(),
  ignore: z.string(),
});
type FormData = z.infer<typeof schema>;

// Format string for GPT model
const formatString = (
  subject: string,
  modifier: string,
  additional: string,
  ignore: string
) => {
  return (
    "Tell me about: [" +
    subject +
    "], answer me with the following tones in mind: [" +
    modifier +
    "]" + " please ignore these topics: [" + ignore + "]" +
    ", also please keep this in mind : [" +
    additional +
    "]."
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
    console.log(data);

    // Redirect to a new page immediately after form submission
    window.location.href = "/results.html"; // Replace with your new page URL if you want redirection

    setIsLoading(true); // Triggers loading animation

    // Creates post request for backend GPT model (this will run after redirection)
    const { request, cancel } = createResponseService().postMessages([
      {
        role: "user",
        content: formatString(data.subject, data.modifier, data.additional, data.ignore),
      },
    ]);

    // Request is sent
    request
      .then((res) => {
        // Successful request logic
        setQueryResponse(res.data); // We update the most recent query response
        console.log(res.data);
        setIsLoading(false); // Stop loading animation

      })
      .catch((err) => {
        // Error handling logic
        setError(err.message); // Display error message
        setIsLoading(false); // Stop loading animation
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        
        {/* Adding back all the questions */}
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Please enter your name, gender, and age.
          </label>
          <input {...register("subject")} id="subject" type="text" className="form-control" />

          <label htmlFor="modifier" className="form-label">
            What is your current job title or role?
          </label>
          <input {...register("modifier")} id="modifier" type="text" className="form-control" />

          <label htmlFor="additional1" className="form-label">
            What skills do you currently have?
          </label>
          <input {...register("modifier")} id="additional1" type="text" className="form-control" />

          <label htmlFor="ignore1" className="form-label">
            What industries are you interested in transitioning into?
          </label>
          <input {...register("modifier")} id="ignore1" type="text" className="form-control" />

          <label htmlFor="additional2" className="form-label">
            What challenges are you facing in your career transition?
          </label>
          <input {...register("modifier")} id="additional2" type="text" className="form-control" />

          <label htmlFor="additional3" className="form-label">
            What additional skills or knowledge do you think you need?
          </label>
          <input {...register("modifier")} id="additional3" type="text" className="form-control" />

          <label htmlFor="additional4" className="form-label">
            Are there any specific job roles you're aiming for?
          </label>
          <input {...register("modifier")} id="additional4" type="text" className="form-control" />

          <label htmlFor="additional5" className="form-label">
            How soon are you planning to make this career transition?
          </label>
          <input {...register("modifier")} id="additional5" type="text" className="form-control" />

          <label htmlFor="additional6" className="form-label">
            Do you have any preferences regarding remote or in-office work?
          </label>
          <input {...register("modifier")} id="additional6" type="text" className="form-control" />

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