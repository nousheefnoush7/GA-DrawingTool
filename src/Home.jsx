// //Home.jsx
// import React, { useRef, useEffect } from "react";
// import { ReactDiagram } from "gojs-react";
// import * as go from "gojs";
// import Palette from "./Palette";
// import DimensioningLink from "./dimensioning";
// import Dialog from '@mui/material/Dialog';
// import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// function initDiagram(handleClickOpen) {
//   const $ = go.GraphObject.make;

//   const myDiagram = $(go.Diagram, {
//     'undoManager.isEnabled': true,
//     layout: $(go.Layout),
//     grid: $(go.Panel, 'Grid',
//       $(go.Shape, 'LineH', { stroke: 'grey', strokeWidth: 0.5 }),
//       $(go.Shape, 'LineV', { stroke: 'grey', strokeWidth: 0.5 })
//     ),
//     'grid.visible': true,
//     'grid.gridCellSize': new go.Size(20, 20),
//     'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
//     'draggingTool.isGridSnapEnabled': true,
//     'resizingTool.isGridSnapEnabled': true,
//   });

//   function createNodeTemplate(shapeType, fillColor, text, desiredSize) {
//     return $(
//       go.Node, "Auto",
//       { resizable: true, resizeObjectName: "SHAPE", groupable: true },
//       $(go.Shape, shapeType, {
//         name: "SHAPE",
//         fill: fillColor,
//         strokeWidth: 1,
//         stroke: "black",
//         desiredSize: desiredSize || new go.Size(100, 100),
//         portId: "",
//         cursor: "pointer",
//       },
//       new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
//       $(go.Panel, "Table",
//         $(go.TextBlock, text,
//           { row: 0, column: 0, margin: 5, editable: true, font: "bold 10px sans-serif" },
//           new go.Binding("text", "text").makeTwoWay()),
//         $(go.TextBlock, 
//           { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
//           new go.Binding("text", "size", function(size) {
//             return `W: ${size.width.toFixed(1)} x H: ${size.height.toFixed(1)}`;
//           })),
//       ),
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
//     );
//   }

//   // Define the new node template for a vertical line
//   function createVerticalLineTemplate() {
//     return $(
//       go.Node, "Auto",
//       { resizable: true,
//          resizeObjectName: "SHAPE",
//           groupable: true,
//           // {
//             doubleClick: function(e, node) {
//               handleClickOpen(); 
//             }
//          },
//       $(go.Shape, "LineV", {
//         name: "SHAPE",
//         fill: "transparent",
//         strokeWidth: 5,
//         stroke: "red",
//         desiredSize: new go.Size(5, 100), // Adjust size as needed
//         portId: "",
//         cursor: "pointer",
//       },
//       new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
//       $(go.Panel, "Table",
//         $(go.TextBlock, "Vertical Line",
//           { row: 0, column: 0, margin: 5, editable: true, font: "bold 10px sans-serif" },
//           new go.Binding("text", "text").makeTwoWay()),
//         $(go.TextBlock, 
//           { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
//           new go.Binding("text", "size", function(size) {
//             return `W: ${size.width.toFixed(1)} x H: ${size.height.toFixed(1)}`;
//           })),
//       ),
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
//     );
//   }
//   // Define the new node template for a bold horizontal line
//   function createHorizontalLineTemplate() {
//     return $(
//       go.Node, "Auto",
//       { resizable: true, resizeObjectName: "SHAPE" },
//       $(go.Shape, "LineH", {
//         name: "SHAPE",
//         fill: "transparent",
//         strokeWidth: 5,
//         stroke: "blue",
//         desiredSize: new go.Size(100, 5), // Adjust size as needed
//         portId: "",
//         cursor: "pointer",
//       },
//       new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
//       $(go.Panel, "Table",
//         $(go.TextBlock, "Horizontal Line",
//           { row: 0, column: 0, margin: 5, editable: true, font: "bold 10px sans-serif" },
//           new go.Binding("text", "text").makeTwoWay()),
//         $(go.TextBlock, 
//           { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
//           new go.Binding("text", "size", function(size) {
//             return `W: ${size.width.toFixed(1)} x H: ${size.height.toFixed(1)}`;
//           })),
//       ),
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
//     );
//   }

//   myDiagram.nodeTemplateMap.add("Rectangle", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle2", createNodeTemplate("Rectangle", "SlateBlue", "Cover", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle3", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle4", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle5", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle6", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle7", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle8", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("Rectangle9", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(100,60)) );
//   myDiagram.nodeTemplateMap.add("VerticalLine", createVerticalLineTemplate());
//   myDiagram.nodeTemplateMap.add("HorizontalLine", createHorizontalLineTemplate());
//   myDiagram.groupTemplate =
//     $(go.Group, "Vertical", {
//       resizable: true,
//       resizeObjectName: "PANEL",
//       computesBoundsAfterDrag: true,
//       computesBoundsIncludingLocation: true,
//     },
//     $(go.Panel, "Auto", { name: "PANEL", margin: 0 },
//       $(go.Shape, "Rectangle", {
//         fill: "white",
//         stroke: "black",
//         strokeWidth: 1,
//         parameter1: 14, 
//         minSize: new go.Size(200,200)
//       }),
//       $(go.TextBlock, "Base Frame", {
//         margin: new go.Margin(5, 0, 0, 0),
//         background: 'black',
//         stroke: 'white',
//         stretch: go.Stretch.Horizontal,
//         textAlign: 'center',
//         alignment: go.Spot.Bottom,
//         minSize: new go.Size(200,NaN),
//       },
//       new go.Binding("text", "text").makeTwoWay())
//     )
//   );

//   myDiagram.linkTemplateMap.add(
//     'Dimensioning',
//     $(DimensioningLink,
//       new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
//       new go.Binding('toSpot', 'toSpot', go.Spot.parse),
//       new go.Binding('direction'),
//       new go.Binding('extension'),
//       new go.Binding('inset'),
//       // Make the connecting link line invisible
//       $(go.Shape, { stroke: 'gray' }, new go.Binding('stroke', 'color')),
//       $(go.Shape, { fromArrow: 'BackwardOpenTriangle', segmentIndex: 2, stroke: 'gray' }, new go.Binding('stroke', 'color')),
//       $(go.Shape, { toArrow: 'OpenTriangle', segmentIndex: -3, stroke: 'gray', scale: 0.8 }, new go.Binding('stroke', 'color')),
//       $(go.TextBlock,
//         {
//           segmentFraction: 0.5,
//           segmentOrientation: go.Orientation.Upright,
//           alignmentFocus: go.Spot.Top,
//           stroke: 'gray',
//           font: '8pt sans-serif',
//         },
//         new go.Binding('text', '', showDistance).ofObject(),
//         new go.Binding('stroke', 'color')
//       )
//     )
//   );

//   function showDistance(link) {
//     const numpts = link.pointsCount;
//     if (numpts < 2) return '';
//     const linkData = link.data;
//   if (linkData.category === 'HorizontalLine' || linkData.category === 'VerticalLine') {
//     return '';
//   }
//     const p0 = link.getPoint(0); 
//     const pn = link.getPoint(numpts - 1);
//     const ang = link.direction;
//     if (isNaN(ang)) return Math.floor(Math.sqrt(p0.distanceSquaredPoint(pn))) + '';
//     const rad = (ang * Math.PI) / 180;
//     return Math.floor(Math.abs(Math.cos(rad) * (p0.x - pn.x)) + Math.abs(Math.sin(rad) * (p0.y - pn.y))-1) + '';
//   }
//   function addDimensionLinks(node) {
//     const nodeData = node.data;
//     if (!nodeData || !nodeData.key) return;
//     const key = nodeData.key;
  
//     const baseFrame = myDiagram.findNodeForKey(4);
//     const nodeBounds = node.actualBounds;
//     const baseFrameBounds = baseFrame.actualBounds;
  
//     const dimensionLinks = [];
  
//     if (nodeBounds.top <= baseFrameBounds.top + 10) {
//       // Add dimensioning link above the node
//       dimensionLinks.push({
//         from: key,
//         to: key,
//         category: 'Dimensioning',
//         fromSpot: 'TopLeft',
//         toSpot: 'TopRight',
//         direction: 0,
//       });
//     }
  
//     if (nodeBounds.bottom >= baseFrameBounds.bottom - 10) {
//       // Add dimensioning link below the node
//       dimensionLinks.push({
//         from: key,
//         to: key,
//         category: 'Dimensioning',
//         fromSpot: 'BottomLeft',
//         toSpot: 'BottomRight',
//         direction: 180,
//       });
//     }
  
//     if (nodeBounds.left <= baseFrameBounds.left + 10) {
//       // Add dimensioning link to the left of the node
//       dimensionLinks.push({
//         from: key,
//         to: key,
//         category: 'Dimensioning',
//         fromSpot: 'TopLeft',
//         toSpot: 'BottomLeft',
//         direction: 90,
//         inset: nodeBounds.width * 0.8, 
//       });
//     }
    
//     if (nodeBounds.right >= baseFrameBounds.right - 10) {
//       // Add dimensioning link to the right of the node
//       dimensionLinks.push({
//         from: key,
//         to: key,
//         category: 'Dimensioning',
//         fromSpot: 'TopRight',
//         toSpot: 'BottomRight',
//         direction: 270,
//         inset: nodeBounds.width * 0.8,
//       });
//     }
  
//     myDiagram.model.addLinkDataCollection(dimensionLinks);
//   }
//   myDiagram.addDiagramListener("ChangedSelection", function(e) {
//     const node = e.diagram.selection.first();
//     if (node instanceof go.Node && node.data.category!== "InsideTemplate") {
//       addDimensionLinks(node);
//     }
//   });
  
//   myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {
//     const newnode = e.diagram.selection.first();
//     if (newnode instanceof go.Node && newnode.data.category === "InsideTemplate") {
//       const pt = e.diagram.lastInput.documentPoint;
//       const basePanelData = { key: 4, category: "InsideTemplate", isGroup: true, text: "Base Frame", loc: go.Point.stringify(pt) };
//       myDiagram.startTransaction("add base panel");
//       myDiagram.model.addNodeData(basePanelData);
//       myDiagram.commitTransaction("add base panel");
//       myDiagram.remove(newnode);
//     } else if (newnode instanceof go.Node && newnode.data.category!== "InsideTemplate") {
//       const group = e.diagram.findNodeForKey(4);
//       if (group instanceof go.Group && group.actualBounds.containsPoint(newnode.location)) {
//         myDiagram.model.setDataProperty(newnode.data, "group", group.key);
//         addDimensionLinks(newnode);
//       }
//     }
//   });
  
//   myDiagram.addDiagramListener("ClipboardPasted", function(e) {
//     const pastedParts = e.subject.iterator;
//     let offsetY = 0;
//     const copiedNode = e.diagram.selection.first();
//     while (pastedParts.next()) {
//       const part = pastedParts.value;
//       if (part instanceof go.Node && part.data.category!== "InsideTemplate") {
//         const group = myDiagram.findNodeForKey(4);
//         if (group instanceof go.Group && group.actualBounds.containsPoint(part.location)) {
//           myDiagram.model.setDataProperty(part.data, "group", group.key);
//           const loc = new go.Point(copiedNode.location.x, copiedNode.location.y + copiedNode.actualBounds.height + offsetY);
//           part.move(loc);
//           addDimensionLinks(part);
//         }
//       }
//     }
//     const groupNode = myDiagram.findNodeForKey(4);
//     if (groupNode instanceof go.Group) {
//       groupNode.invalidateLayout();
//       groupNode.computeBounds();
//     }
//   });
//   myDiagram.initialScale = 1.0;

//  // Load diagram state from localStorage
//   const savedModel = localStorage.getItem("myDiagramModel");
//   if (savedModel) {
//     myDiagram.model = go.Model.fromJson(savedModel);
//   }

//   // Save diagram state to localStorage whenever the model changes
//   myDiagram.addModelChangedListener(() => {
//     localStorage.setItem("myDiagramModel", myDiagram.model.toJson());
//   });

//   return myDiagram;
// }

// function Home() {
//   const diagramRef = useRef(null);

//   const setDiagramRef = (diagram) => {
//     diagramRef.current = diagram;
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     const diagram = diagramRef.current;
//     if (diagram) {
//       const basePanelData = diagram.model.nodeDataArray.find(node => node.category === "InsideTemplate");
//       if (!basePanelData) {
//         const pt = diagram.documentBounds.center;
//         const initialBasePanelData = { key: 4, category: "InsideTemplate", isGroup: true, text: "Base Frame", loc: go.Point.stringify(pt) };
//         diagram.model.addNodeData(initialBasePanelData);
//       }

//       // diagram.nodes.each(node => {
//       //   if (node.data && node.data.category !== "InsideTemplate") {
//       //     addDimensionLinks(node);
//       //   }
//       // });
//     }
//   }, []);
//   useEffect(() => {
//     // Prompt confirmation when reload page is triggered
//     window.onbeforeunload = () => { return "" };
        
//     // Unmount the window.onbeforeunload event
//     return () => { window.onbeforeunload = null };
// }, []);
//   return (
//     <div style={{ display: "flex" }}>
//       <Palette diagram={diagramRef.current} />
//       <div style={{ width: "80vw", height: "97.6vh", backgroundColor: "lightgray", border: "1px solid black" }}>
//         <ReactDiagram
//           initDiagram={()=>initDiagram(handleClickOpen )}
//           divClassName="diagram-component"
//           style={{ width: "100%", height: "100%", backgroundColor: "white" }}
//           onDiagramEvent={setDiagramRef}
//         />
//         <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//       </div>
//     </div>
//   );
// }

// export default Home;


//Home.jsx
import React, { useRef, useEffect } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import Palette from "./Palette";
import DimensioningLink from "./dimensioning";
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
function initDiagram(handleClickOpen) {
  const $ = go.GraphObject.make;

  const resizeHandleSize = 20;


  const resizeHandleTemplate = $(
    go.Shape, 
    "Square", 
    {
      desiredSize: new go.Size(resizeHandleSize, resizeHandleSize),
      fill: "lightblue",
      cursor: "se-resize"
    }
  );

  const myDiagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
    layout: $(go.Layout),
    grid: $(go.Panel, 'Grid',
      $(go.Shape, 'LineH', { stroke: 'grey', strokeWidth: 0.5 }),
      $(go.Shape, 'LineV', { stroke: 'grey', strokeWidth: 0.5 })
    ),
    'grid.visible': true,
    'grid.gridCellSize': new go.Size(60, 60),
    'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
    'draggingTool.isGridSnapEnabled': true,
    'resizingTool.isGridSnapEnabled': true,
    'resizingTool.handleArchetype': resizeHandleTemplate // Set the resize handle template
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
        portId: "",
        cursor: "pointer",
      },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
      $(go.Panel, "Table",
        $(go.TextBlock, text,
          { row: 0, column: 0, margin: 5, editable: true, font: "bold 30px sans-serif" },
          new go.Binding("text", "text").makeTwoWay()),
        $(go.TextBlock, 
          { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
          new go.Binding("text", "size", function(size) {
            return `W: ${size.width.toFixed(1)} x H: ${size.height.toFixed(1)}`;
          })),
      ),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
    );
  }

  // Define the new node template for a vertical line
  function createVerticalLineTemplate() {
    return $(
      go.Node, "Spot",
      { resizable: true,
         resizeObjectName: "SHAPE",
          groupable: true,
          // {
            doubleClick: function(e, node) {
              handleClickOpen(); 
            }
         },
      $(go.Shape, "LineV", {
        name: "SHAPE",
        // fill: "blue",
        strokeWidth: 15,
        stroke: "red",
        desiredSize: new go.Size(0, 400), // Adjust size as needed
        // portId: "",
        // cursor: "pointer",
      },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
      // $(go.Panel, "Table",
      //   $(go.TextBlock, "",
      //     { row: 0, column: 0, margin: 0, editable: true, font: "bold 10px sans-serif" },
      //     new go.Binding("text", "text").makeTwoWay()),
        // $(go.TextBlock, 
        //   { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
        //   new go.Binding("text", "size", function(size) {
        //     return `W: ${size.width.toFixed(0)} x H: ${size.height.toFixed(0)}`;
        //   })),
      // ),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
    );
  }
  // Define the new node template for a bold horizontal line
  function createHorizontalLineTemplate() {
    return $(
      go.Node, "Auto",
      { resizable: true, resizeObjectName: "SHAPE" },
      $(go.Shape, "LineH", {
        name: "SHAPE",
        fill: "transparent",
        strokeWidth: 15,
        stroke: "blue",
        desiredSize: new go.Size(400, 0), // Adjust size as needed
        // portId: "",
        // cursor: "pointer",
      },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
      // $(go.Panel, "Table",
      //   $(go.TextBlock, "",
      //     { row: 0, column: 0, margin: 5, editable: true, font: "bold 10px sans-serif" },
      //     new go.Binding("text", "text").makeTwoWay()),
      //   $(go.TextBlock, 
      //     { row: 1, column: 0, margin: 2, font: "10px sans-serif" },
      //     new go.Binding("text", "size", function(size) {
      //       return `W: ${size.width.toFixed(1)} x H: ${size.height.toFixed(1)}`;
      //     })),
      // ),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
    );
  }

  myDiagram.nodeTemplateMap.add("Rectangle", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle2", createNodeTemplate("Rectangle", "SlateBlue", "Cover", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle3", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,180)) );
  myDiagram.nodeTemplateMap.add("Rectangle4", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle5", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle6", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle7", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle8", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  myDiagram.nodeTemplateMap.add("Rectangle9", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300,200)) );
  
  myDiagram.nodeTemplateMap.add("VerticalLine", createVerticalLineTemplate());
  myDiagram.nodeTemplateMap.add("HorizontalLine", createHorizontalLineTemplate());


  myDiagram.groupTemplate =
    $(go.Group, "Vertical", {
      resizable: true,
      resizeObjectName: "PANEL",
      computesBoundsAfterDrag: true,
      computesBoundsIncludingLocation: true,
    },
    $(go.Panel, "Auto", { name: "PANEL" },
      $(go.Shape, "Rectangle", {
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
        parameter1: 14, 
        minSize: new go.Size(1200,1200),
         alignment: go.Spot.Center
      }),
      $(go.TextBlock, "Base Frame", {
        background: 'black',
        stroke: 'white',
        stretch: go.Stretch.Horizontal,
        textAlign: 'center',
        alignment: go.Spot.Bottom,
        verticalAlignment: go.Spot.Center,
        minSize: new go.Size(1200,60),
        font: 'bold 40px sans-serif'
      },
      
      new go.Binding("text", "text").makeTwoWay()
    ),
    $(go.Shape, "Circle", 
      { 
        desiredSize: new go.Size(30,30),
        fill: "white", 
        margin: new go.Margin(0, 10, 15, 15),
        alignment:  go.Spot.BottomLeft,
        
      }
    ),
    $(go.Shape, "Circle", 
      { 
        desiredSize: new go.Size(30,30),
        fill: "white", 
        margin: new go.Margin(0, 10, 15, 15),
        alignment: go.Spot.BottomRight,
        
      }
    
    ),)
  );
  
  

  myDiagram.linkTemplateMap.add(
    'Dimensioning',
    $(DimensioningLink,
      new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
      new go.Binding('toSpot', 'toSpot', go.Spot.parse),
      new go.Binding('direction'),
      new go.Binding('extension'),
      new go.Binding('inset'),
      // Make the connecting link line invisible
      $(go.Shape, { stroke: 'gray', strokeWidth:5 }, new go.Binding('stroke', 'color')),
      $(go.Shape, { fromArrow: 'BackwardOpenTriangle', segmentIndex: 2, stroke: 'gray',scale:3.0, }, new go.Binding('stroke', 'color')),
      $(go.Shape, { toArrow: 'OpenTriangle', segmentIndex: -3, stroke: 'gray', scale: 3.0 }, new go.Binding('stroke', 'color')),
      $(go.TextBlock,
        {
          segmentFraction: 0.5,
          segmentOrientation: go.Orientation.Upright,
          alignmentFocus: go.Spot.Top,
          stroke: 'gray',
          scale:3.0,
          font: '8pt sans-serif',
        },
        new go.Binding('text', '', showDistance).ofObject(),
        new go.Binding('stroke', 'color')
      )
    )
  );

  function showDistance(link) {
    const numpts = link.pointsCount;
    if (numpts < 2) return '';
    const linkData = link.data;
  if (linkData.category === 'HorizontalLine' || linkData.category === 'VerticalLine') {
    return '';
  }
    const p0 = link.getPoint(0); 
    const pn = link.getPoint(numpts - 1);
    const ang = link.direction;
    if (isNaN(ang)) return Math.floor(Math.sqrt(p0.distanceSquaredPoint(pn))) + '';
    const rad = (ang * Math.PI) / 180;
    return Math.floor(Math.abs(Math.cos(rad) * (p0.x - pn.x)) + Math.abs(Math.sin(rad) * (p0.y - pn.y))-1) + '';
  }

  function addDimensionLinks(node) {
    const nodeData = node.data;
    if (!nodeData || !nodeData.key) return;

// Exclude horizontal and vertical lines from having dimensions
if (nodeData.category === "HorizontalLine" || nodeData.category === "VerticalLine") {
  return;
}

    const key = nodeData.key;
    const baseFrame = myDiagram.findNodeForKey(4);
    const nodeBounds = node.actualBounds;
    const baseFrameBounds = baseFrame.actualBounds;
  
    const dimensionLinks = [];
  
    if (nodeBounds.top <= baseFrameBounds.top + 10) {
      // Add dimensioning link above the node
      dimensionLinks.push({
        from: key,
        to: key,
        category: 'Dimensioning',
        fromSpot: 'TopLeft',
        toSpot: 'TopRight',
        direction: 0,
      });
    }
  
    if (nodeBounds.bottom >= baseFrameBounds.bottom - 10) {
      // Add dimensioning link below the node
      dimensionLinks.push({
        from: key,
        to: key,
        category: 'Dimensioning',
        fromSpot: 'BottomLeft',
        toSpot: 'BottomRight',
        direction: 180,
      });
    }
  
    if (nodeBounds.left <= baseFrameBounds.left + 10) {
      // Add dimensioning link to the left of the node
      dimensionLinks.push({
        from: key,
        to: key,
        category: 'Dimensioning',
        fromSpot: 'TopLeft',
        toSpot: 'BottomLeft',
        direction: 90,
        inset: nodeBounds.width * 0.8, 
      });
    }
    
    if (nodeBounds.right >= baseFrameBounds.right - 10) {
      // Add dimensioning link to the right of the node
      dimensionLinks.push({
        from: key,
        to: key,
        category: 'Dimensioning',
        fromSpot: 'TopRight',
        toSpot: 'BottomRight',
        direction: 270,
        inset: nodeBounds.width * 0.8,
      });
    }
  
    myDiagram.model.addLinkDataCollection(dimensionLinks);
  }
  

  let baseFrameAdded = false;

// Mouse Drag Over Event Handler
myDiagram.mouseDragOver = (e) => {
  const target = e.diagram.findPartAt(e.documentPoint);
  const draggedPart = e.diagram.selection.first();
  if (draggedPart && draggedPart.category === 'InsideTemplate') {
    // Allow dropping a Base Frame node anywhere
    return;
  } else if (!(target instanceof go.Group) || target.category !== 'InsideTemplate') {
    e.diagram.currentCursor = 'not-allowed';
  } else {
    e.diagram.currentCursor = '';
  }
};

// Mouse Drop Event Handler
myDiagram.mouseDrop = (e) => {
  const target = e.diagram.findPartAt(e.documentPoint);
  const draggedPart = e.diagram.selection.first();

  if (draggedPart && draggedPart.category === 'InsideTemplate') {
    if (baseFrameAdded) {
      // Allow dragging/moving the Base Frame
      if (target instanceof go.Group && target.category === 'InsideTemplate') {
        return;
      }

      e.diagram.currentTool.doCancel();
      toast('Only one Base Frame can be added to the diagram', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      baseFrameAdded = true; // Set the flag to true once Base Frame is added
      // Allow moving the Base Frame
      return;
    }
  } else if (!(target instanceof go.Group) || target.category !== 'InsideTemplate') {
    e.diagram.currentTool.doCancel();
    toast('You cannot place shapes outside the Base Frame', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
myDiagram.addDiagramListener("PartResized", (e) => {
  const part = e.subject.part;
  const baseFrame = myDiagram.findNodeForKey(4);
  if (part instanceof go.Node && part.data.category!== "InsideTemplate" && baseFrame) {
    const partBounds = part.actualBounds;
    const baseFrameBounds = baseFrame.actualBounds;
    if (partBounds.x < baseFrameBounds.x || partBounds.x + partBounds.width > baseFrameBounds.x + baseFrameBounds.width ||
      partBounds.y < baseFrameBounds.y || partBounds.y + partBounds.height > baseFrameBounds.y + baseFrameBounds.height) {
      e.diagram.currentTool.doCancel();
    }
  }
});

myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {
  const newnode = e.diagram.selection.first();
  if (newnode instanceof go.Node && newnode.data.category === "InsideTemplate") {
    const baseFrame = myDiagram.findNodeForKey(4);
    if (baseFrame) {
      // Base frame already exists, show toast notification
      toast('Only one Base Frame can be added to the diagram', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Base frame already exists, remove the new node
      myDiagram.remove(newnode);
    } else {
      // Add the new base frame
      const pt = e.diagram.lastInput.documentPoint;
      const basePanelData = { key: 4, category: "InsideTemplate", isGroup: true, text: "Base Frame", loc: go.Point.stringify(pt) };
      myDiagram.startTransaction("add base panel");
      myDiagram.model.addNodeData(basePanelData);
      myDiagram.commitTransaction("add base panel");
      // Remove the dragged node as it's now part of the base frame
      myDiagram.remove(newnode);
    }
  } else if (newnode instanceof go.Node && newnode.data.category !== "InsideTemplate") {
    const baseFrame = myDiagram.findNodeForKey(4);
    if (!baseFrame) {
      // Show notification if no base frame exists
      toast('Add a Base Frame first before adding other shapes', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Remove the new node since no base frame exists
      myDiagram.remove(newnode);
    } else if (baseFrame.actualBounds.containsPoint(newnode.location)) {
      // Add the new node to the base frame group
      myDiagram.model.setDataProperty(newnode.data, "group", baseFrame.key);
      addDimensionLinks(newnode);
    }
  }
});

  myDiagram.addDiagramListener("ClipboardPasted", function(e) {
    const pastedParts = e.subject.iterator;
    let offsetY = 0;
    const copiedNode = e.diagram.selection.first();
    while (pastedParts.next()) {
      const part = pastedParts.value;
      if (part instanceof go.Node && part.data.category!== "InsideTemplate") {
        const group = myDiagram.findNodeForKey(4);
        if (group instanceof go.Group && group.actualBounds.containsPoint(part.location)) {
          myDiagram.model.setDataProperty(part.data, "group", group.key);
          const loc = new go.Point(copiedNode.location.x, copiedNode.location.y + copiedNode.actualBounds.height + offsetY);
          part.move(loc);
          addDimensionLinks(part);
        }
      }
    }
    const groupNode = myDiagram.findNodeForKey(4);
    if (groupNode instanceof go.Group) {
      groupNode.invalidateLayout();
      groupNode.computeBounds();
    }
  });
  myDiagram.initialScale = 0.3;

//  // Load diagram state from localStorage
//   const savedModel = localStorage.getItem("myDiagramModel");
//   if (savedModel) {
//     myDiagram.model = go.Model.fromJson(savedModel);
//   }

//   // Save diagram state to localStorage whenever the model changes
//   myDiagram.addModelChangedListener(() => {
//     localStorage.setItem("myDiagramModel", myDiagram.model.toJson());
//   });


  return myDiagram;
}

function Home() {
  const diagramRef = useRef(null);

  const setDiagramRef = (diagram) => {
    diagramRef.current = diagram;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const diagram = diagramRef.current;
    if (diagram) {
      const basePanelData = diagram.model.nodeDataArray.find(node => node.category === "InsideTemplate");
      if (!basePanelData) {
        const pt = diagram.documentBounds.center;
        const initialBasePanelData = { key: 4, category: "InsideTemplate", isGroup: true, text: "Base Frame", loc: go.Point.stringify(pt) };
        diagram.model.addNodeData(initialBasePanelData);
      }

      // diagram.nodes.each(node => {
      //   if (node.data && node.data.category !== "InsideTemplate") {
      //     addDimensionLinks(node);
      //   }
      // });
    }
  }, []);
  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => { return "" };
        
    // Unmount the window.onbeforeunload event
    return () => { window.onbeforeunload = null };
}, []);

  return (
    <div style={{ display: "flex" }}>
      <Palette diagram={diagramRef.current} />
      <div style={{ width: "80vw", height: "97.6vh", backgroundColor: "lightgray", border: "1px solid black" }}>
        <ReactDiagram
          initDiagram={()=>initDiagram(handleClickOpen )}
          divClassName="diagram-component"
          style={{ width: "100%", height: "100%", backgroundColor: "white" }}
          onDiagramEvent={setDiagramRef}
        />
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}

export default Home