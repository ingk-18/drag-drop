import React, { useState } from "react";
import dummyData from "./dummyData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./components/Card";

const Main = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // data.findIndexはカラムの添え字を取得する
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    // ドラッグしたカラムのタスクを取得する
    const sourceCol = data[sourceColIndex];
    // タスクを退避
    const sourceTask = [...sourceCol.tasks];
    // タスクを削除
    const [removed] = sourceTask.splice(source.index, 1);
    // タスクを追加
    sourceTask.splice(destination.index, 0, removed);

    data[sourceColIndex].tasks = sourceTask;
    setData(data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            color: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
