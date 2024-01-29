import { useMemo, useState } from "react";
import { settingsGroup } from "../settingsProvider";

const useClockSettingsCategory = () => {
  const [use24HourFormat, setUse24HourFormat] = useState<boolean>(false);

  const [showSeconds, setShowSeconds] = useState<boolean>(false);

  const changeTimeFormat = (format: boolean) => {
    setUse24HourFormat(format);
  };

  const changeShowSeconds = (show: boolean) => {
    setShowSeconds(show);
  };

  const category = useMemo<settingsGroup>(
    () => ({
      name: "clock",
      settings: [
        {
          type: "switch",
          name: "24-hour-format",
          value: use24HourFormat,
          callback: changeTimeFormat,
        },
        {
          type: "switch",
          name: "show-seconds",
          value: showSeconds,
          callback: changeShowSeconds,
        },
      ],
    }),
    [use24HourFormat, showSeconds]
  );

  return {
    category,
    hook: {
      showSeconds,
      use24HourFormat,
      changeShowSeconds,
      changeTimeFormat,
    },
  };
};

export default useClockSettingsCategory;
