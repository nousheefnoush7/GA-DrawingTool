//Palette.jsx
import React from "react";
import { ReactPalette } from "gojs-react";
import * as go from "gojs";

function initPalette() {
  const $ = go.GraphObject.make;

  const myPalette = $(go.Palette,
     {
      allowZoom: false,
      autoScale: go.AutoScale.Uniform,
    layout: $(go.GridLayout, { wrappingColumn: 1, alignment: go.GridAlignment.Position })
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
          $(go.Shape, "Rectangle", 
            { 
              width: 0, 
              height: 6, 
              fill: "Transparent", 
              stroke: "black", 
              strokeWidth: 1, 
              margin: new go.Margin(32, 24.5, 5, 0), 
              alignment: go.Spot.Right,
              angle: 55
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, "Rectangle", 
            { 
              width: 0, 
              height: 6, 
              fill: "Transparent", 
              stroke: "black", 
              strokeWidth: 1, 
              margin: new go.Margin(32, 29, 5, 0), 
              alignment: go.Spot.Right,
              angle: -55
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, "Rectangle", 
            { 
              width: 0, 
              height: 6, 
              fill: "Transparent", 
              stroke: "black", 
              strokeWidth: 1, 
              margin: new go.Margin(38, 24.5, 5, 0), 
              alignment: go.Spot.Right,
              angle: 55
            },
            new go.Binding("stroke", "color")
          ),
          $(go.Shape, "Rectangle", 
            { 
              width: 0, 
              height: 6, 
              fill: "Transparent", 
              stroke: "black", 
              strokeWidth: 1, 
              margin: new go.Margin(38, 29, 5, 0), 
              alignment: go.Spot.Right,
              angle: -55
            },
            new go.Binding("stroke", "color")
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
                  margin: new go.Margin(12, 35, 10, 0), 
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
                  margin: new go.Margin(12, 30, 10, 0), 
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
                  margin: new go.Margin(12, 25, 10, 0), 
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
                  margin: new go.Margin(12, 20, 10, 0), 
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
                  $(go.TextBlock, "Horizontal Busbar", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
                  $(go.Shape, "Rectangle", 
                    { 
                      height: 1, 
                      width: 35, 
                      fill: "Black", 
                      stroke: "black", 
                      strokeWidth: 1, 
                      margin: new go.Margin(5, 35, 10, 297), 
                      // alignment: go.Spot.Right 
                    },
                    new go.Binding("stroke", "color")
                  ),
                  $(go.Shape, "Rectangle", 
                    { 
                      height: 1, 
                      width:35, 
                      fill: "Black", 
                      stroke: "black", 
                      strokeWidth: 1, 
                      margin: new go.Margin(15, 30, 10, 292), 
                      // alignment: go.Spot.Right 
                    },
                    new go.Binding("stroke", "color")
                  ),
                  $(go.Shape, "Rectangle", 
                    { 
                      height: 0, 
                      width: 35, 
                      fill: "Transparent", 
                      stroke: "black", 
                      strokeWidth: 1, 
                      margin: new go.Margin(25, 25, 10, 287), 
                      // alignment: go.Spot.Right 
                    },
                    new go.Binding("stroke", "color")
                  ),
                  $(go.Shape, "Rectangle", 
                    { 
                      height: 1, 
                      width: 35, 
                      fill: "Black", 
                      stroke: "black", 
                      strokeWidth: 1, 
                      margin: new go.Margin(35, 20, 10, 282), 
                      // alignment: go.Spot.Right 
                    },
                    new go.Binding("stroke", "color")
                  ),
                )))
  
                myPalette.nodeTemplateMap.add("Rectangle7",
                  $(go.Node, "Vertical",
                    $(go.Panel, "Auto",
                      { width: 320, height: 60, margin: new go.Margin(2) },
                      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
                      $(go.TextBlock, "Vertical Sepration", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 30, 
                          height: 40, 
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
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(0, 0, 0, 303), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(0, 0, 0, 234.9), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(0, 0, 36, 303), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(0, 0, 36, 234.9), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(36, 0, 0, 234.9), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 2, 
                          height: 4, 
                          fill: "black", 
                          margin: new go.Margin(36, 0, 0, 303), 
                          // alignment: go.Spot.Center 
                        }
                      ),
                    )
                  )
                );


                myPalette.nodeTemplateMap.add("Rectangle8",
                  $(go.Node, "Vertical",
                    $(go.Panel, "Auto",
                      { width: 320, height: 60, margin: new go.Margin(2) },
                      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
                      $(go.TextBlock, "ACB", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
                      $(go.Shape, "RoundedRectangle", 
                        { 
                          width: 35, 
                          height: 40, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(0, 10, 0, 280) 
                        },
                        new go.Binding("stroke", "color")
                      ),
                      $(go.Shape, "RoundedRectangle", 
                        { 
                          width: 17, 
                          height: 28, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(0, 10, 0, 280) 
                        },
                        new go.Binding("stroke", "color")
                      ),
                      $(go.Shape, "Circle", 
                        { 
                          width: 3, 
                          height: 5, 
                          fill: "black", 
                          margin: new go.Margin(0, 37, 0, 0), 
                          alignment: go.Spot.Right
                        }
                      ),
                      $(go.Shape, "Square", 
                        { 
                          width: 3, 
                          height: 5, 
                          fill: "black", 
                          margin: new go.Margin(0, 23, 0, 0), 
                          alignment: go.Spot.Right
                        }
                      ),
                      
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 0, 
                          height: 11, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(7, 24.5, 23, 0), 
                          alignment: go.Spot.Right 
                        },
                        new go.Binding("stroke", "color")
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 0, 
                          height: 7, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(21, 24.8, 0, 0), 
                          alignment: go.Spot.Right 
                        },
                        new go.Binding("stroke", "color")
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 0, 
                          height: 5, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(10, 24.5, 5, 0), 
                          alignment: go.Spot.Right,
                          angle: 45
                        },
                        new go.Binding("stroke", "color")
                      ),
                      $(go.Shape, "Rectangle", 
                        { 
                          width: 0, 
                          height: 5, 
                          fill: "Transparent", 
                          stroke: "black", 
                          strokeWidth: 1, 
                          margin: new go.Margin(16, 24.5, 5, 0), 
                          alignment: go.Spot.Right,
                          angle: -45
                        },
                        new go.Binding("stroke", "color")
                      ),
                    )))

                    myPalette.nodeTemplateMap.add("Rectangle9",
                      $(go.Node, "Vertical",
                        $(go.Panel, "Auto",
                          { width: 320, height: 60, margin: new go.Margin(2) },
                          $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
                          $(go.TextBlock, "Compartment", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
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
                          ),)))
   // Define the insideTemplate for the palette
   myPalette.nodeTemplateMap.add("InsideTemplate",
    $(go.Node, "Vertical",
      $(go.Panel, "Auto",
        { width: 320, height: 60, margin: new go.Margin(2) },
        $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 0, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight, parameter1: 10 }),
        $(go.TextBlock, "Base Frame", { margin: new go.Margin(0, 0, 0, 10), alignment: go.Spot.Left }),
        $(go.Shape, "Rectangle", 
          { 
            width: 30, 
            height: 45, 
            fill: "Transparent", 
            stroke: "black", 
            strokeWidth: 2, 
            margin: new go.Margin(0, 10, 0, 0), 
            alignment: go.Spot.Right 
          },
          new go.Binding("stroke", "color")
        ),
        $(go.Shape, "Rectangle", 
            { 
              width: 30, // Increased width to extend the line equally to the left and right
              height: 1, 
              fill: "black", 
              margin: new go.Margin(30, 0, 0, 269), // Adjusted margin to center the line
              // alignment: go.Spot.Right 
            }
        ),
        $(go.Shape, "RoundedRectangle", 
          { 
            width: 3, 
            height: 3, 
            fill: "black", 
            margin: new go.Margin(37, 38, 0, 290) 
          }
        ),
        // Bottom-right corner of Rounded Rectangle
        $(go.Shape, "RoundedRectangle", 
          { 
            width: 3, 
            height: 3, 
            fill: "black", 
            margin: new go.Margin(37, 38, 0, 325) 
          }
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
    { category: "Rectangle7", key: "Rectangle7" },
    { category: "Rectangle8", key: "Rectangle8" },
    { category: "Rectangle9", key: "Rectangle9" },
    
    

  ]);

  return myPalette;
}

function Palette() {
  return (
      <ReactPalette
        initPalette={initPalette}
        divClassName="palette-component"
        style={{ width: "100%", height: "100%", overflowY: "auto" }}
      />
  );
}

export default Palette;