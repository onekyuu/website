import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";

const Contact: FC = () => {
  const t = useTranslations("Home");
  return (
    <div>
      <ContentContainer>
        <div>{t("contactMe")}</div>
        <div className="grid">
          <div></div>
          <div></div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Contact;
