const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .description(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on factors like skills, experience, and qualifications",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .description(
            "A technical interview question that can be asked in the interview relevant to the job description and candidate's resume/skills",
          ),
        intention: z
          .string()
          .description(
            "The underlying reason or concept the interviewer is testing with this question, e.g. what skill, knowledge area, or depth of understanding it evaluates",
          ),
        answer: z.string.description(
          "How to answer this question, what points to cover, what approach to take etc.",
        ),
      }),
    )
    .description(
      "A list of technical interview questions relevant to the job description and candidate's resume/skills, along with their intentions and answers",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .description(
            "A behavioral interview question that can be asked in the interview relevant to the job description and candidate's resume/skills",
          ),
        intention: z
          .string()
          .description(
            "The underlying reason or concept the interviewer is testing with this question, e.g. what skill, knowledge area, or depth of understanding it evaluates",
          ),
        answer: z.string.description(
          "How to answer this question, what points to cover, what approach to take etc.",
        ),
      }),
    )
    .description(
      "A list of behavioral interview questions relevant to the job description and candidate's resume/skills, along with their intentions and answers",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .description(
            "The skill which the candidate is lacking or needs to improve",
          ),
        severity: z
          .enum(["low", "medium", "high"])
          .description(
            "How critical this skill gap is for the target role — low means minor/nice-to-have, high means essential and likely to hurt the candidate's chances if not addressed",
          ),
      }),
    )
    .description(
      "A list of skill gaps identified by comparing the candidate's resume against the job description, each rated by severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .description(
            "Sequential day number in the preparation plan, starting from 1",
          ),
        focus: z
          .string()
          .description(
            "The primary topic or theme to concentrate on for this day, e.g. data structures & algorithms, system design fundamentals, behavioral question practice, mock interviews",
          ),
        tasks: z
          .array(z.string())
          .description(
            "Concrete, actionable tasks for the candidate to complete on this day, e.g. 'Solve 5 array-based LeetCode problems', 'Read chapter 3 of Designing Data-Intensive Applications', 'Do a mock behavioral interview and record answers'.",
          ),
      }),
    )
    .description(
      "A structured, day-by-day study plan generated based on the candidate's skill gaps and match score, sequenced to build toward interview readiness",
    ),
  title: z
    .string()
    .description(
      "The job title or role for which this interview report and preparation plan were generated, e.g. 'Backend Developer', 'Senior Frontend Engineer'",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {}
