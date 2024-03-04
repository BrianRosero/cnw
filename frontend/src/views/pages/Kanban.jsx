import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Por Hacer',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'En Progreso',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Hecho',
      taskIds: [],
    },
  },
  tasks: {
    'task-1': { id: 'task-1', content: 'Tarea 1', tags: ['Importante'], dueDate: '2024-03-01' },
    'task-2': { id: 'task-2', content: 'Tarea 2', tags: ['Urgente'], dueDate: '2024-03-02' },
    'task-3': { id: 'task-3', content: 'Tarea 3', tags: [], dueDate: null },
  },
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const addTask = (columnId, content, tags = [], dueDate = null) => {
    const newTaskId = uuidv4();
    const newTask = {
      id: newTaskId,
      content: content,
      tags: tags,
      dueDate: dueDate,
    };

    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, newTaskId],
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  };

  const editTask = (taskId, newContent) => {
    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: {
          ...data.tasks[taskId],
          content: newContent,
        },
      },
    };

    setData(newState);
  };

  const deleteTask = (taskId, columnId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newColumn = {
      ...data.columns[columnId],
      taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
    };

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  };

  const addColumn = (title) => {
    const newColumnId = uuidv4();
    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: newColumn,
      },
    };

    setData(newState);
  };

  const editColumnTitle = (columnId, newTitle) => {
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          title: newTitle,
        },
      },
    };

    setData(newState);
  };

  const deleteColumn = (columnId) => {
    const newColumns = { ...data.columns };
    delete newColumns[columnId];

    const newState = {
      ...data,
      columns: newColumns,
    };

    setData(newState);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#004a8f', marginBottom: '20px' }}>Tablero Kanban</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {Object.values(data.columns).map((column) => (
            <div key={column.id} style={{ margin: '0 20px', flex: '1 1 300px', maxWidth: '400px', width: '100%' }}>
              <h2 style={{ color: '#004a8f', fontSize: '24px', marginBottom: '10px', textTransform: 'uppercase' }}>
                <span>{column.title}</span>
                <button style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => editColumnTitle(column.id, prompt("Editar título", column.title))}>Editar</button>
                <button style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteColumn(column.id)}>Eliminar</button>
              </h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: column.id === 'column-1' ? '#004a8f' : column.id === 'column-2' ? '#004a8f' : '#004a8f',
                      padding: '10px',
                      minHeight: 300,
                      borderRadius: '10px',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = data.tasks[taskId];
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <p style={{ margin: 0, fontWeight: 'bold' }}>{task.content}</p>
                              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Etiquetas: {task.tags.join(', ')}</p>
                              {task.dueDate && <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Fecha límite: {task.dueDate}</p>}
                              <div style={{ marginTop: '5px' }}>
                                <button style={{ marginRight: '5px', padding: '5px 10px', color: '#ffffff', backgroundColor: '#004a8f', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => editTask(task.id, prompt("Editar tarea", task.content))}>Editar</button>
                                <button style={{ padding: '5px 10px', color: '#ffffff', backgroundColor: '#fc0000', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => deleteTask(task.id, column.id)}>Eliminar</button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <input
                type="text"
                placeholder="Agregar tarea"
                style={{ marginTop: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTask(column.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          ))}
          <div style={{ margin: '0 20px', flex: '1 1 300px', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ color: '#004a8f', fontSize: '24px', marginBottom: '10px', textTransform: 'uppercase' }}>Agregar Columna</h2>
            <input
              type="text"
              placeholder="Nombre de la columna"
              style={{ marginTop: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addColumn(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
