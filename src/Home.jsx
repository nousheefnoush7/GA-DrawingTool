import React, { useRef, useEffect, useState } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import Palette from "./Palette";
import { toast } from "react-toastify";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import LocationServiceDialog from './components/dialogModel';
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";
import { initDiagram } from "./components/myDiagram";
import useSysStore from "./stateManage/useManuStore";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "./apolloClient/querys";

function Home() {
  const { loading, error, data } = useQuery(GET_DATA);
  const diagramRef = useRef(null);
  const sys = useSysStore((state) => state.sys);
  const setSys = useSysStore((state) => state.setSys);
  const setJsonData = useSysStore((state) => state.setJsonData);
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();
  const $ = go.GraphObject.make;

  
  useEffect(() => {
    document.title = "SLD Diagram";

    return () => { window.onbeforeunload = null };
  }, []);

  const resizeHandleTemplate = $(
    go.Shape,
    "Square",
    {
      desiredSize: new go.Size(20, 20),
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
    'resizingTool.handleArchetype': resizeHandleTemplate
  });

  const newFile = async () => {
    if (window.confirm("All unsaved changes will be lost\nProceed to create a new file?")) {
      const newData = {};
      myDiagram.model = go.Model.fromJson(newData);
      setSys(0);
    }
  };

  const save = async () => {
    const data = myDiagram.model.toJson();
    console.log("save", data);
    setJsonData(data);
    myDiagram.isModified = false;
    const blob = new Blob([data], { type: "application/json" });
    FileSaver.saveAs(blob, "diagram.json");
    setSys(0);
  };

  const load = async (Data) => {
    console.log("Loading Data: ", Data);
    try {
      const model = go.Model.fromJson(Data);
      myDiagram.model = model;
    } catch (error) {
      console.error("Error loading model: ", error);
      toast.error("Failed to load diagram data");
    }
    setSys(0);
  };

  const loadFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        load(jsonData);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        toast.error("Error parsing JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Box
        flex={{ base: "0 0 25%", sm: "0 0 20%", md: "0 0 16%" }}
        bg="gray.200"
        display="flex"
        flexDirection="column"
      >
        <Palette diagram={diagramRef.current} />
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Box
          zIndex="50"
          userSelect="none"
          width="100%"
          height="3rem"
          display="flex"
          alignItems="center"
          bg="slategray"
        >
          <Box mr="4" ml="4" cursor="pointer" transition="ease-in-out" transitionDuration="150ms" onClick={() => history("./online-simple-circuit")}>
            SLD
          </Box>
          <Button
            py="1"
            px="8"
            borderRadius="md"
            color="white"
            fontSize="md"
            display="block"
            transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out"
            cursor="pointer"
            bg="transparent"
            textAlign="center"
            onClick={newFile}
          >
            New
          </Button>
          <Button
            as="label"
            htmlFor="load-file"
            py="1"
            px="8"
            borderRadius="md"
            color="white"
            fontSize="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out"
            cursor="pointer"
            bg="transparent"
            textAlign="center"
          >
            Load
            <Input type="file" name="load-file" id="load-file" display="none" onChange={loadFile} />
          </Button>
          <Button
            py="1"
            px="8"
            borderRadius="md"
            color="white"
            fontSize="md"
            display="block"
            transition="transform 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out"
            cursor="pointer"
            bg="transparent"
            textAlign="center"
            onClick={save}
          >
            Save
          </Button>
        </Box>
        <Box flex="1" display="flex" flexDirection="column" position="relative">
          <Box id="diagramDiv" flex="1" bg="#e2e8f0" borderBottom="1px solid black">
            <ReactDiagram
              initDiagram={() => initDiagram($, myDiagram, toast, () => setOpen(true))}
              divClassName="main-diagram"
              nodeDataArray={[]}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p="1"
            bg="gray.200"
            borderTop="1px solid gray"
            position="absolute"
            bottom="0"
            width="100%"
          >
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box display="flex" alignItems="center">
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
        </Box>
        <LocationServiceDialog isOpen={open} onClose={() => setOpen(false)} />
      </Box>
    </div>
  );
}

export default Home;