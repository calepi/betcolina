import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { AnalysisResult } from "../types";

export const generateAnalysis = async (query: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Chave da API não encontrada.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });

  const rawText = response.text || "Não foi possível gerar uma resposta.";
  
  return parseResponse(rawText);
};

const parseResponse = (text: string): AnalysisResult => {
  // Normalize text to remove markdown from headers if present, ensuring clean splits
  // This handles cases where the model outputs **FATOS CONFIRMADOS:** instead of plain FATOS CONFIRMADOS:
  const cleanText = text
    .replace(/\*\*(FATOS CONFIRMADOS:|INFERÊNCIAS:|LIMITAÇÕES:|CONCLUSÃO:)\*\*/g, "$1")
    .replace(/## (FATOS CONFIRMADOS:|INFERÊNCIAS:|LIMITAÇÕES:|CONCLUSÃO:)/g, "$1");

  const sections = {
    facts: extractSection(cleanText, "FATOS CONFIRMADOS:"),
    inferences: extractSection(cleanText, "INFERÊNCIAS:"),
    limitations: extractSection(cleanText, "LIMITAÇÕES:"),
    conclusion: extractSection(cleanText, "CONCLUSÃO:"),
  };

  return {
    raw: text,
    sections
  };
};

const extractSection = (fullText: string, header: string): string => {
  const parts = fullText.split(header);
  if (parts.length < 2) return "";
  
  // Get content after header
  let content = parts[1];
  
  // Find the start of the next section to cut off
  const nextHeaders = ["FATOS CONFIRMADOS:", "INFERÊNCIAS:", "LIMITAÇÕES:", "CONCLUSÃO:"];
  let endIdx = content.length;
  
  nextHeaders.forEach(h => {
    if (h !== header) {
      const idx = content.indexOf(h);
      if (idx !== -1 && idx < endIdx) {
        endIdx = idx;
      }
    }
  });

  return content.substring(0, endIdx).trim();
};