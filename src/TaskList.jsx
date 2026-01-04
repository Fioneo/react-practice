
import { useState } from "react";
function Todo() {
  const [openSection,setSection] = useState({
    tasklist: true, tasks: true ,completedtasks: true
  })
  const [tasks,setTasks] = useState([])
  const [sortType,setSortType] = useState('date')
  const [sortOrder,setSortOrder] = useState('asc')

  function toggleSection(section) {
    setSection(prev => ({   ...prev, [section]: !prev[section]})
  )
  }

  function addTask(task) {
    setTasks([...tasks,{...task,completed: false,id: Date.now(),  deadline: new Date(task.deadline) }])
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id ))
  }

  function completeTask(id) {
    setTasks(tasks.map(task => task.id === id ? {...task,completed: true} : task))
  }
  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
    else  {
  setSortType(type);  
  setSortOrder('asc');
    }
  }
function compareTasks(a, b) {
  if (sortType === 'priority') {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 }
    return sortOrder === 'asc'
      ? priorityOrder[a.priority] - priorityOrder[b.priority]
      : priorityOrder[b.priority] - priorityOrder[a.priority]
  }

  return sortOrder === 'asc'
    ? a.deadline - b.deadline
    : b.deadline - a.deadline
}

const activeTasks = tasks
  .filter(task => !task.completed)
  .slice()
  .sort(compareTasks)

const completedTasks = tasks.filter(task => task.completed)

  return <div className="todo">
     <div className="task-container">
      <h1>Task List With Priority</h1>
      <button className={`close-button ${openSection.tasklist ? 'open' : ''}`} onClick={() => toggleSection('tasklist')}>
        +
      </button>
          {openSection.tasklist && (        <TaskForm addTask={addTask}/> )}
    </div>
     <div className="task-container">
      <h2>Tasks</h2> 
            <button className={`close-button ${openSection.tasks ? 'open' : ''}`} onClick={() => toggleSection('tasks')}>
        +
      </button>
      <div className="sort-controls">
        <button className={`sort-button ${sortType === 'date' ? 'active' : ''}`} onClick={() => toggleSortOrder('date')}>By date {sortType === 'date' && (sortOrder === 'asc' ? '\u2191' : '\u2193')}</button>
        <button className={`sort-button ${sortType === 'priority' ? 'active' : ''}`} onClick={() => toggleSortOrder('priority')}>By priority {sortType === 'priority' && (sortOrder === 'asc' ? '\u2191' : '\u2193')}</button>
      </div>
      {openSection.tasks &&       <TaskList tasks={activeTasks} deleteTask={deleteTask} completeTask={completeTask}/>}
    </div>
    <div className="completed-task-container">
      <h2>Completed Tasks</h2>
            <button className={`close-button ${openSection.completedtasks ? 'open' : ''}`} onClick={() => toggleSection('completedtasks')}>
        +
      </button>
          {openSection.completedtasks && <TaskList tasks={completedTasks} deleteTask={deleteTask}/>}
    </div>
  </div>;
}


function TaskList({tasks,deleteTask,completeTask}) {
  return (
    <ul className="task-list">
{tasks.map((item) => (
  <TaskItem key={item.id} {...item} deleteTask={deleteTask} completeTask={completeTask}/>
))}
    </ul>
  )
}


function TaskItem({title,priority,deadline,id,deleteTask,completeTask}) {
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>{title} <strong>{priority}</strong></div>
        <div className="task-deadline">Due: {deadline.toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        {completeTask &&  <button className="complete-button" onClick={() => completeTask(id)}>Complete</button>}
              <button className="delete-button" onClick={() => deleteTask(id)}>Delete</button>
      </div>
    </li>
  )
}

function TaskForm({addTask}) {
  const [title,setTitle] = useState('')
  const [priority,setPriority] = useState('Low')
  const [deadline,setDeadLine] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
   if (title.trim() && deadline) addTask({title,priority,deadline})
    setTitle('')
    setPriority('Low')
    setDeadLine('')
  }
  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input type="text"  value={title} placeholder="task title" required onChange={(e) => setTitle(e.target.value)}/>
      <select  value={priority} onChange={(e) =>setPriority(e.target.value)} >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
     <input type="datetime-local" required value={deadline} onChange={(e) => setDeadLine(e.target.value)} />
      <button type="submit" >Add task</button>
    </form>
  )
}
export default Todo;