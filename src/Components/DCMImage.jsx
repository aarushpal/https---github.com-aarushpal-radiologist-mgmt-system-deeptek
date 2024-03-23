import React, { useEffect } from "react";
import { RenderingEngine, Enums } from "@cornerstonejs/core";

const { ViewportType } = Enums;

const DCMImage = ({ dicomId }) => {
  useEffect(() => {
    const run = async () => {
      const imageIds = [
        `dicomweb://localhost:6060/api/radiologists/viewDicom/${dicomId}/`,
      ];

      const element = document.createElement("div");
      element.id = "cornerstone-element";
      element.style.width = "450px";
      element.style.height = "470px";
      element.style.position = "absolute";
      element.style.top = "130px";
      element.style.right = "400px";
      element.style.zIndex = "-1";
      element.style.backgroundColor = "#31363F";
      document.getElementById("content").appendChild(element);

      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);
      console.log(renderingEngine);
      const viewportId = "DX_STACK";
      const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: [0, 0, 0],
        },
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = renderingEngine.getViewport(viewportId);
      console.log(viewport);
      const stack = [imageIds[0]];

      await viewport.setStack(stack);

      viewport.render();
    };

    run();
  }, []);

  return (
    <>
      <div id="content"></div>
    </>
  );
};

export default DCMImage;
