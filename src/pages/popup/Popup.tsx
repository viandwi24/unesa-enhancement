import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../components/switch/switch";
import "@pages/popup/Popup.css";

const Popup = () => {
  const setOption = async (key: string, val: any) => {
    await chrome.storage.local.set({ [key]: val });
    refreshOptions();
  };
  const getOption = async function <T>(key: string, defVal: T) {
    let val = defVal;
    const p = new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        val = result[key] as T;
        resolve(val);
      });
    });
    await p;
    if (val === "true" || val === "false") {
      val = (val === "true") as T;
    }
    return val;
  };

  const [opts, setOpts] = useState({
    ssoPopupBlocker: false,
    siakadu: false,
  });

  const refreshOptions = async () => {
    setOpts({
      ssoPopupBlocker: await getOption<boolean>(
        "sso.popup.blocker.active",
        false
      ),
      siakadu: await getOption<boolean>("siakadu.active", false),
    });
    setTimeout(() => console.log(opts), 1000);
  };

  useEffect(() => {
    refreshOptions();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col justify-center">
        <div className="text-xl font-bold mb-4">UNESA ENHANCEMENT</div>
        <div className="flex items-center">
          <label className="text-lg">SSO Popup Blocker</label>
          <div className="flex-1 justify-end text-right">
            <ToggleSwitch
              value={opts.ssoPopupBlocker}
              onToggle={(val) => {
                setOption("sso.popup.blocker.active", val);
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="text-lg">Siakadu++</label>
          <div className="flex-1 justify-end text-right">
            <ToggleSwitch
              value={opts.siakadu}
              onToggle={(val) => {
                setOption("siakadu.active", val);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
