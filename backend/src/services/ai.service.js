const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportResponseSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.NUMBER },
    title: { type: Type.STRING },
    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["low", "medium", "high"] },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          focus: { type: Type.STRING },
          tasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: [
    "matchScore",
    "title",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an experienced technical interviewer and career coach.
Based on the following candidate details, generate a comprehensive interview
preparation report.

Resume: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}

Instructions:
-Calculate a matchScore (0-100) based on how well the candidate's resume and
  self description align with the job description's requirements.
-Generate 10-15 technical questions relevant to the specific skills and
  technologies mentioned in the job description, tailored to the candidate's
  apparent experience level.
-Generate 8-12 behavioral questions relevant to the role and seniority level.
-Identify skill gaps by comparing the candidate's background against the job
  requirements, and rate each gap's severity.
-Create a day-wise preparation plan (5-7 days) prioritizing the most
  critical skill gaps first.
-If resume is not provided, rely more heavily on the self description to
  assess the candidate's background.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportResponseSchema,
    },
  });

  return JSON.parse(response.text);
}

module.exports = { generateInterviewReport };
