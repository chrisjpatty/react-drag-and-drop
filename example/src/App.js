import * as React from "react"
import {
  Draggable,
  Droppable,
  DragComponent,
  DragState
} from "react-dragtastic"
import "./App.css"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DragState>
          {dragState => (
            <div
              style={{
                background: "yellow",
                padding: 10
              }}
            >
              {Object.keys(dragState).map(key => (
                <span
                  style={{
                    display: "block"
                  }}
                  key={key}
                >
                  {key}: {dragState[key]}
                </span>
              ))}
            </div>
          )}
        </DragState>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Draggable id="red" data="Some Data" type="red">
            {dragState => (
              <div
                {...dragState.events}
                style={{
                  width: 200,
                  height: 200,
                  background: "red"
                }}
              />
            )}
          </Draggable>
          <DragComponent for="red" alwaysRender>
            {dragState => (
              <div
                style={{
                  position: "fixed",
                  left: dragState.x - 25,
                  top: dragState.y - 25,
                  width: 50,
                  height: 50,
                  background: "lime",
                  pointerEvents: "none"
                }}
              />
            )}
          </DragComponent>
          <Droppable
            id="redDrop"
            accepts={["red", "blue"]}
            subscribeTo={["isOver", "type"]}
          >
            {dragState => {
              console.log("I rendered")
              return (
                <div
                  {...dragState.events}
                  style={{
                    background:
                      dragState.type === "red" && dragState.isOver
                        ? "red"
                        : "blue",
                    width: 200,
                    height: 200
                  }}
                >
                  isOver: {dragState.isOver ? "true" : "false"}
                  <br />
                  accepts:{" "}
                  {dragState.type === "red" && dragState.isOver
                    ? "true"
                    : "false"}
                  <br />
                  I should only rerender if I{"'"}m hovered.
                </div>
              )
            }}
          </Droppable>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Draggable id="red2" data="Some Data" type="purple">
            {({ events, isActive }) => (
              <div
                {...events}
                style={{
                  width: 200,
                  height: 200,
                  background: isActive ? "yellow" : "orange"
                }}
              />
            )}
          </Draggable>
          <DragComponent for="red2">
            {dragState => (
              <div
                style={{
                  position: "fixed",
                  left: dragState.x - 25,
                  top: dragState.y - 25,
                  width: 50,
                  height: 50,
                  background: "purple",
                  pointerEvents: "none"
                }}
              />
            )}
          </DragComponent>
          <Droppable id="purpleDrop" accepts="purple">
            {dragState => (
              <div
                {...dragState.events}
                style={{
                  background:
                    dragState.willAccept && dragState.isOver ? "pink" : "teal",
                  width: 200,
                  height: 200
                }}
              >
                isOver: {dragState.isOver ? "true" : "false"}
                <br />
                accepts: {dragState.willAccept ? "true" : "false"}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    )
  }
}

export default App
