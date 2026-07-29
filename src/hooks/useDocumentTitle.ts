"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useDocumentTitle() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("header.title");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language]);
}