export interface Document {
  id: number,
  name: string,
  project_id: string,
  source: string,
  full_text: string | undefined,
}