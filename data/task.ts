export type Task = {
  id: number;
  name: string;
  desc: string;
  project_id: number;
  labelset_id: number;
  ann_guidelines: string;
};

export const useTaskApi = () => {
  const supabase = useSupabaseClient();

  // Create
  const createTask = async (fields: Omit<Task, "id">): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .insert(fields)
      .select()
      .single();
    if (error) throw Error(`Error in createTask: ${error.message}`);
    else return data as Task;
  };

  // Read
  const findTask = async (id: string): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("id", id)
      .single();

    if (error) throw Error(`Error in findTask: ${error.message}`);
    else return data as Task;
  };

  // Read all
  const findTasks = async (project_id: string): Promise<Task[]> => {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("project_id", project_id);

    if (error) throw Error(`Error in findTask: ${error.message}`);
    else return data as Task[];
  };

  // Read all
  const getCountByUser = async (editor_id: string): Promise<never> => {
    const { data, error } = await supabase
      .rpc("get_count_tasks", { e_id: editor_id })
      .single();

    if (error) throw Error(`Error in getCountByUser: ${error.message}`);
    else return data;
  };

  const getAllAnnotatorTasks = async (
    annotator_id: string
  ): Promise<Task[]> => {
    const { data, error } = await supabase.rpc("get_all_annotator_tasks", {
      a_id: annotator_id,
    });
    if (error) throw Error(`Error in getAllAnnotatorTasks: ${error.message}`);
    else return data as Task[];
  };

  // Update
  const updateTask = async (
    id: string,
    fields: Partial<Task>
  ): Promise<boolean> => {
    const { data, error } = await supabase
      .from("tasks")
      .update(fields)
      .eq("id", id);

    if (error) throw Error(`Error in updateTask: ${error.message}`);
    else return true;
  };

  // Delete
  const deleteTask = async (id: string) => {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw Error(`Error in deleteTask: ${error.message}`);
    else return true;
  };

  const deleteAllTasks = async (project_id: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("project_id", project_id);

    if (error) throw Error(`Error in deleteAllTasks: ${error.message}`);
    else return true;
  };

  return {
    createTask,
    findTask,
    findTasks,
    getCountByUser,
    getAllAnnotatorTasks,
    updateTask,
    deleteTask,
    deleteAllTasks,
  };
};
