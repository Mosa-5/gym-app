import {
  Shield,
  Wrench,
  Target,
  Trophy,
  ArrowRight,
  Heart,
} from "lucide-react";

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

export const metricsData = [
  { value: "10K+", labelKey: "about.athletesEquipped" },
  { value: "50+", labelKey: "about.productsTested" },
  { value: "4.9★", labelKey: "about.averageRating" },
];

export const guaranteePoints = [
  {
    icon: <Shield className="w-5 h-5" />,
    titleKey: "about.thirtyDayGuarantee",
    descKey: "about.thirtyDayGuaranteeDesc",
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    titleKey: "about.freeShipping",
    descKey: "about.freeShippingDesc",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    titleKey: "about.builtByLiftersGuarantee",
    descKey: "about.builtByLiftersGuaranteeDesc",
  },
];
