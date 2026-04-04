import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const { data: isAdmin } = await supabase
        .rpc("has_role", { _user_id: user.id, _role: "admin" });

      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    check();
  }, [navigate]);

  return { isAdmin, loading };
};
