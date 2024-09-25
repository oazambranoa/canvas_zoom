import "./App.css";
import React, { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Header from "./Components/Header";

function App() {
  const stageRef = useRef(null);
  const width = 500;
  const height = 500;

  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const scaleRelativeToPoint = (point, increaseScale) => {
    const scaleBy = 1.02;
    const stage = stageRef.current;
    const oldScale = stage.scaleY();
    const mousePointTo = {
      x: point.x / oldScale - stage.x() / oldScale,
      y: point.y / oldScale - stage.y() / oldScale,
    };

    const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (point.x / newScale - mousePointTo.x) * newScale,
      y: (point.y / newScale - mousePointTo.y) * newScale,
    });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    scaleRelativeToPoint(
        e.target.getStage().getPointerPosition(),
        e.evt.deltaY < 0
    );
  };
  return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col xs={9}>
              <Row className="">
                <Button
                    variant="primary"
                    onClick={() => {
                      scaleRelativeToPoint(
                          {
                            x: width / 2,
                            y: height / 2,
                          },
                          true
                      );
                    }}
                >
                  +
                </Button>{" "}
                <Button
                    variant="secondary"
                    onClick={() => {
                      scaleRelativeToPoint(
                          {
                            x: width / 2,
                            y: height / 2,
                          },
                          false
                      );
                    }}
                >
                  -
                </Button>{" "}
              </Row>
              <Row className="d-grid justify-content-center canvasborder">
                <Stage
                    className="mt-5 ml-5"
                    width={width}
                    height={height}
                    onWheel={handleWheel}
                    scaleY={stage.scale}
                    x={0}
                    y={10}
                    ref={stageRef}
                >
                  <Layer>
                    <Rect fill="Blue" height={100} width={100} />
                    <Rect fill="Red" height={1} width={50} />
                  </Layer>
                </Stage>
              </Row>
            </Col>
          </Row>
          <h1>{stage.scale}</h1>
        </Container>
      </>
  );
}

export default App;
