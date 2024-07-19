

import React from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import Palette from "./Palette"; // Assuming Palette component is in ./Palette.js

function initDiagram() {
  const $ = go.GraphObject.make;

  const myDiagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
    layout: $(go.Layout),
    grid: $(go.Panel, 'Grid',
      $(go.Shape, 'LineH', { stroke: 'grey', strokeWidth: 0.5 }),
      $(go.Shape, 'LineV', { stroke: 'grey', strokeWidth: 0.5 })
    ),
    'grid.visible': true,
    'grid.gridCellSize': new go.Size(20, 20),
    'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
    'draggingTool.isGridSnapEnabled': true,
    'resizingTool.isGridSnapEnabled': true,
  });

  function createNodeTemplate(shapeType, fillColor, text, desiredSize) {
    return $(
      go.Node, "Auto",
      { resizable: true, resizeObjectName: "SHAPE", groupable: true },
      $(go.Shape, shapeType, {
        name: "SHAPE",
        fill: fillColor,
        strokeWidth: 1,
        stroke: "black",
        desiredSize: desiredSize || new go.Size(100, 100),
      },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
      $(go.TextBlock, text,
        { margin: 5, editable: true, font: "bold 10px sans-serif" },
        new go.Binding("text", "text").makeTwoWay()),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
    );
  }
  

  myDiagram.nodeTemplateMap.add("Circle", createNodeTemplate("Circle", "lightblue", "Circle"));
  myDiagram.nodeTemplateMap.add("Square", createNodeTemplate("Square", "lightgreen", "Square"));
  myDiagram.nodeTemplateMap.add("Triangle", createNodeTemplate("Triangle", "lightcoral", "Triangle"));
  myDiagram.nodeTemplateMap.add("Diamond", createNodeTemplate("Diamond", "red", "Diamond"));

  myDiagram.groupTemplate =
    $(go.Group, "Vertical", {
      resizable: true,
      resizeObjectName: "PANEL",
      computesBoundsAfterDrag: true,
      computesBoundsIncludingLocation: true,
    },
    $(go.Panel, "Auto", { name: "PANEL", margin: 0 },
      $(go.Shape, "Rectangle", {
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
        parameter1: 14,
        
      }),
      $(go.TextBlock, "Base Frame", {
        margin: new go.Margin(5, 0, 0, 0),
        background: 'black',
        stroke: 'white',
        stretch: go.Stretch.Horizontal,
        textAlign: 'center',
        alignment: go.Spot.Bottom,
        maxSize: new go.Size(NaN, 18),
      },
      new go.Binding("text", "text").makeTwoWay())
    )
  );

  myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {
    const newnode = e.diagram.selection.first();
    if (newnode instanceof go.Node && newnode.data.category === "InsideTemplate") {
      // Get the dropped location
      const pt = e.diagram.lastInput.documentPoint;
      // Create data for the base panel
      const basePanelData = { key: 4, category: "InsideTemplate", isGroup: true, text: "Base Frame", loc: go.Point.stringify(pt) };
      myDiagram.startTransaction("add base panel");
      myDiagram.model.addNodeData(basePanelData);
      myDiagram.commitTransaction("add base panel");

      // Remove the dropped node if it has no other purpose
      myDiagram.remove(newnode);
    } else if (newnode instanceof go.Node && newnode.data.category !== "InsideTemplate") {
      const group = e.diagram.findNodeForKey(4); // Assuming 4 is the key of the InsideTemplate group
      if (group instanceof go.Group) {
        myDiagram.model.setDataProperty(newnode.data, "group", group.key);
      }
    }
  });

  myDiagram.addDiagramListener("ClipboardPasted", function(e) {
    const pastedParts = e.subject.iterator;
    let offsetY = 0;
    const copiedNode = e.diagram.selection.first();
    while (pastedParts.next()) {
      const part = pastedParts.value;
      if (part instanceof go.Node && part.data.category !== "InsideTemplate") {
        const group = myDiagram.findNodeForKey(4);
        if (group instanceof go.Group) {
          myDiagram.model.setDataProperty(part.data, "group", group.key);
          // Set the location of the pasted node below the original node
          const loc = new go.Point(copiedNode.location.x, copiedNode.location.y + copiedNode.actualBounds.height + offsetY);
          part.move(loc);
          offsetY += part.actualBounds.height + 10; // adjust the offset for the next node
        }
      }
    }
    // Ensure the group node layout is updated after pasting
    const groupNode = myDiagram.findNodeForKey(4);
    if (groupNode instanceof go.Group) {
      groupNode.invalidateLayout();
      groupNode.computeBounds();
    }
  });
  // Load diagram state from localStorage
  const savedModel = localStorage.getItem("myDiagramModel");
  if (savedModel) {
    myDiagram.model = go.Model.fromJson(savedModel);
  }

  // Save diagram state to localStorage whenever the model changes
  myDiagram.addModelChangedListener(() => {
    localStorage.setItem("myDiagramModel", myDiagram.model.toJson());
  });

  myDiagram.initialScale = 1.0;

  return myDiagram;
}

function Home() {
  const diagramRef = React.useRef(null);

  const setDiagramRef = (diagram) => {
    diagramRef.current = diagram;
  };

  return (
    <div style={{ display: "flex" }}>
      <Palette diagram={diagramRef.current} />
      <div style={{ width: "80vw", height: "97.6vh", backgroundColor: "lightgray", border: "1px solid black" }}>
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName="diagram-component"
          style={{ width: "100%", height: "100%", backgroundColor: "white" }}
          onDiagramEvent={setDiagramRef}
        />
      </div>
    </div>
  );
}

export default Home;
