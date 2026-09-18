import clsx from "clsx";
import AuthLogo from "../../../AuthLogo";
import "./onboarding.module.scss";

interface OnboardingHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  brandName?: string;
}

export const OnboardingHeader = ({
  title,
  subtitle,
  className,
  brandName = "EduConsult CRM",
}: OnboardingHeaderProps) => {
  return (
    <header className={clsx("onboarding-header", className)}>
      <div className="onboarding-header__logo">
        <AuthLogo />

        <div className="onboarding-header__brand">{brandName}</div>
      </div>

      <h1 className="onboarding-header__title">{title}</h1>

      {subtitle && <p className="onboarding-header__subtitle">{subtitle}</p>}
    </header>
  );
};
