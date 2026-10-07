import { useNavigate } from "react-router-dom";
import AcademicEncyclopedia from "@/components/ui/academic-encyclopedia";
import { ACADEMIC_BRANCHES } from "../data/academicBranches";

/** Standalone page for the scroll-driven encyclopedia section. */
export default function Encyclopedia() {
  const navigate = useNavigate();
  return <AcademicEncyclopedia branches={ACADEMIC_BRANCHES} onNavigate={navigate} />;
}
