import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar } from "../../../utils/general";

export const Notepad = (props) => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.notepad);
  const dispatch = useDispatch();
  const extra = JSON.parse(wnapp.extra || "{}");
  return (
    <div
      className="notepad floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar app={wnapp.action} icon={wnapp.icon} size={wnapp.size} name="Notepad" />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="flex text-xs py-2 topBar">
          <div className="mx-2">File</div>
          <div className="mx-4">Edit</div>
          <div className="mx-4">View</div>
        </div>
        <div className="restWindow h-full flex-grow">
          <div className="w-full h-full overflow-hidden">
            <textarea className="noteText win11Scroll" id="textpad" defaultValue={extra.text ? props.I18n.getTrans(extra.text) : ""} disabled={extra.text}/>
          </div>
        </div>
      </div>
    </div>
  );
};
