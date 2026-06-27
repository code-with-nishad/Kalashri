// Admin Settings page — delegates to CMS Settings section
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminSettings() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/admin/cms", { replace: true }); }, [navigate]);
  return null;
}
