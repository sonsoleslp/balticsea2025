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
                    <h1>Water Contaminant Levels by Well</h1>
                   <table>
                  <caption>Contaminant concentration in µg/l</caption>
                  <thead>
                    <tr>
                      <th>Well</th>
                      <th>Tube ID</th>
                      <th>Cd (µg/l)</th>
                      <th>CN- (µg/l)</th>
                      <th>Pb (µg/l)</th>
                      <th>Hg (µg/l)</th>
                      <th>MC-LR (µg/l)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>A01</td><td>1</td><td>0.8</td><td>20</td><td>2.0</td><td>1.0</td><td>0.8</td></tr>
                    <tr><td>A02</td><td>2</td><td>0.7</td><td>18</td><td>1.8</td><td>0.7</td><td>0.7</td></tr>
                    <tr><td>A03</td><td>3</td><td>0.9</td><td>15</td><td>1.5</td><td>0.4</td><td>0.7</td></tr>
                    <tr><td>A04</td><td>4</td><td>0.8</td><td>13</td><td>1.1</td><td>0.3</td><td>0.9</td></tr>
                    <tr><td>B01</td><td>1</td><td>0.7</td><td>22</td><td>2.0</td><td>1.0</td><td>0.8</td></tr>
                    <tr><td>B02</td><td>2</td><td>0.7</td><td>18</td><td>1.8</td><td>0.7</td><td>0.8</td></tr>
                    <tr><td>B03</td><td>3</td><td>0.9</td><td>15</td><td>1.6</td><td>0.5</td><td>0.7</td></tr>
                    <tr><td>B04</td><td>4</td><td>0.8</td><td>13</td><td>1.1</td><td>0.3</td><td>0.9</td></tr>
                    <tr><td>C01</td><td>1</td><td>0.8</td><td>21</td><td>2.0</td><td>1.0</td><td>0.8</td></tr>
                    <tr><td>C02</td><td>2</td><td>0.7</td><td>18</td><td>1.9</td><td>0.8</td><td>0.7</td></tr>
                    <tr><td>C03</td><td>3</td><td>0.9</td><td>16</td><td>1.5</td><td>0.4</td><td>0.6</td></tr>
                    <tr><td>C04</td><td>4</td><td>0.8</td><td>13</td><td>1.1</td><td>0.3</td><td>0.9</td></tr>
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
