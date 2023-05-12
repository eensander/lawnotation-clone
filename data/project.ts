
export type Project = {
  id: number,
  name: string,
  desc: string,
  editor_id: string | undefined
}

export const useProjectApi = () => {
  const supabase = useSupabaseClient();
  
  // Create
  const createProject = async (fields: Omit<Project, 'id'>): Promise<Project> => {
    const { data, error } = await supabase.from("projects").insert(fields).select().single();
    if (error)
      throw Error(`Error in createProject: ${error.message}`)
    else
      return data as Project;
  };

  // Read
  const findProject = async (id: string): Promise<Project>   => {
    const { data, error } = await supabase.from("projects").select().eq("id", id).single();

    if (error)
      throw Error(`Error in findProject: ${error.message}`)
    else
      return data as Project
  };

  // Read all
  const findProjects = async (editor_id: string): Promise<Project[]> => {
    const { data, error } = await supabase.from("projects").select().eq("editor_id", editor_id);
    
    if (error)
      throw Error(`Error in findProjects: ${error.message}`)
    else
      return data as Project[]
  };

  const tableProjects = async (editor_id: string, offset: number, limit: number) => {
    const { data, error, count } = await supabase
      .from("projects")
      .select('*', { count: 'exact' })
      .eq("editor_id", editor_id)
      .range(offset, offset + limit - 1);
    
    if (error)
      throw Error(`Error in tableProjects: ${error.message}`)
    else
      return {rows: data as Project[], count};
  }

  // Update
  const updateProject = async (id: string, fields: Partial<Project>): Promise<boolean> => {
    const { data, error } = await supabase.from("projects").update(fields).eq("id", id);
    
    if (error)
      throw Error(`Error in updateProject: ${error.message}`)
    else
      return true;
  };

  // Update
  const deleteProject = async (id: string) => {
    const { data, error } = await supabase.from("projects").delete().eq("id", id);

    if (error)
      throw Error(`Error in deleteProject: ${error.message}`)
    else
      return true;
  };

  return {createProject, findProject, findProjects, tableProjects, updateProject, deleteProject}
}