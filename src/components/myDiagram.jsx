// myDiagram.jsx
import * as go from 'gojs';
import DimensioningLink from './dimensioning';
import { INSERT_PROJECT } from '../apolloClient/querys';
import { useMutation } from '@apollo/client';

export function initDiagram($, myDiagram, toast, handleClickOpen, insertProject) {

  // console.log("sdfkjsadfbasdbfasdf", proinfo)

  myDiagram.addDiagramListener("Modified", () => {
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substring(0, idx);
    }
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
          new go.Binding("text", "size", function (size) {
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
      {
        resizable: true,
        resizeObjectName: "SHAPE",
        groupable: true,
        // {
        doubleClick: function (e, node) {
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

  myDiagram.nodeTemplateMap.add("Rectangle", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle2", createNodeTemplate("Rectangle", "SlateBlue", "Cover", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle3", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 180)));
  myDiagram.nodeTemplateMap.add("Rectangle4", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle5", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle6", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle7", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle8", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));
  myDiagram.nodeTemplateMap.add("Rectangle9", createNodeTemplate("Rectangle", "SlateBlue", "Rectangle", new go.Size(300, 200)));

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
          minSize: new go.Size(1200, 1200),
          alignment: go.Spot.Center
        }),
        $(go.TextBlock, "Base Frame", {
          background: 'black',
          stroke: 'white',
          stretch: go.Stretch.Horizontal,
          textAlign: 'center',
          alignment: go.Spot.Bottom,
          verticalAlignment: go.Spot.Center,
          minSize: new go.Size(1200, 60),
          font: 'bold 40px sans-serif'
        },

          new go.Binding("text", "text").makeTwoWay()
        ),
        $(go.Shape, "Circle",
          {
            desiredSize: new go.Size(30, 30),
            fill: "white",
            margin: new go.Margin(0, 10, 15, 15),
            alignment: go.Spot.BottomLeft,

          }
        ),
        $(go.Shape, "Circle",
          {
            desiredSize: new go.Size(30, 30),
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
      
      $(go.Shape, { stroke: 'gray', strokeWidth: 5 }, new go.Binding('stroke', 'color')),
      $(go.Shape, { fromArrow: 'BackwardOpenTriangle', segmentIndex: 2, stroke: 'gray', scale: 3.0, }, new go.Binding('stroke', 'color')),
      $(go.Shape, { toArrow: 'OpenTriangle', segmentIndex: -3, stroke: 'gray', scale: 3.0 }, new go.Binding('stroke', 'color')),
      $(go.TextBlock,
        {
          segmentFraction: 0.5,
          segmentOrientation: go.Orientation.Upright,
          alignmentFocus: go.Spot.Top,
          stroke: 'gray',
          scale: 3.0,
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
    return Math.floor(Math.abs(Math.cos(rad) * (p0.x - pn.x)) + Math.abs(Math.sin(rad) * (p0.y - pn.y)) - 1) + '';
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
    const baseFrame = myDiagram.findNodeForKey(4);

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
    }
    else  if (!baseFrame) {
      // Show notification if no base frame exists
      e.diagram.currentTool.doCancel();

      toast('Add a Base Frame first before adding other shapes', {
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
     else if (!(target instanceof go.Group) || target.category !== 'InsideTemplate') {
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
    if (part instanceof go.Node && part?.data.category !== "InsideTemplate" && baseFrame) {
      const partBounds = part.actualBounds;
      const baseFrameBounds = baseFrame.actualBounds;
      if (partBounds.x < baseFrameBounds.x || partBounds.x + partBounds.width > baseFrameBounds.x + baseFrameBounds.width ||
        partBounds.y < baseFrameBounds.y || partBounds.y + partBounds.height > baseFrameBounds.y + baseFrameBounds.height-60) {
        e.diagram.currentTool.doCancel();
      }
    }
  });

  const handleShapeInsert = (shape, nodeShape) =>{
    const baseFrameInfo = nodeShape[0]
    console.log("sdfsdfsdfsdfsdfwef", shape, nodeShape)
  }

  myDiagram.addDiagramListener("ExternalObjectsDropped", async function (e) {
    const newnode = e.diagram.selection.first();
    console.log("eee",newnode?.data, myDiagram.model.nodeDataArray);
    handleShapeInsert(newnode?.data, myDiagram.model.nodeDataArray)
    if (newnode instanceof go.Node && newnode.data.category === "InsideTemplate") {
      const baseFrame = myDiagram.findNodeForKey(4);
      if (baseFrame ) {
        // Base frame already exists, show toast notification
        toast('You cannot create a Base Frame inside a Base Frame ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
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
       // Remove the new node since no base frame exists
       myDiagram.remove(newnode);
       
      } else if (baseFrame.actualBounds.containsPoint(newnode.location)) {
        // Add the new node to the base frame group
        myDiagram.model.setDataProperty(newnode.data, "group", baseFrame.key);
        addDimensionLinks(newnode);
      }
    }
  });

  myDiagram.addDiagramListener("ClipboardPasted", function (e) {
    const pastedParts = e.subject.iterator;
    let offsetY = 0;
    const copiedNode = e.diagram.selection.first();
    while (pastedParts.next()) {
      const part = pastedParts.value;
      if (part instanceof go.Node && part.data.category !== "InsideTemplate") {
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