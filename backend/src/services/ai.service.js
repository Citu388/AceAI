const { ChatGroq } = require("@langchain/groq");
const dotenv = require("dotenv");
dotenv.config();

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  maxTokens: 8000,
  modelKwargs: {
    response_format: { type: "json_object" },
  },
});

function parseJsonResponse(response) {
  const raw =
    typeof response.content === "string"
      ? response.content
      : response.content.map((c) => c.text ?? "").join("");

  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to parse model response as JSON: ${err.message}`);
  }
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const context = `Resume: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}`;

  const questionsPrompt = `You are an experienced technical interviewer and career coach.

${context}

Instructions:
- Calculate a matchScore (0-100) based on how well the candidate's resume and
  self description align with the job description's requirements.
- Generate a short "title" summarizing the role/fit.
- Generate 10-15 technical questions relevant to the specific skills and
  technologies mentioned in the job description, tailored to the candidate's
  apparent experience level.
- Generate 8-12 behavioral questions relevant to the role and seniority level.
- If resume is not provided, rely more heavily on the self description to
  assess the candidate's background.

Respond with ONLY a valid JSON object, no markdown formatting, no code
fences, no commentary before or after — just the raw JSON — matching this
exact shape:
{
  "matchScore": number,
  "title": string,
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ]
}`;

  const planPrompt = `You are an experienced technical interviewer and career coach.

${context}

Instructions:
- First, extract the list of skills/technologies the candidate already
  demonstrates, based on the Resume and Self Description above.
- Then extract the list of skills/technologies required or preferred by the
  Job Description.
- A "skill gap" is ONLY a skill that appears in the job requirements but is
  NOT present anywhere in the candidate's resume or self description —
  check carefully before including something. Do not list a skill as a gap
  if it is mentioned anywhere in the Resume or Self Description, even if
  the candidate's experience with it seems limited. If the candidate covers
  all required skills, return an empty skillGaps array — this is expected
  and correct for a strong match.
- ALWAYS create a day-wise preparation plan (5-7 days), regardless of how
  many or how few skill gaps exist. If skill gaps exist, prioritize closing
  them first. If there are no skill gaps, focus the plan on: deepening
  expertise in the role's core technologies, practicing likely technical
  and behavioral interview questions, reviewing system design relevant to
  the role, researching the company, and mock interview practice. A
  preparationPlan must NEVER be empty.
- If resume is not provided, rely more heavily on the self description to
  assess the candidate's background.

Respond with ONLY a valid JSON object, no markdown formatting, no code
fences, no commentary before or after — just the raw JSON — matching this
exact shape:
{
  "skillGaps": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": string, "tasks": string[] }
  ]
}`;
  const [questionsRes, planRes] = await Promise.all([
    llm.invoke(questionsPrompt),
    llm.invoke(planPrompt),
  ]);

  const questions = parseJsonResponse(questionsRes);
  const plan = parseJsonResponse(planRes);

  return { ...questions, ...plan };
}

async function generateTailoredResume({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `You are an expert resume writer. Rewrite and condense the
candidate's resume into a single, tightly-written ONE-PAGE resume tailored
to the job description below. Be aggressive about cutting content — a
real one-page resume has room for roughly 3-4 bullet points per job and a
2-line summary. Do not pad or invent achievements; condense and prioritize
what's most relevant to the job description.

Original Resume: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}

Respond with ONLY a valid JSON object, no markdown, no commentary, matching
this exact shape:
{
  "name": string,
  "contactLine": string,
  "summary": string,
  "skills": string[],
  "experience": [
    { "title": string, "company": string, "dates": string, "bullets": string[] }
  ],
  "projects": [
    { "name": string, "bullets": string[] }
  ],
  "education": [
    { "degree": string, "institution": string, "dates": string }
  ]
}
Rules:
- "skills" max 12 items.
- Each "experience" entry: max 4 bullets, each bullet under 20 words.
- Each "projects" entry: max 3 bullets.
- "summary" max 2 sentences.
- Omit "projects" entirely (empty array) if nothing relevant is available.`;

  const response = await llm.invoke(prompt);
  return parseJsonResponse(response);
}

module.exports = { generateInterviewReport, generateTailoredResume };
