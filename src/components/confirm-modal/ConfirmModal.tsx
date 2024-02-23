import { FC } from "react";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";

type Props = {
  descriptionText: string;
  abortText: string;
  confirmText: string;
  onAbort: () => void;
  onConfirm: () => void;
  active: boolean;
};

const ConfirmModal: FC<Props> = ({
  descriptionText,
  abortText,
  confirmText,
  onAbort,
  onConfirm,
  active,
}) => {
  const timeout = 300;

  return createPortal(
    <Transition timeout={timeout} mountOnEnter unmountOnExit in={active}>
      {(s) => (
        <div
          className={styles["confirm__wrapper"]}
          style={{
            transition: `${timeout}ms all`,
            opacity: s === "entered" || s === "entering" ? 1 : 0,
          }}
        >
          <div className={styles["confirm"]}>
            <div className={styles["confirm__description"]}>
              {descriptionText}
            </div>
            <div className={styles["confirm__btns"]}>
              <button className={styles["confirm__abort"]} onClick={onAbort}>
                {abortText}
              </button>
              <button
                className={styles["confirm__confirm"]}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>,
    document.body
  );
};

export default ConfirmModal;
