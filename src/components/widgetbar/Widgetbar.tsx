import Image from "next/image";

import styles from "./style.module.scss";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";

const Widgetbar = () => {
  return (
    <WidgetWrapper className={styles["widget"]}>
      <div className={styles["widget__menu"]}>
        <Image
          src="/burger-menu.svg"
          width={18}
          height={12}
          alt="Burger menu"
        />
      </div>
      <div className={styles["widget__block_main"]}>
        <div className={styles["widget__gallery"]}>
          <Image
            src="/gallery.svg"
            width={24}
            height={24}
            alt="Backgrounds gallery"
          />
        </div>
        <div className={styles["widget__music"]}>
          <Image src="/play.svg" width={13.22} height={16} alt="Play" />
        </div>
        <div className={styles["widget__breath"]}>
          <Image src="/breath.svg" width={24} height={24} alt="Breath" />
        </div>
        <div className={styles["widget__quotes"]}>
          <Image src="/quotes.svg" width={24} height={24} alt="Quotes" />
        </div>
        <div className={styles["widget__meditation"]}>
          <Image
            src="/meditation-app.svg"
            width={24}
            height={24}
            alt="Meditation"
          />
        </div>
        <div className={styles["widget__news"]}>
          <Image src="/news.svg" width={18} height={18} alt="News" />
        </div>
      </div>
      <div className={styles["widget__block_additional"]}>
        <div className={styles["widget__gif"]}>
          <Image
            src="/gif-widget.svg"
            width={19.2}
            height={24}
            alt="Gif widget"
          />
        </div>
        <div className={styles["widget__settings"]}>
          <Image src="/settings.svg" width={19.49} height={20} alt="Settings" />
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default Widgetbar;
