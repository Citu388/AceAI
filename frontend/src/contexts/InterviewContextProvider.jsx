import { interviewContext } from "./interview.context";
import { useState } from "react";

export const InterviewContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <interviewContext.Provider
      value={{ loading, setLoading, report, setReport, reports, setReports }}
    >
      {children}
    </interviewContext.Provider>
  );
};
