import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Dropdown, { Option } from "react-dropdown";

import classes from "./style.module.scss";
import languageNames from "@/constants/languageNames";

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  const dropdownOptions: Option[] =
    otherLocales?.map((locale) => ({
      value: locale,
      label: languageNames.get(locale) || locale,
    })) ?? [];

  const handleLanguageChange = (selected: Option) => {
    const { pathname, query } = router;
    const locale = selected.value;

    router.push({ pathname, query }, undefined, { locale });
  };

  return (
    <Dropdown
      options={dropdownOptions}
      onChange={handleLanguageChange}
      value={activeLocale?.toUpperCase()}
      placeholder="Select Language"
      className={classes["dropdown-root"]}
      menuClassName={classes["dropdown-menu"]}
      controlClassName={classes["dropdown-control"]}
      arrowClassName={classes["dropdown-arrow"]}
      arrowOpen={
        <Image src="/up-chevron.png" alt="arrow up" width={20} height={20} />
      }
      arrowClosed={
        <Image
          src="/down-chevron.png"
          alt="arrow down"
          width={20}
          height={20}
        />
      }
    />
  );
};

export default LanguageSwitcher;
