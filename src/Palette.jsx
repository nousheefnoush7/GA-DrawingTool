// import React from "react";
// import { ReactPalette } from "gojs-react";
// import * as go from "gojs";

// function initPalette() {
//   const $ = go.GraphObject.make;

//   const myPalette = $(go.Palette, {
//     layout: $(go.GridLayout, { wrappingColumn: 1, alignment: go.GridAlignment.Position })
//   });

//   // Define node templates for the palette with rounded rectangle background panels
//   myPalette.nodeTemplateMap.add("Circle",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
//         $(go.TextBlock, "Circle", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left}),
//         $(go.Shape, "Circle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right }) // Circle shape
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Square",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
//         $(go.TextBlock, "Square", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left} ),
//         $(go.Shape, "Square", { width: 30, height: 30, fill: "transparent",margin: new go.Margin(14, 10, 0, 0),  alignment: go.Spot.TopRight }) // Square shape
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Triangle",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
//         $(go.TextBlock, "Triangle", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left} ),
//         $(go.Shape, "Triangle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right }) // Triangle shape
//       )
//     )
//   );

//   // Define the insideTemplate for the palette
//   myPalette.nodeTemplateMap.add("InsideTemplate",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
//         $(go.TextBlock, "Base panel frame", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left}),
//         $(go.Panel, "Spot",
//           { width: 30, height: 30, margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right },
//           $(go.Shape, "Rectangle", { fill: "transparent", width: 28, height: 25 }),
//           $(go.Shape, "Circle", { fill: "black", width: 5, height: 5, alignment: new go.Spot(0.1, 1), stroke: "white" }),
//           $(go.Shape, "Circle", { fill: "black", width: 5, height: 5, alignment: new go.Spot(0.9, 1), stroke: "white" })
//         )
//       )
//     )
//   );

//   // Add these nodes to the palette with correct categories
//   myPalette.model = new go.GraphLinksModel([
//     { category: "Circle", key: "circle" },
//     { category: "Square", key: "square" },
//     { category: "Triangle", key: "triangle" },
//     { category: "InsideTemplate", key: "insideTemplate" } // Add InsideTemplate to the model
//   ]);

//   return myPalette;
// }

// function Palette() {
//   return (
//     <div style={{ width: "20vw", height: "97.6vh", backgroundColor: "yellow", border: "1px solid black" }}>
//       <ReactPalette
//         initPalette={initPalette}
//         divClassName="palette-component"
//         style={{ width: "100%", height: "100%", overflowY: "auto" }}
//       />
//     </div>
//   );
// }

// export default Palette;

import React from "react";
import { ReactPalette } from "gojs-react";
import * as go from "gojs";

function initPalette() {
  const $ = go.GraphObject.make;

  const myPalette = $(go.Palette, {
    layout: $(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Position })
  });

  // Define node templates for the palette with rounded rectangle background panels
  myPalette.nodeTemplateMap.add("Circle",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Circle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Shape, "Circle", { width: 30, height: 30, fill: "lightblue", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
      )
    )
  );

  myPalette.nodeTemplateMap.add("Square",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Square", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Shape, "Square", { width: 30, height: 30, fill: "lightgreen", margin: new go.Margin(14, 10, 0, 0), alignment: go.Spot.TopRight })
      )
    )
  );

  myPalette.nodeTemplateMap.add("Triangle",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Triangle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Shape, "Triangle", { width: 30, height: 30, fill: "lightcoral", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
      )
    )
  );

  myPalette.nodeTemplateMap.add("Diamond",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Diamond", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Shape, "Diamond", { width: 30, height: 30, fill: "red", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
      )
    )
  );
  // Define the insideTemplate for the palette
  myPalette.nodeTemplateMap.add("InsideTemplate",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Inside Template", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Panel, "Spot",{ width: 30, height: 30, margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right },
          $(go.Shape, "Rectangle", { fill: "white", width: 30, height: 30 }),
          $(go.Shape, "Circle", { fill: "black", width: 10, height: 10, alignment: new go.Spot(0.1, 1), stroke: "white" }),
          $(go.Shape, "Circle", { fill: "black", width: 10, height: 10, alignment: new go.Spot(0.9, 1), stroke: "white" })
        )
      )
    )
  );

  // Add these nodes to the palette with correct categories
  myPalette.model = new go.GraphLinksModel([
    { category: "Circle", key: "circle" },
    { category: "Square", key: "square" },
    { category: "Triangle", key: "triangle" },
    { category: "Diamond", key: "Diamond" },
    { category: "InsideTemplate", key: "insideTemplate" }
  ]);

  return myPalette;
}

function Palette() {
  return (
    <div style={{ width: "20vw", height: "97.6vh", backgroundColor: "orange", border: "1px solid black" }}>
      <ReactPalette
        initPalette={initPalette}
        divClassName="palette-component"
        style={{ width: "100%", height: "100%", overflowY: "auto" }}
      />
    </div>
  );
}

export default Palette;
