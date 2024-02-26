"use client";
import { FC, useState } from "react";

import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import { createPortal } from "react-dom";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import { useAuth } from "../auth/authProvider";
import { useRouter } from "next/router";
import ROUTES from "@/constants/routes";

const DeleteAccountSetting: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const { user } = useAuth();
  const router = useRouter();

  const handleConfirmModal = async () => {
    await user?.delete();
    localStorage.clear();
    router.push(ROUTES.WELCOME);
  };

  const handleAbortModal = () => {
    setModalOpen(false);
  };

  const handleTextClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles["delete-account"]} onClick={handleTextClick}>
        {t("delete-account.setting")}
      </div>
      <ConfirmModal
        descriptionText={t("delete-account.modal")}
        abortText={t("delete-account.modal-abort")}
        confirmText={t("delete-account.modal-confirm")}
        onAbort={handleAbortModal}
        onConfirm={handleConfirmModal}
        active={modalOpen}
      />
    </>
  );
};

export default DeleteAccountSetting;
