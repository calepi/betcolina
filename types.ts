export interface AnalysisResult {
  raw: string;
  sections: {
    facts: string;
    inferences: string;
    limitations: string;
    conclusion: string;
  };
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AnalysisRequest {
  query: string;
}