import supabase from "../lib/supabase";

export const CreateNote = (content) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payload = {
        content,
        user_id: supabase.auth.user().id,
      };

      const { data, error } = await supabase.from("Notes").insert(payload);
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const GetNotes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from("Notes").select("*").eq("user_id", supabase.auth.user().id);
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const UpdateNote = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.from("Notes").update(payload).match({ id: payload.id });
      if (error) throw error;

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const DeleteNote = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.from("Notes").delete().match({ id: payload.id });
      if (error) throw error;

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};
