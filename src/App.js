import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'




function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}
		getTasks()
	}, [])

	// Fetch tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()
		return data
	}

	//Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		})

		const data = await res.json()
		setTasks([...tasks, data])
	}

	//Delete Task List
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		})
		setTasks(tasks.filter((task) => task.id !== id))
	}

	// Toggle reminder

	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		)
	}

	return (
		<Router>
			<div className="container">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>
				<Routes>
					<Route path='/' element={<>{showAddTask && <AddTask onAdd={addTask} />}
				{tasks.length > 0 ? (
					<Tasks
						tasks={tasks}
						onToggle={toggleReminder}
						onDelete={deleteTask}
					/>
				) : (
					'Add a Task 😁'
				)}</>}/>
					<Route path='/about' element={<About/>}/>
					<Route path='/task/:id' element={<TaskDetails/>}/>
					</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
