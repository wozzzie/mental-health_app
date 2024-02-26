import { createPortal } from "react-dom";
import styles from "./style.module.scss";
import { FC } from "react";
import { Transition } from "react-transition-group";

type Props = {
  descriptionText: string;
  active: boolean;
  onClick: () => void;
};

const AlertModal: FC<Props> = ({ descriptionText, active, onClick }) => {
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
              <button className={styles["confirm__confirm"]} onClick={onClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>,
    document.body
  );
};

export default AlertModal;
