// import React from 'react';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./App.css"; // contains .diagram-component CSS
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  // Label,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  ICshapeStyle, nodeEllipse, ledRedStyle, ledYellowStyle,
  ledGreenStyle, resistorStyle, sevenSegmentStyle,
  numberPartG, numberPartF, numberPartA, numberPartB,
  numberPartC, numberPartD, numberPartE, twoWayLineA,
  twoWayLineB, twoWayLineC
} from "./components/node/nodeStyle";

import {
  FromBottom, FromTop, InoutPort, SwitchLeft, SwitchRight
} from "./components/node/portTemplate";

var count = 0;
var jsonData = {};
// var FileSaver = require("file-saver");
import FileSaver from "file-saver"; // Use ES module import for file-saver


/*
  universal system variable; will check value of this variable in every main loop
    sys = 0 : do nothing
    sys = 1 : call function new file
    sys = 2 : call function load file
    sys = 3 : call function save file
*/
var sys = 0;

// Tailwind button styling
// const Button = "px-8 py-1 rounded text-white text-xl block transition ease-in-out delay-150 hover:-translate-x-py hover:scale-110 hover:bg-white hover:text-black cursor-pointer";

/* Add another constant here */
function initDiagram() {
  // define local variable
  var red = "orangered"; // for logic 0 or false
  var green = "forestgreen"; // for logic 1 or true
  var black = "black";
  var blue = "blue";
  var yellow = "yellow";
  var grey = "grey";
  var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  // go.Diagram.licenseKey = "none";

  const diagram = $(go.Diagram, {
    //Global settings for the whole diagram
    "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, // Mouse wheel to zoom
    "draggingTool.isGridSnapEnabled": true, // Enable grid snap
    "undoManager.isEnabled": true, // Enable Ctrl+Z to undo
    initialScale: 1.5, // Diagram zoom scale when start
  });

  // when the document is modified, add a "*" to the title
  diagram.addDiagramListener("Modified", () => {
    var idx = document.title.indexOf("*");
    if (diagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substring(0, idx);
    }
  });

  // creates relinkable Links that will avoid crossing Nodes when possible
  // and will jump over other Links in their paths
  diagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Routing.AvoidsNodes,
      curve: go.Curve.JumpOver,
      corner: 3,
      relinkableFrom: true,
      relinkableTo: true,
      selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 5,
      shadowColor: "blue",
    },
    new go.Binding("isShadowed", "isSelected").ofObject(),
    $(go.Shape, { name: "SHAPE", strokeWidth: 2, stroke: red, parameter1: 0 }),
    new go.Binding("stroke", "color").ofModel(),
    new go.Binding("parameter1", "value") /*.ofModel()*/
  );

  // Graph link model to identify the port
  diagram.model = $(go.GraphLinksModel, {
    linkFromPortIdProperty: "fromPort", // required information:
    linkToPortIdProperty: "toPort", // identifies data property names
    linkKeyProperty: "key",
  });

  // grid settings
  diagram.grid.visible = true;

  diagram.grid = $(
    go.Panel,
    go.Panel.Grid, // or "Grid"
    { gridCellSize: new go.Size(1, 1) },
    $(go.Shape, "LineH", { stroke: "black" }),
    $(go.Shape, "LineV", { stroke: "black" })
  );

  // custom elipse shape
  go.Shape.defineFigureGenerator("HalfEllipse", function (shape, w, h) {
    return new go.Geometry()
      .add(
        new go.PathFigure(0, 0, true)
          .add(
            new go.PathSegment(
              go.PathSegment.Bezier,
              w,
              0.5 * h,
              KAPPA * w,
              0,
              w,
              (0.5 - KAPPA / 2) * h
            )
          )
          .add(
            new go.PathSegment(
              go.SegmentType.Bezier,
              0,
              h,
              w,
              (0.5 + KAPPA / 2) * h,
              KAPPA * w,
              h
            ).close()
          )
      )
      .setSpots(0, 0.156, 0.844, 0.844);
  });

  // create a new Platte
  var palette = new go.Palette("palette"); // for IC Gates
  var palette2 = new go.Palette("palette2"); // for other items

  // node template helpers (Tooltip when hover with mouse)
  var sharedToolTip = $(
    "ToolTip",
    { "Border.figure": "RoundedRectangle" },
    $(
      go.TextBlock,
      { margin: 2 },
      new go.Binding("text", "", function (d) {
        return d.category;
      })
    )
  );

  // node style settings
  function nodeStyle() {
    return [
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      new go.Binding("isShadowed", "isSelected").ofObject(),
      {
        selectionAdorned: false,
        shadowOffset: new go.Point(0, 0),
        shadowBlur: 15,
        shadowColor: "blue",
        toolTip: sharedToolTip,
      },
    ];
  }

  // define templates for each type of node
  var inputTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Circle", ICshapeStyle(), { fill: red }),
    $(
      go.Shape,
      "Rectangle",
      InoutPort(false),
      { portId: "", alignment: new go.Spot(0.4, 0.5) },
      new go.Binding("fill", "color").ofModel()
    ),
    {
      // if double-clicked, an input node will change its value, represented by the color.
      doubleClick: (e, obj) => {
        e.diagram.startTransaction("Toggle Input");
        var shp = obj.findObject("NODESHAPE");
        shp.fill = shp.fill === green ? red : green;
        updateStates();
        e.diagram.commitTransaction("Toggle Input");
      },
    }
  );

  var outputTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Square", ICshapeStyle(), { fill: "grey" }),
    $(
      go.Shape,
      "Rectangle",
      InoutPort(true),
      { portId: "", alignment: new go.Spot(0, 0.5) },
      new go.Binding("fill", "color").ofModel()
    )
  );

  var clkTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle(), { fill: red }),
    $(
      go.Shape,
      "Rectangle",
      InoutPort(false),
      { portId: "", alignment: new go.Spot(1, 0.5) },
      new go.Binding("fill", "color").ofModel()
    ),
    $(go.TextBlock, { text: "clk T=1500ms", stroke: "white" })
  );

  var vccTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle(), { fill: "orange" }),
    $(
      go.Shape,
      "Rectangle",
      InoutPort(false),
      { portId: "", alignment: new go.Spot(1, 0.5) },
      new go.Binding("fill", "color").ofModel()
    ),
    $(go.TextBlock, { text: "Vcc", stroke: "white" })
  );

  var gndTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "triangle", ICshapeStyle(), { fill: "grey", angle: 180 }),
    $(
      go.Shape,
      "Rectangle",
      InoutPort(false),
      { portId: "", alignment: new go.Spot(0.75, 0.5) },
      new go.Binding("fill", "color").ofModel()
    ),
    $(go.TextBlock, { text: "Gnd", stroke: "black" })
  );

  var andTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7408 and", stroke: "white" })
  );

  var orTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7432 or", stroke: "white" })
  );

  var xorTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7486 xor", stroke: "white" })
  );

  var norTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7402 nor", stroke: "white" })
  );

  var xnorTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "74266 xnor", stroke: "white" })
  );

  var nandTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input port12
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input port10
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input port2
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input port4
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7400 nand", stroke: "white" })
  );

  var notTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(
      go.Shape,
      "Rectangle",
      FromBottom(true), //fb botout topin , ft topout botin
      { portId: "port14", alignment: new go.Spot(0.05, 0) }
    ), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input port13
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //output port12 from port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //input port11
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //output port10 from port11
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //input port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output port8 from port9
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input port1
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //output port2 from port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //input port3
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //output port4 from port3
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //input port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output port6 from port5
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7404 not", stroke: "white" })
  );

  var dffTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(), {
      alignment: new go.Spot(0.05, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port14",
      alignment: new go.Spot(0.05, 0),
    }), //vcc port14
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port13",
      alignment: new go.Spot(0.2, 0),
    }), //input clr port13
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port12",
      alignment: new go.Spot(0.35, 0),
    }), //input d port12
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port11",
      alignment: new go.Spot(0.5, 0),
    }), //input clk port11
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "port10",
      alignment: new go.Spot(0.65, 0),
    }), //input pre port10
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port9",
      alignment: new go.Spot(0.8, 0),
    }), //output q port9
    $(go.Shape, "Rectangle", FromTop(false), {
      portId: "port8",
      alignment: new go.Spot(0.95, 0),
    }), //output q' port8
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.05, 1),
    }), //input clr port1
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.2, 1),
    }), //input d port2
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port3",
      alignment: new go.Spot(0.35, 1),
    }), //input clk port3
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port4",
      alignment: new go.Spot(0.5, 1),
    }), //input pre port4
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port5",
      alignment: new go.Spot(0.65, 1),
    }), //output q port5
    $(go.Shape, "Rectangle", FromBottom(false), {
      portId: "port6",
      alignment: new go.Spot(0.8, 1),
    }), //output q' port6
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port7",
      alignment: new go.Spot(0.95, 1),
    }), //gnd port7
    $(go.TextBlock, { text: "7474 dff", stroke: "white" })
  );

  var ledRedTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ledRedStyle()),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.2, 1),
    }), //left port
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.8, 1),
    }), //right port
    $(go.TextBlock, { text: "led", stroke: "white" })
  );

  var ledYellowTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ledYellowStyle()),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.2, 1),
    }), //left port
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.8, 1),
    }), //right port
    $(go.TextBlock, { text: "led", stroke: "white" })
  );

  var ledGreenTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", ledGreenStyle()),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port1",
      alignment: new go.Spot(0.2, 1),
    }), //left port
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "port2",
      alignment: new go.Spot(0.8, 1),
    }), //right port
    $(go.TextBlock, { text: "led", stroke: "white" })
  );

  var resistorTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "RoundedRectangle", resistorStyle()),
    $(go.Shape, "Rectangle", InoutPort(true), {
      portId: "in",
      alignment: new go.Spot(0, 0.5),
    }),
    $(go.Shape, "Rectangle", InoutPort(false), {
      portId: "out",
      alignment: new go.Spot(1, 0.5),
    }),
    $(go.Shape, {
      fill: "brown",
      desiredSize: new go.Size(5, 20),
      alignment: new go.Spot(0.2, 0.5),
    }),
    $(go.Shape, {
      fill: "black",
      desiredSize: new go.Size(5, 20),
      alignment: new go.Spot(0.4, 0.5),
    }),
    $(go.Shape, {
      fill: "orange",
      desiredSize: new go.Size(5, 20),
      alignment: new go.Spot(0.6, 0.5),
    }),
    $(go.Shape, {
      fill: "#AB6D23",
      desiredSize: new go.Size(5, 20),
      alignment: new go.Spot(0.8, 0.5),
    })
  );

  var switchTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Square", ICshapeStyle()),
    $(go.Shape, "Rectangle", InoutPort(true), {
      portId: "in",
      alignment: new go.Spot(0, 0.5),
    }),
    $(go.Shape, "Rectangle", InoutPort(false), {
      portId: "out",
      alignment: new go.Spot(0.4, 0.5),
    }),
    $(go.Shape, twoWayLineA(), {
      alignment: new go.Spot(0.2, 0.35),
      angle: 60,
    }),
    $(go.Shape, twoWayLineC(), {
      alignment: new go.Spot(0.2, 0.5),
      angle: 90,
      opacity: 0,
    }),
    {
      // double-click toggle switch on or off. represent by its line angle.
      doubleClick: (e, obj) => {
        e.diagram.startTransaction("Toggle Switch");
        var lineA = obj.findObject("A"); //60 degree angle line
        var lineC = obj.findObject("C"); //straight line when turn on switch
        lineA.opacity = lineA.opacity === 1 ? 0 : 1;
        lineC.opacity = lineC.opacity === 1 ? 0 : 1;
        updateStates();
        e.diagram.commitTransaction("Toggle Switch");
      },
    }
  );

  var twoWaySwitchATemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Square", ICshapeStyle()),
    $(go.Shape, "Rectangle", SwitchRight(), {
      portId: "port1",
      alignment: new go.Spot(0.4, 0.2),
    }),
    $(go.Shape, "Rectangle", SwitchRight(), {
      portId: "port2",
      alignment: new go.Spot(0.4, 0.8),
    }),
    $(go.Shape, "Rectangle", SwitchLeft(), {
      portId: "port3",
      alignment: new go.Spot(0, 0.5),
    }),
    $(go.Shape, twoWayLineA(), {
      alignment: new go.Spot(0.2, 0.65),
      angle: -70,
    }),
    $(go.Shape, twoWayLineB(), {
      alignment: new go.Spot(0.2, 0.35),
      angle: 70,
      opacity: 0,
    }),
    {
      // if double-clicked, an input node will change its value, represented by the color.
      doubleClick: (e, obj) => {
        e.diagram.startTransaction("Toggle Switch");
        var lineA = obj.findObject("A");
        var lineB = obj.findObject("B");
        lineA.opacity = lineA.opacity === 1 ? 0 : 1;
        lineB.opacity = lineB.opacity === 1 ? 0 : 1;
        updateStates();
        e.diagram.commitTransaction("Toggle Switch");
      },
    }
  );

  var twoWaySwitchBTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Square", ICshapeStyle()),
    $(go.Shape, "Rectangle", SwitchLeft(), {
      portId: "port1",
      alignment: new go.Spot(0, 0.2),
    }),
    $(go.Shape, "Rectangle", SwitchLeft(), {
      portId: "port2",
      alignment: new go.Spot(0, 0.8),
    }),
    $(go.Shape, "Rectangle", SwitchRight(), {
      portId: "port3",
      alignment: new go.Spot(0.4, 0.5),
    }),
    $(go.Shape, twoWayLineA(), {
      alignment: new go.Spot(0.2, 0.35),
      angle: -70,
    }),
    $(go.Shape, twoWayLineB(), {
      alignment: new go.Spot(0.2, 0.65),
      angle: 70,
      opacity: 0,
    }),
    {
      // double-click change the output port that input will be connect to, represent by its line.
      doubleClick: (e, obj) => {
        e.diagram.startTransaction("Toggle Switch");
        var lineA = obj.findObject("A");
        var lineB = obj.findObject("B");
        lineA.opacity = lineA.opacity === 1 ? 0 : 1;
        lineB.opacity = lineB.opacity === 1 ? 0 : 1;
        updateStates();
        e.diagram.commitTransaction("Toggle Switch");
      },
    }
  );

  var sevenSegmentTemplate = $(
    go.Node,
    "Spot",
    nodeStyle(),
    $(go.Shape, "Rectangle", sevenSegmentStyle()),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "portG",
      alignment: new go.Spot(0.1, 0),
    }), //G
    $(go.Shape, "Rectangle", numberPartG(), {
      angle: 90,
      alignment: new go.Spot(0.4, 0.5),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "portF",
      alignment: new go.Spot(0.3, 0),
    }), //F
    $(go.Shape, "Rectangle", numberPartF(), {
      alignment: new go.Spot(0.1, 0.3),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "portVcc",
      alignment: new go.Spot(0.5, 0),
    }), //vcc
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "portA",
      alignment: new go.Spot(0.7, 0),
    }), //A
    $(go.Shape, "Rectangle", numberPartA(), {
      angle: 90,
      alignment: new go.Spot(0.4, 0.1),
    }),
    $(go.Shape, "Rectangle", FromBottom(true), {
      portId: "portB",
      alignment: new go.Spot(0.9, 0),
    }), //B
    $(go.Shape, "Rectangle", numberPartB(), {
      alignment: new go.Spot(0.7, 0.3),
    }),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "portE",
      alignment: new go.Spot(0.1, 1),
    }), //E
    $(go.Shape, "Rectangle", numberPartE(), {
      alignment: new go.Spot(0.1, 0.7),
    }),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "portD",
      alignment: new go.Spot(0.3, 1),
    }), //D
    $(go.Shape, "Rectangle", numberPartD(), {
      angle: 90,
      alignment: new go.Spot(0.4, 0.9),
    }),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "portCom",
      alignment: new go.Spot(0.5, 1),
    }), //Com
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "portC",
      alignment: new go.Spot(0.7, 1),
    }), //C
    $(go.Shape, "Rectangle", numberPartC(), {
      alignment: new go.Spot(0.7, 0.7),
    }),
    $(go.Shape, "Rectangle", FromTop(true), {
      portId: "portDP",
      alignment: new go.Spot(0.9, 1),
    }), //DP
    $(go.Shape, "Circle", {
      name: "DP",
      desiredSize: new go.Size(10, 10),
      stroke: "white",
      fill: "black",
      alignment: new go.Spot(0.85, 0.9),
    })
  );

  // -- end node template --

  // add the templates created above to diagram and palette
  diagram.nodeTemplateMap.add("clk", clkTemplate);
  diagram.nodeTemplateMap.add("input", inputTemplate);
  diagram.nodeTemplateMap.add("output", outputTemplate);
  diagram.nodeTemplateMap.add("and", andTemplate);
  diagram.nodeTemplateMap.add("or", orTemplate);
  diagram.nodeTemplateMap.add("xor", xorTemplate);
  diagram.nodeTemplateMap.add("not", notTemplate);
  diagram.nodeTemplateMap.add("nand", nandTemplate);
  diagram.nodeTemplateMap.add("nor", norTemplate);
  diagram.nodeTemplateMap.add("xnor", xnorTemplate);
  diagram.nodeTemplateMap.add("led_red", ledRedTemplate);
  diagram.nodeTemplateMap.add("led_yellow", ledYellowTemplate);
  diagram.nodeTemplateMap.add("led_green", ledGreenTemplate);
  diagram.nodeTemplateMap.add("resistor", resistorTemplate);
  diagram.nodeTemplateMap.add("switch", switchTemplate);
  diagram.nodeTemplateMap.add("2wsa", twoWaySwitchATemplate);
  diagram.nodeTemplateMap.add("2wsb", twoWaySwitchBTemplate);
  diagram.nodeTemplateMap.add("sevensegment", sevenSegmentTemplate);
  diagram.nodeTemplateMap.add("dff", dffTemplate);
  diagram.nodeTemplateMap.add("vcc", vccTemplate);
  diagram.nodeTemplateMap.add("gnd", gndTemplate);

  // share the template map with the Palette
  palette.nodeTemplateMap = diagram.nodeTemplateMap; // IC gates
  palette2.nodeTemplateMap = diagram.nodeTemplateMap; // Others

  // Add something to palette
  palette.model.nodeDataArray = [
    { category: "vcc" },
    { category: "gnd" },
    { category: "input" },
    { category: "output" },
    { category: "clk" },
    { category: "and" },
    { category: "or" },
    { category: "xor" },
    { category: "not" },
    { category: "nand" },
    { category: "nor" },
    { category: "xnor" },
    { category: "dff" },
  ];

  palette2.model.nodeDataArray = [
    { category: "led_red" },
    { category: "led_yellow" },
    { category: "led_green" },
    { category: "switch" },
    { category: "2wsa" },
    { category: "2wsb" },
    { category: "resistor" },
    { category: "sevensegment" },
  ];

  loop();

  function loop() {
    setTimeout(function () {
      updateStates();
      loop();
    }, 250);
    count = count + 1;
    if (count % 60 === 0) {
      count = 0;
    }

    // check universal system variable
    if (sys === 1) newFile();
    else if (sys === 2) load(jsonData);
    else if (sys === 3) save();
  }

  function updateStates() {
    var oldskip = diagram.skipsUndoManager;
    diagram.skipsUndoManager = true;
    // do all "input" nodes first
    diagram.nodes.each(function (node) {
      if (node.category === "input") {
        doInput(node);
      }
    });
    // now we can do all other kinds of nodes
    diagram.nodes.each(function (node) {
      switch (node.category) {
        case "clk":
          doClk(node);
          break;
        case "and":
          doAnd(node);
          break;
        case "or":
          doOr(node);
          break;
        case "xor":
          doXor(node);
          break;
        case "not":
          doNot(node);
          break;
        case "nand":
          doNand(node);
          break;
        case "nor":
          doNor(node);
          break;
        case "xnor":
          doXnor(node);
          break;
        case "dff":
          doDff(node);
          break;
        case "sevensegment":
          do7seg(node);
          break;
        case "output":
          doOutput(node);
          break;
        case "switch":
          doSwitch(node);
          break;
        case "2wsa":
          do2SwitchA(node);
          break;
        case "2wsb":
          do2SwitchB(node);
          break;
        case "resistor":
          doResistor(node);
          break;
        case "led_green":
          doLEDgreen(node);
          break;
        case "led_yellow":
          doLEDyellow(node);
          break;
        case "led_red":
          doLEDred(node);
          break;
        case "vcc":
          doVcc(node);
          break;
        case "gnd":
          doGnd(node);
          break;
        case "input":
          break; // doInput already called, above
        default:
          break;
      }
    });
    diagram.skipsUndoManager = oldskip;
  }

  function linkIsTrue(link) {
    // assume the given Link has a Shape named "SHAPE"
    return link.findObject("SHAPE").stroke === green;
  }

  function setOutputLinks(node, color) {
    node.findLinksOutOf().each(function (link) {
      link.findObject("SHAPE").stroke = color;
    });
  }


  function setOutputLinksP(node, color, pid) {
    node.findLinksOutOf(pid).each(function (link) {
      link.findObject("SHAPE").stroke = color;
    });
  }

  function doInput(node) {
    setOutputLinks(node, node.findObject("NODESHAPE").fill);
  }

  function doVcc(node) {
    setOutputLinks(node, yellow);
  }

  function doGnd(node) {
    setOutputLinks(node, grey);
  }

  function doSwitch(node) {
    var stat = node.findObject("C").opacity;
    var input = getvalue(node, "in");
    if (input && input !== blue) {
      if (stat === 1) {
        setvalue(node, "out", input);
      } else {
        setvalue(node, "out", blue);
      }
    } else {
      setvalue(node, "out", blue);
    }
  }

  function do2SwitchA(node) {
    var stat = node.findObject("B").opacity;
    var input = getvalue(node, "port3");
    if (input && input !== blue) {
      if (stat === 1) {
        setvalue(node, "port1", input);
        setvalue(node, "port2", blue);
      } else {
        setvalue(node, "port1", blue);
        setvalue(node, "port2", input);
      }
    } else {
      setvalue(node, "port1", blue);
      setvalue(node, "port2", blue);
    }
  }

  function do2SwitchB(node) {
    var stat = node.findObject("B").opacity;
    var in1 = getvalue(node, "port1");
    var in2 = getvalue(node, "port2");
    if (stat === 1) {
      if (in2) {
        setvalue(node, "port3", in2);
      } else {
        setvalue(node, "port3", blue);
      }
    } else {
      if (in1) {
        setvalue(node, "port3", in1);
      } else {
        setvalue(node, "port3", blue);
      }
    }
  }

  function doResistor(node) {
    var input = getvalue(node, "in");
    if (input) {
      setvalue(node, "out", input);
    } else {
      setvalue(node, "out", blue);
    }
  }

  function doLEDgreen(node) {
    var input = getvalue(node, "port1");
    var gnd = getvalue(node, "port2");
    if (input === green && gnd === green) {
      node.findObject("LED").fill = green;
    } else {
      node.findObject("LED").fill = "grey";
    }
  }

  function doLEDyellow(node) {
    var input = getvalue(node, "port1");
    var gnd = getvalue(node, "port2");
    if (input === green && gnd === green) {
      node.findObject("LED").fill = "yellow";
    } else {
      node.findObject("LED").fill = "grey";
    }
  }

  function doLEDred(node) {
    var input = getvalue(node, "port1");
    var gnd = getvalue(node, "port2");
    if (input === green && gnd === green) {
      node.findObject("LED").fill = red;
    } else {
      node.findObject("LED").fill = "grey";
    }
  }

  function getvalue(node, pid) {
    var value;
    node.findLinksInto(pid).each(function (link) {
      value = link.findObject("SHAPE").stroke;
    });
    if (value) {
      return value;
    } else {
      return blue;
    }
  }

  function getoldvalue(node, pid) {
    var value;
    node.findLinksInto(pid).each(function (link) {
      value = link.findObject("SHAPE").parameter1;
    });
    return value;
  }

  function setvalue(node, pid, val) {
    node.findLinksOutOf(pid).each(function (link) {
      link.findObject("SHAPE").stroke = val;
    });
  }

  function setoldvalue(node, pid, val) {
    node.findLinksOutOf(pid).each(function (link) {
      link.findObject("SHAPE").parameter1 = val;
    });
  }

  function getinput10(node) {
    var input = [blue, blue, blue, blue, blue, blue, blue, blue, blue, blue];

    input[0] = getvalue(node, "port14");
    input[1] = getvalue(node, "port13");
    input[2] = getvalue(node, "port12");
    input[3] = getvalue(node, "port10");
    input[4] = getvalue(node, "port9");
    input[5] = getvalue(node, "port1");
    input[6] = getvalue(node, "port2");
    input[7] = getvalue(node, "port4");
    input[8] = getvalue(node, "port5");
    input[9] = getvalue(node, "port7");

    return input;
  }

  function getinput8(node) {
    var input = [blue, blue, blue, blue, blue, blue, blue, blue];

    input[0] = getvalue(node, "port14");
    input[1] = getvalue(node, "port13");
    input[2] = getvalue(node, "port11");
    input[3] = getvalue(node, "port9");
    input[4] = getvalue(node, "port1");
    input[5] = getvalue(node, "port3");
    input[6] = getvalue(node, "port5");
    input[7] = getvalue(node, "port7");

    return input;
  }

  function getinputdff(node) {
    var input = [blue, blue, blue, blue, blue, blue, blue, blue, blue, blue];

    input[0] = getvalue(node, "port14");
    input[1] = getvalue(node, "port13");
    input[2] = getvalue(node, "port12");
    input[3] = getvalue(node, "port11");
    input[4] = getvalue(node, "port10");
    input[5] = getvalue(node, "port1");
    input[6] = getvalue(node, "port2");
    input[7] = getvalue(node, "port3");
    input[8] = getvalue(node, "port4");
    input[9] = getvalue(node, "port7");

    return input;
  }

  function doClk(node) {
    if (count % 6 === 0) {
      if (node.findObject("NODESHAPE").fill === green) {
        node.findObject("NODESHAPE").fill = red;
      } else {
        node.findObject("NODESHAPE").fill = green;
      }
      setOutputLinks(node, node.findObject("NODESHAPE").fill);
    }
  }

  function doAnd(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active
      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      } else {
        if (input[1] === green && input[2] === green) {
          setvalue(node, "port11", green);
        } else setvalue(node, "port11", red);
      }

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      } else {
        if (input[3] === green && input[4] === green) {
          setvalue(node, "port8", green);
        } else setvalue(node, "port8", red);
      }

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      } else {
        if (input[5] === green && input[6] === green) {
          setvalue(node, "port3", green);
        } else setvalue(node, "port3", red);
      }

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      } else {
        if (input[7] === green && input[8] === green) {
          setvalue(node, "port6", green);
        } else setvalue(node, "port6", red);
      }
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }

  function doNand(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active
      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      } else {
        if (input[1] === green && input[2] === green) {
          setvalue(node, "port11", red);
        } else setvalue(node, "port11", green);
      }

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      } else {
        if (input[3] === green && input[4] === green) {
          setvalue(node, "port8", red);
        } else setvalue(node, "port8", green);
      }

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      } else {
        if (input[5] === green && input[6] === green) {
          setvalue(node, "port3", red);
        } else setvalue(node, "port3", green);
      }

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      } else {
        if (input[7] === green && input[8] === green) {
          setvalue(node, "port6", red);
        } else setvalue(node, "port6", green);
      }
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }
  function doNot(node) {
    var input = getinput8(node);

    if (input[0] === yellow && input[7] === grey) {
      //vcc and gnd must active

      if (input[1] === green) {
        setvalue(node, "port12", red);
      } else {
        if (input[1] === blue) {
          setvalue(node, "port12", blue);
        } else setvalue(node, "port12", green);
      }

      if (input[2] === green) {
        setvalue(node, "port10", red);
      } else {
        if (input[2] === blue) {
          setvalue(node, "port10", blue);
        } else setvalue(node, "port10", green);
      }

      if (input[3] === green) {
        setvalue(node, "port8", red);
      } else {
        if (input[3] === blue) {
          setvalue(node, "port8", blue);
        } else setvalue(node, "port8", green);
      }

      if (input[4] === green) {
        setvalue(node, "port2", red);
      } else {
        if (input[4] === blue) {
          setvalue(node, "port2", blue);
        } else setvalue(node, "port2", green);
      }

      if (input[5] === green) {
        setvalue(node, "port4", red);
      } else {
        if (input[5] === blue) {
          setvalue(node, "port4", blue);
        } else setvalue(node, "port4", green);
      }

      if (input[6] === green) {
        setvalue(node, "port6", red);
      } else {
        if (input[6] === blue) {
          setvalue(node, "port6", blue);
        } else setvalue(node, "port6", green);
      }
    } else {
      setvalue(node, "port12", blue);
      setvalue(node, "port10", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port2", blue);
      setvalue(node, "port4", blue);
      setvalue(node, "port6", blue);
    }
  }

  function doOr(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active

      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      } else {
        if (input[1] === green || input[2] === green) {
          setvalue(node, "port11", green);
        } else setvalue(node, "port11", red);
      }

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      } else {
        if (input[3] === green || input[4] === green) {
          setvalue(node, "port8", green);
        } else setvalue(node, "port8", red);
      }

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      } else {
        if (input[5] === green || input[6] === green) {
          setvalue(node, "port3", green);
        } else setvalue(node, "port3", red);
      }

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      } else {
        if (input[7] === green || input[8] === green) {
          setvalue(node, "port6", green);
        } else setvalue(node, "port6", red);
      }
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }
  function doNor(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active

      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      } else if (input[1] === green || input[2] === green) {
        setvalue(node, "port11", red);
      } else setvalue(node, "port11", green);

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      } else if (input[3] === green || input[4] === green) {
        setvalue(node, "port8", red);
      } else setvalue(node, "port8", green);

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      } else if (input[5] === green || input[6] === green) {
        setvalue(node, "port3", red);
      } else setvalue(node, "port3", green);

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      } else if (input[7] === green || input[8] === green) {
        setvalue(node, "port6", red);
      } else setvalue(node, "port6", green);
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }

  function doXor(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active

      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      }
      if (input[1] === green && input[2] === green) {
        setvalue(node, "port11", red);
      }
      if (input[1] === green && input[2] === red) {
        setvalue(node, "port11", green);
      }
      if (input[1] === red && input[2] === green) {
        setvalue(node, "port11", green);
      }
      if (input[1] === red && input[2] === red) {
        setvalue(node, "port11", red);
      }

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      }
      if (input[3] === green && input[4] === green) {
        setvalue(node, "port8", red);
      }
      if (input[3] === green && input[4] === red) {
        setvalue(node, "port8", green);
      }
      if (input[3] === red && input[4] === green) {
        setvalue(node, "port8", green);
      }
      if (input[3] === red && input[4] === red) {
        setvalue(node, "port8", red);
      }

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      }
      if (input[5] === green && input[6] === green) {
        setvalue(node, "port3", red);
      }
      if (input[5] === green && input[6] === red) {
        setvalue(node, "port3", green);
      }
      if (input[5] === red && input[6] === green) {
        setvalue(node, "port3", green);
      }
      if (input[5] === red && input[6] === red) {
        setvalue(node, "port3", red);
      }

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      }
      if (input[7] === green && input[8] === green) {
        setvalue(node, "port6", red);
      }
      if (input[7] === green && input[8] === red) {
        setvalue(node, "port6", green);
      }
      if (input[7] === red && input[8] === green) {
        setvalue(node, "port6", green);
      }
      if (input[7] === red && input[8] === red) {
        setvalue(node, "port6", red);
      }
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }

  function doXnor(node) {
    var input = getinput10(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active

      if (input[1] === blue || input[2] === blue) {
        setvalue(node, "port11", blue);
      }
      if (input[1] === green && input[2] === green) {
        setvalue(node, "port11", green);
      }
      if (input[1] === green && input[2] === red) {
        setvalue(node, "port11", red);
      }
      if (input[1] === red && input[2] === green) {
        setvalue(node, "port11", red);
      }
      if (input[1] === red && input[2] === red) {
        setvalue(node, "port11", green);
      }

      if (input[3] === blue || input[4] === blue) {
        setvalue(node, "port8", blue);
      }
      if (input[3] === green && input[4] === green) {
        setvalue(node, "port8", green);
      }
      if (input[3] === green && input[4] === red) {
        setvalue(node, "port8", red);
      }
      if (input[3] === red && input[4] === green) {
        setvalue(node, "port8", red);
      }
      if (input[3] === red && input[4] === red) {
        setvalue(node, "port8", green);
      }

      if (input[5] === blue || input[6] === blue) {
        setvalue(node, "port3", blue);
      }
      if (input[5] === green && input[6] === green) {
        setvalue(node, "port3", green);
      }
      if (input[5] === green && input[6] === red) {
        setvalue(node, "port3", red);
      }
      if (input[5] === red && input[6] === green) {
        setvalue(node, "port3", red);
      }
      if (input[5] === red && input[6] === red) {
        setvalue(node, "port3", green);
      }

      if (input[7] === blue || input[8] === blue) {
        setvalue(node, "port6", blue);
      }
      if (input[7] === green && input[8] === green) {
        setvalue(node, "port6", green);
      }
      if (input[7] === green && input[8] === red) {
        setvalue(node, "port6", red);
      }
      if (input[7] === red && input[8] === green) {
        setvalue(node, "port6", red);
      }
      if (input[7] === red && input[8] === red) {
        setvalue(node, "port6", green);
      }
    } else {
      setvalue(node, "port11", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port3", blue);
      setvalue(node, "port6", blue);
    }
  }

  function getinput7seg(node) {
    var input = [
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
      black,
    ];

    input[0] = getvalue(node, "portA");
    input[1] = getvalue(node, "portB");
    input[2] = getvalue(node, "portC");
    input[3] = getvalue(node, "portD");
    input[4] = getvalue(node, "portE");
    input[5] = getvalue(node, "portF");
    input[6] = getvalue(node, "portG");
    input[7] = getvalue(node, "portVcc");
    input[8] = getvalue(node, "portCom");
    input[9] = getvalue(node, "portDP");

    return input;
  }

  function do7seg(node) {
    var input = getinput7seg(node);

    if (input[7] === yellow && input[8] === yellow) {
      if (input[0] === green) {
        node.findObject("A").fill = red;
      } else {
        node.findObject("A").fill = black;
      }
      if (input[1] === green) {
        node.findObject("B").fill = red;
      } else {
        node.findObject("B").fill = black;
      }
      if (input[2] === green) {
        node.findObject("C").fill = red;
      } else {
        node.findObject("C").fill = black;
      }
      if (input[3] === green) {
        node.findObject("D").fill = red;
      } else {
        node.findObject("D").fill = black;
      }
      if (input[4] === green) {
        node.findObject("E").fill = red;
      } else {
        node.findObject("E").fill = black;
      }
      if (input[5] === green) {
        node.findObject("F").fill = red;
      } else {
        node.findObject("F").fill = black;
      }
      if (input[6] === green) {
        node.findObject("G").fill = red;
      } else {
        node.findObject("G").fill = black;
      }
      if (input[9] === green) {
        node.findObject("DP").fill = red;
      } else {
        node.findObject("DP").fill = black;
      }
    } else {
      node.findObject("A").fill = black;
      node.findObject("B").fill = black;
      node.findObject("C").fill = black;
      node.findObject("D").fill = black;
      node.findObject("E").fill = black;
      node.findObject("F").fill = black;
      node.findObject("G").fill = black;
      node.findObject("DP").fill = black;
    }
  }

  function doDff(node) {
    var input = getinputdff(node);

    if (input[0] === yellow && input[9] === grey) {
      //vcc and gnd must active

      if (input[1] === blue || input[4] === blue || input[3] === blue) {
        setvalue(node, "port9", blue);
        setvalue(node, "port8", blue);
      } else if (input[1] === green) {
        //check clr
        setvalue(node, "port9", red);
        setvalue(node, "port8", green);
      } else if (input[4] === green) {
        //check pre
        setvalue(node, "port9", green);
        setvalue(node, "port8", red);
      } else if (input[3] === green) {
        //check clk change
        if (input[2] === green) {
          setvalue(node, "port9", green);
        } else {
          setvalue(node, "port9", red);
        }

        if (input[2] === green) {
          setvalue(node, "port8", red);
        } else setvalue(node, "port8", green);
      }

      //----------------------------------------------

      if (input[5] === blue || input[8] === blue || input[7] === blue) {
        setvalue(node, "port5", blue);
        setvalue(node, "port6", blue);
      } else if (input[5] === green) {
        //check clr
        setvalue(node, "port5", red);
        setvalue(node, "port6", green);
      } else if (input[8] === green) {
        //check pre
        setvalue(node, "port5", green);
        setvalue(node, "port6", red);
      } else if (input[7] === green) {
        //check clk change

        if (input[6] === green) {
          setvalue(node, "port5", green);
        } else {
          setvalue(node, "port5", red);
        }

        if (input[6] === green) {
          setvalue(node, "port6", red);
        } else setvalue(node, "port6", green);
      }
    } else {
      setvalue(node, "port9", blue);
      setvalue(node, "port8", blue);
      setvalue(node, "port5", blue);
      setvalue(node, "port6", blue);
    }
  }

  function doOutput(node) {
    // assume there is just one input link
    // we just need to update the node's Shape.fill
    node.linksConnected.each(function (link) {
      node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke;
    });
  }

  async function newFile() {
    let isConfirm = window.confirm(
      "All unsaved changes will be lost\nProceed to create a new file?"
    );
    if (isConfirm) {
      const newData = {};
      diagram.model = go.Model.fromJson(newData);
    }
    sys = 0;
  }

  async function save() {
    var data = diagram.model.toJson();
    jsonData = data;
    diagram.isModified = false;
    var blob = new Blob([jsonData], { type: "application/json" });
    FileSaver.saveAs(blob, "diagram.json");
    sys = 0;
  }

  async function load(Data) {
    diagram.model = go.Model.fromJson(Data);
    sys = 0;
  }

  return diagram;
}

// render function...
function GoJSDiagram() {
  let history = useNavigate();
  useEffect(() => {
    document.title = "SLD Diagram";
  }, []);

  function onClickHome() {
    history("./online-simple-circuit");
  }

  function setSystemValue(val) {
    if (val === 1) sys = 1;
    else if (val === 2) sys = 2;
    else if (val === 3) sys = 3;
    else sys = 0;
  }

  function loadFile(e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (text) jsonData = text;
    };
    reader.readAsText(e.target.files[0]);
    setSystemValue(2);
  }



  return (
    <Box>
      <Box zIndex="50" userSelect="none" width="100%" height="3rem" display="flex" position="absolute" alignItems="center" bg="slategray" >
        <Box mr="4" ml="4" cursor="pointer" transition="ease-in-out" transitionDuration="150ms" onClick={onClickHome} >
          SLD
        </Box>
        <Button py="1" px="8" borderRadius="md" color="white" fontSize="md" display="block" transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out" cursor="pointer" bg="transparent" textAlign="center" onClick={(e) => setSystemValue(1)}      >
          New
        </Button>
        <Button as="label" htmlFor="load-file" py="1" px="8" borderRadius="md" color="white" fontSize="md" display="flex" alignItems="center" justifyContent="center" transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out" cursor="pointer" bg="transparent" textAlign="center"        >          Load
          <Input type="file" name="load-file" id="load-file" display="none" onChange={(e) => loadFile(e)} />
        </Button>
        <Button py="1" px="8" borderRadius="md" color="white" fontSize="md" display="block" transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out" cursor="pointer" bg="transparent" textAlign="center" onClick={(e) => setSystemValue(3)}        >
          Save
        </Button>
      </Box>
      <Box display={"flex"}>
        <Box id="diagramDiv" w="80%" h="100vh" bg="#e2e8f0" position="relative" borderBottom="1px solid black">
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName="main-diagram"
            nodeDataArray={[]}
          />
          <Box m="4" display="flex" flexDirection="row" justifyContent="space-between">
            <Box display={"flex"}>
              <Box display="flex" mr="2">
                <Heading as="h1" fontSize="sm" mr="2" px="2" border="1px solid black" bg="white" borderRadius="md">
                  Ctrl + Z
                </Heading>
                {" "}to Undo
              </Box>
              <Box display="flex" mr="2">
                <Heading as="h1" fontSize="sm" mr="2" px="2" border="1px solid black" bg="white" borderRadius="md">
                  Ctrl + Y
                </Heading>
                {" "}to Redo
              </Box>
              <Box display="flex" mr="2">
                <Heading as="h1" fontSize="sm" mr="2" px="2" border="1px solid black" bg="white" borderRadius="md">
                  Mouse Wheel
                </Heading>
                {" "}to zoom in/out
              </Box>
            </Box>
            <Heading fontSize="15px">Drag and drop component from the right side</Heading>
          </Box>
        </Box>

        <Box mt="16" w="20%" display="flex" flexDirection="column" bg="white" borderLeft="1px solid black" borderBottom="1px solid black">
          <Box className="tab">
            <Input type="radio" id="rd1" name="rd" defaultChecked></Input>
            <Box as='label' className="noselect tab-label" htmlFor="rd1">
              IC Gatews
            </Box>
            <Box className="tab-content">
              <Box id="palette" h="420px" />
            </Box>
          </Box>
          <Box className="tab">
            <Input type="radio" id="rd2" name="rd"></Input>
            <Box as='label' className="noselect tab-label" htmlFor="rd2">
              Others items
            </Box>
            <Box className="tab-content">
              <Box id="palette2" style={{ height: "420px" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GoJSDiagram;