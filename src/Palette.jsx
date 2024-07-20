// // import React from "react";
// // import { ReactPalette } from "gojs-react";
// // import * as go from "gojs";

// // function initPalette() {
// //   const $ = go.GraphObject.make;

// //   const myPalette = $(go.Palette, {
// //     layout: $(go.GridLayout, { wrappingColumn: 1, alignment: go.GridAlignment.Position })
// //   });

// //   // Define node templates for the palette with rounded rectangle background panels
// //   myPalette.nodeTemplateMap.add("Circle",
// //     $(go.Node, "Vertical",
// //       $(go.Panel, "Auto",
// //         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
// //         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
// //         $(go.TextBlock, "Circle", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left}),
// //         $(go.Shape, "Circle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right }) // Circle shape
// //       )
// //     )
// //   );

// //   myPalette.nodeTemplateMap.add("Square",
// //     $(go.Node, "Vertical",
// //       $(go.Panel, "Auto",
// //         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
// //         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
// //         $(go.TextBlock, "Square", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left} ),
// //         $(go.Shape, "Square", { width: 30, height: 30, fill: "transparent",margin: new go.Margin(14, 10, 0, 0),  alignment: go.Spot.TopRight }) // Square shape
// //       )
// //     )
// //   );

// //   myPalette.nodeTemplateMap.add("Triangle",
// //     $(go.Node, "Vertical",
// //       $(go.Panel, "Auto",
// //         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
// //         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
// //         $(go.TextBlock, "Triangle", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left} ),
// //         $(go.Shape, "Triangle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right }) // Triangle shape
// //       )
// //     )
// //   );

// //   // Define the insideTemplate for the palette
// //   myPalette.nodeTemplateMap.add("InsideTemplate",
// //     $(go.Node, "Vertical",
// //       $(go.Panel, "Auto",
// //         { width: 320, height: 60, margin: new go.Margin(2) }, // Set width and height of the panel
// //         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }), // Rounded rectangle background
// //         $(go.TextBlock, "Base panel frame", {margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left}),
// //         $(go.Panel, "Spot",
// //           { width: 30, height: 30, margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right },
// //           $(go.Shape, "Rectangle", { fill: "transparent", width: 28, height: 25 }),
// //           $(go.Shape, "Circle", { fill: "black", width: 5, height: 5, alignment: new go.Spot(0.1, 1), stroke: "white" }),
// //           $(go.Shape, "Circle", { fill: "black", width: 5, height: 5, alignment: new go.Spot(0.9, 1), stroke: "white" })
// //         )
// //       )
// //     )
// //   );

// //   // Add these nodes to the palette with correct categories
// //   myPalette.model = new go.GraphLinksModel([
// //     { category: "Circle", key: "circle" },
// //     { category: "Square", key: "square" },
// //     { category: "Triangle", key: "triangle" },
// //     { category: "InsideTemplate", key: "insideTemplate" } // Add InsideTemplate to the model
// //   ]);

// //   return myPalette;
// // }

// // function Palette() {
// //   return (
// //     <div style={{ width: "20vw", height: "97.6vh", backgroundColor: "yellow", border: "1px solid black" }}>
// //       <ReactPalette
// //         initPalette={initPalette}
// //         divClassName="palette-component"
// //         style={{ width: "100%", height: "100%", overflowY: "auto" }}
// //       />
// //     </div>
// //   );
// // }

// // export default Palette;

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
//         { width: 320, height: 60, margin: new go.Margin(2) },
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
//         $(go.TextBlock, "Circle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
//         $(go.Shape, "Circle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Square",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) },
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
//         $(go.TextBlock, "Square", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
//         $(go.Shape, "Square", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(14, 10, 0, 0), alignment: go.Spot.TopRight })
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Rectangle",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) },
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
//         $(go.TextBlock, "Rectangle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
//         $(go.Shape, "Rectangle", { width: 60, height: 30, fill: "transparent", margin: new go.Margin(14, 10, 0, 0), alignment: go.Spot.TopRight })
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Triangle",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) },
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
//         $(go.TextBlock, "Triangle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
//         $(go.Shape, "Triangle", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
//       )
//     )
//   );

//   myPalette.nodeTemplateMap.add("Diamond",
//     $(go.Node, "Vertical",
//       $(go.Panel, "Auto",
//         { width: 320, height: 60, margin: new go.Margin(2) },
//         $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
//         $(go.TextBlock, "Diamond", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
//         $(go.Shape, "Diamond", { width: 30, height: 30, fill: "transparent", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
//       )
//     )
//   );
  // // Define the insideTemplate for the palette
  // myPalette.nodeTemplateMap.add("InsideTemplate",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Inside Template", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Panel, "Spot",{ width: 35, height: 35, margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right },
  //         $(go.Shape, "Rectangle", { fill: "white", width: 25, height: 25 }),
  //         $(go.Shape, "Circle", { fill: "black", width: 8, height: 8, alignment: new go.Spot(0.1, 1), stroke: "white" }),
  //         $(go.Shape, "Circle", { fill: "black", width: 8, height: 8, alignment: new go.Spot(0.9, 1), stroke: "white" })
  //       )
  //     )
  //   )
  // );

//   // Add these nodes to the palette with correct categories
//   myPalette.model = new go.GraphLinksModel([
//     { category: "Circle", key: "circle" },
//     { category: "Square", key: "square" },
//     { category: "Rectangle", key: "Rectangle" },
//     { category: "Triangle", key: "triangle" },
//     { category: "Diamond", key: "Diamond" },
//     { category: "InsideTemplate", key: "insideTemplate" }
//   ]);

//   return myPalette;
// }

// function Palette() {
//   return (
//     <div style={{ width: "20vw", height: "97.6vh", backgroundColor: "orange", border: "1px solid black" }}>
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
 myPalette.nodeTemplateMap.add("Rectangle",
  $(go.Node, "Vertical",
    $(go.Panel, "Auto",
      { width: 320, height: 60, margin: new go.Margin(2) },
      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
      $(go.TextBlock, "Door", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
      $(go.Shape, "Rectangle", 
        { 
          width: 30, 
          height: 45, 
          fill: "Transparent", 
          stroke: "black", 
          strokeWidth: 1, 
          margin: new go.Margin(0, 10, 0, 0), 
          alignment: go.Spot.Right 
        },
        new go.Binding("stroke", "color")
      ),
      $(go.Shape, "Rectangle", 
          { 
            width: 40, // Increased width to extend the line equally to the left and right
            height: 3, 
            fill: "black", 
            margin: new go.Margin(50, 0, 5, 267), // Adjusted margin to center the line
            // alignment: go.Spot.Right 
          }
      ),
      $(go.Shape, "Rectangle", 
        { 
          width: 3, 
          height: 5, 
          fill: "black", 
          margin: new go.Margin(0, 30, 0, 0), 
          alignment: go.Spot.Right 
        }
      )
    )
  )
);


myPalette.nodeTemplateMap.add("Rectangle2",
  $(go.Node, "Vertical",
    $(go.Panel, "Auto",
      { width: 320, height: 60, margin: new go.Margin(2) },
      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
      $(go.TextBlock, "Cover", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 30, 
          height: 45, 
          fill: "Transparent", 
          stroke: "black", 
          strokeWidth: 1, 
          margin: new go.Margin(0, 10, 0, 280) 
        },
        new go.Binding("stroke", "color")
      ),

      // Top-left corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(2, 2, 32, 255) 
        }
      ),
      // Top-right corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(23, 2, 53, 290) 
        }
      ),
      // Bottom-left corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(30, 38, 0, 290) 
        }
      ),
      // Bottom-right corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(30, 38, 0, 325) 
        }
      )
    )
  )
); 

myPalette.nodeTemplateMap.add("Rectangle3",
  $(go.Node, "Vertical",
    $(go.Panel, "Auto",
      { width: 320, height: 60, margin: new go.Margin(2) },
      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
      $(go.TextBlock, "Cover With Louver", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 30, 
          height: 45, 
          fill: "Transparent", 
          stroke: "black", 
          strokeWidth: 1, 
          margin: new go.Margin(0, 10, 0, 280) 
        },
        new go.Binding("stroke", "color")
      ),

      
      $(go.Shape, "Rectangle", 
        { 
          width: 20, // Increased width to extend the line equally to the left and right
          height: 3, 
          fill: "white", 
          margin: new go.Margin(0, 0, 15, 270), // Adjusted margin to center the line
          
        }
    ),
      $(go.Shape, "Rectangle", 
        { 
          width: 20, // Increased width to extend the line equally to the left and right
          height: 3, 
          fill: "white", 
          margin: new go.Margin(0, 0, 9, 270), // Adjusted margin to center the line
          
        }
    ),

    $(go.Shape, "Rectangle", 
      { 
        width: 20, // Increased width to extend the line equally to the left and right
        height: 3, 
        fill: "white", 
        margin: new go.Margin(0, 0, 3, 270), // Adjusted margin to center the line
        
      }
  ),

    $(go.Shape, "Rectangle", 
      { 
        width: 20, // Increased width to extend the line equally to the left and right
        height: 3, 
        fill: "white", 
        margin: new go.Margin(3, 0, 0, 270), // Adjusted margin to center the line
        
      }
  ),

      // Top-left corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(2, 2, 32, 255) 
        }
      ),
      // Top-right corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(23, 2, 53, 290) 
        }
      ),
      // Bottom-left corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(30, 38, 0, 290) 
        }
      ),
      // Bottom-right corner of Rounded Rectangle
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 3, 
          height: 3, 
          fill: "black", 
          margin: new go.Margin(30, 38, 0, 325) 
        }
      )
    )
  )
);  

myPalette.nodeTemplateMap.add("Rectangle4",
  $(go.Node, "Vertical",
    $(go.Panel, "Auto",
      { width: 320, height: 60, margin: new go.Margin(2) },
      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
      $(go.TextBlock, "Busbar Chamber", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
      $(go.Shape, "RoundedRectangle", 
        { 
          width: 30, 
          height: 45, 
          fill: "Transparent", 
          stroke: "black", 
          strokeWidth: 1, 
          margin: new go.Margin(0, 10, 0, 0), 
          alignment: go.Spot.Right 
        },
        new go.Binding("stroke", "color")
      ),
      $(go.Shape, "Rectangle", 
          { 
            width: 19, // Increased width to extend the line equally to the left and right
            height: 1, 
            fill: "black", 
            margin: new go.Margin(0, 0, 32, 269), // Adjusted margin to center the line
            
          }
      ),
      $(go.Shape, "Rectangle", 
        { 
          width: 1, // Increased width to extend the line equally to the left and right
          height: 29, 
          fill: "black", 
          margin: new go.Margin(0, 20, 4, 277), // Adjusted margin to center the line
          
        }
    ),
    $(go.TextBlock, "B", // Add a TextBlock for the letter "B"
      {
        font: "bold 16pt Arial",
        stroke: "black",
        margin: new go.Margin(0, 0, 8, 277),  // Adjust margin to position the "B" inside the rectangle
        alignment: go.Spot.Center
      }
    )
    )))

    myPalette.nodeTemplateMap.add("Rectangle5",
      $(go.Node, "Vertical",
        $(go.Panel, "Auto",
          { width: 320, height: 60, margin: new go.Margin(2) },
          $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
          $(go.TextBlock, "Cable Chamber", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
          $(go.Shape, "RoundedRectangle", 
            { 
              width: 30, 
              height: 45, 
              fill: "Transparent", 
              stroke: "black", 
              strokeWidth: 1, 
              margin: new go.Margin(0, 10, 0, 0), 
              alignment: go.Spot.Right 
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, "Rectangle", 
              { 
                width: 19, // Increased width to extend the line equally to the left and right
                height: 1, 
                fill: "black", 
                margin: new go.Margin(0, 0, 32, 269), // Adjusted margin to center the line
                
              }
          ),
          $(go.Shape, "Rectangle", 
            { 
              width: 1, // Increased width to extend the line equally to the left and right
              height: 12, 
              fill: "black", 
              margin: new go.Margin(0, 20, 17, 277), // Adjusted margin to center the line
              
            }
        ),

        $(go.Shape, "Rectangle", 
          { 
            width: 1, // Increased width to extend the line equally to the left and right
            height: 15, 
            fill: "black", 
            margin: new go.Margin(20, 20, 0, 277), // Adjusted margin to center the line
            
          }
      ),
        $(go.TextBlock, "C", // Add a TextBlock for the letter "B"
          {
            font: "bold 16pt Arial",
            stroke: "black",
            margin: new go.Margin(0, 0, 8, 277),  // Adjust margin to position the "B" inside the rectangle
            alignment: go.Spot.Center
          }
        )
        )))


    
        myPalette.nodeTemplateMap.add("Rectangle6",
          $(go.Node, "Vertical",
            $(go.Panel, "Auto",
              { width: 320, height: 60, margin: new go.Margin(2) },
              $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
              $(go.TextBlock, "Withdrawable Unit", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
              $(go.Shape, "Rectangle", 
                { 
                  width: 40, 
                  height: 20, 
                  fill: "Transparent", 
                  stroke: "black", 
                  strokeWidth: 1, 
                  margin: new go.Margin(0, 10, 0, 0), 
                  alignment: go.Spot.Right 
                },
                new go.Binding("stroke", "color")
              ),
              $(go.Shape, "Rectangle", 
                { 
                  width: 1, // Increased width to extend the line equally to the left and right
                  height: 9, 
                  fill: "black", 
                  margin: new go.Margin(0, 0, 0, 290), // Adjusted margin to center the line
                  
                }
            ),
            $(go.Shape, "Rectangle", 
              { 
                width: 1, // Increased width to extend the line equally to the left and right
                height: 9, 
                fill: "black", 
                margin: new go.Margin(0, 0, 0, 228), // Adjusted margin to center the line
                
              }
          ),
          $(go.Shape, "Rectangle", 
              { 
                width: 1, // Increased width to extend the line equally to the left and right
                height: 9, 
                fill: "black", 
                margin: new go.Margin(0, 0, 0, 228), // Adjusted margin to center the line
                
              }
          ),
            )
          )
        );
        myPalette.nodeTemplateMap.add("VerticalLine",
          $(go.Node, "Vertical",
            $(go.Panel, "Auto",
              { width: 320, height: 60, margin: new go.Margin(2) },
              $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
              $(go.TextBlock, "Vertical Busbar", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
              $(go.Shape, "Rectangle", 
                { 
                  width: 1, 
                  height: 35, 
                  fill: "Black", 
                  stroke: "black", 
                  strokeWidth: 1, 
                  margin: new go.Margin(0, 35, 10, 0), 
                  alignment: go.Spot.Right 
                },
                new go.Binding("stroke", "color")
              ),
              $(go.Shape, "Rectangle", 
                { 
                  width: 1, 
                  height: 35, 
                  fill: "Black", 
                  stroke: "black", 
                  strokeWidth: 1, 
                  margin: new go.Margin(0, 30, 10, 0), 
                  alignment: go.Spot.Right 
                },
                new go.Binding("stroke", "color")
              ),
              $(go.Shape, "Rectangle", 
                { 
                  width: 0, 
                  height: 35, 
                  fill: "Transparent", 
                  stroke: "black", 
                  strokeWidth: 1, 
                  margin: new go.Margin(0, 25, 10, 0), 
                  alignment: go.Spot.Right 
                },
                new go.Binding("stroke", "color")
              ),
              $(go.Shape, "Rectangle", 
                { 
                  width: 1, 
                  height: 35, 
                  fill: "Black", 
                  stroke: "black", 
                  strokeWidth: 1, 
                  margin: new go.Margin(0, 20, 10, 0), 
                  alignment: go.Spot.Right 
                },
                new go.Binding("stroke", "color")
              ),
            )))


            myPalette.nodeTemplateMap.add("HorizontalLine",
              $(go.Node, "Vertical",
                $(go.Panel, "Auto",
                  { width: 320, height: 60, margin: new go.Margin(2) },
                  $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
                  $(go.TextBlock, "Compartment", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
                  $(go.Shape, "Square", 
                    { 
                      width: 40, 
                      height: 40, 
                      fill: "Transparent", 
                      stroke: "black", 
                      strokeWidth: 1, 
                      margin: new go.Margin(0, 2, 0, 0), 
                      alignment: go.Spot.Right 
                    },
                    new go.Binding("stroke", "color")
                  ),
                )))
  // myPalette.nodeTemplateMap.add("Circle",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Circle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Shape, "Circle", { width: 30, height: 30, fill: "lightblue", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
  //     )
  //   )
  // );

  // myPalette.nodeTemplateMap.add("Rectangle",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Rectangle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Shape, "Rectangle", { width: 45, height: 30, fill: "grey", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
  //     )
  //   )
  // );

  // myPalette.nodeTemplateMap.add("Square",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Square", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Shape, "Square", { width: 30, height: 30, fill: "lightgreen", margin: new go.Margin(14, 10, 0, 0), alignment: go.Spot.TopRight })
  //     )
  //   )
  // );

  // myPalette.nodeTemplateMap.add("Triangle",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Triangle", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Shape, "Triangle", { width: 30, height: 30, fill: "lightcoral", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
  //     )
  //   )
  // );

  // myPalette.nodeTemplateMap.add("Diamond",
  //   $(go.Node, "Vertical",
  //     $(go.Panel, "Auto",
  //       { width: 320, height: 60, margin: new go.Margin(2) },
  //       $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
  //       $(go.TextBlock, "Diamond", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
  //       $(go.Shape, "Diamond", { width: 30, height: 30, fill: "red", margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right })
  //     )
  //   )
  // );
  // Define the insideTemplate for the palette
   // Define the insideTemplate for the palette
   myPalette.nodeTemplateMap.add("InsideTemplate",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Inside Template", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Panel, "Spot",{ width: 35, height: 35, margin: new go.Margin(0, 10, 0, 0), alignment: go.Spot.Right },
          $(go.Shape, "Rectangle", { fill: "white", width: 25, height: 25 }),
          $(go.Shape, "Circle", { fill: "black", width: 8, height: 8, alignment: new go.Spot(0.1, 1), stroke: "white" }),
          $(go.Shape, "Circle", { fill: "black", width: 8, height: 8, alignment: new go.Spot(0.9, 1), stroke: "white" })
        )
      )
    )
  );

  // Add these nodes to the palette with correct categories
  myPalette.model = new go.GraphLinksModel([

    // { category: "Circle", key: "circle" },
    // { category: "Square", key: "square" },
    // { category: "Triangle", key: "triangle" },
    // { category: "Diamond", key: "Diamond" },
    { category: "InsideTemplate", key: "insideTemplate" },
    { category: "Rectangle", key: "Rectangle" },
    { category: "Rectangle2", key: "Rectangle2" },
    { category: "Rectangle3", key: "Rectangle3" },
    { category: "Rectangle4", key: "Rectangle4" },
    { category: "Rectangle5", key: "Rectangle5" },
    { category: "Rectangle6", key: "Rectangle6" },
    { category: "VerticalLine", key: "VerticalLine" },
    { category: "HorizontalLine", key: "HorizontalLine" },
    
    

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