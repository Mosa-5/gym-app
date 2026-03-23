import { linkKeys, socialLinks } from "./footer.data";
import {
  borderClass,
  containerClass,
  flexContainerClass,
  flexItemClass,
  footerClass,
  headingClass,
  linkClass,
  navClass,
  socialContainerClass,
  socialLabelClass,
  socialLinkClass,
} from "./footer.styles";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={footerClass()}>
      <div className={containerClass()}>
        <div className={flexContainerClass()}>
          <div className={flexItemClass()}>
            <h1 className={headingClass()}>
              Gym<span className="text-brand">Gear</span>
            </h1>
          </div>

          <div className={flexItemClass()}>
            <nav className={navClass()}>
              {linkKeys.map((link, index) => (
                <a key={index} href={link.href} className={linkClass()}>
                  {t(link.titleKey)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className={borderClass()}>
          <div className={socialContainerClass()}>
            <span className={socialLabelClass()}>{t("footer.followUs")}</span>
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} className={socialLinkClass()}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
