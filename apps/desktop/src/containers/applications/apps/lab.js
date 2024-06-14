import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar } from "../../../utils/general";
import "./assets/lab.scss"
export const Lab = (props) => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.lab);
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
      <ToolBar app={wnapp.action} icon={wnapp.icon} size={wnapp.size} name="Lab tests" />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="flex text-xs py-2 topBar">
          <div className="mx-2">File</div>
          <div className="mx-4">Edit</div>
          <div className="mx-4">View</div>
        </div>
        <div className="restWindow h-full flex-grow">
          <div className="w-full h-full overflow-hidden">
            <div class="containerwater2">
                <div class="containerwater">
                    <h1>Water Sample Test Results</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Toxin</th>
                                <th>Level (ppm)</th>
                                <th>Error Margin (ppm)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cyanide</td>
                                <td>0.02</td>
                                <td>±0.01</td>
                                <td class="safe">Safe</td>
                            </tr>
                            <tr>
                                <td>Arsenic</td>
                                <td>0.005</td>
                                <td>±0.002</td>
                                <td class="safe">Safe</td>
                            </tr>
                            <tr>
                                <td>Lead</td>
                                <td>0.003</td>
                                <td>±0.001</td>
                                <td class="safe">Safe</td>
                            </tr>
                            <tr>
                                <td>Mercury</td>
                                <td>0.001</td>
                                <td>±0.0005</td>
                                <td class="safe">Safe</td>
                            </tr>
                            <tr>
                                <td>Cadmium</td>
                                <td>0.002</td>
                                <td>±0.001</td>
                                <td class="safe">Safe</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/*<textarea className="noteText win11Scroll" id="textpad" defaultValue={extra.text ? props.I18n.getTrans(extra.text) : ""} disabled={extra.text}/>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
