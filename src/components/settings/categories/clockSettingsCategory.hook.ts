import { useEffect, useMemo, useState } from "react";
import { settingsGroup } from "../settingsProvider";
import { useGetSettingsQuery, useSetSettingsMutation } from "@/apis/clock.api";
import { useAuth } from "@/components/auth/authProvider";

const useClockSettingsCategory = () => {
  const [use24HourFormat, setUse24HourFormat] = useState<boolean>(false);

  const [showSeconds, setShowSeconds] = useState<boolean>(false);

  const uid = useAuth()?.user?.uid;

  const { data, isSuccess } = useGetSettingsQuery(uid || "");

  const [updateSettings, res] = useSetSettingsMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setUse24HourFormat(data.use24HourFormat);
      setShowSeconds(data.showSeconds);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (uid)
      updateSettings({
        use24HourFormat,
        showSeconds,
        uid,
      });
  }, [use24HourFormat, showSeconds]);

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
