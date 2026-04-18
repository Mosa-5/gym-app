import { Shield, Wrench, Target, Trophy } from "lucide-react";

export const standardsPillars = [
  {
    icon: <Shield className="w-6 h-6" />,
    titleKey: "about.competitionGrade",
    descriptionKey: "about.competitionGradeDesc",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    titleKey: "about.stressTested",
    descriptionKey: "about.stressTestedDesc",
  },
  {
    icon: <Target className="w-6 h-6" />,
    titleKey: "about.purposeBuilt",
    descriptionKey: "about.purposeBuiltDesc",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    titleKey: "about.athleteApproved",
    descriptionKey: "about.athleteApprovedDesc",
  },
];
