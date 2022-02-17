import supabase from "../../lib/supabase";

const handler = (req, res) => {
  try {
    supabase.auth.api.setAuthCookie(req, res);
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
