import supabase from "../lib/supabase";

export const SignIn = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const SignUp = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const InsertUserDetails = (first_name, last_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        first_name,
        last_name,
        user_id: supabase.auth.user().id,
        email: supabase.auth.user().email,
      };
      const { error } = await supabase.from("User_Details").insert(payload);
      if (error) throw error;

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const GetUserDetails = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from("User_Details").select("*");
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const UpdateUserDetails = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from("User_Details").update(payload).match({ user_id: payload.user_id });
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
