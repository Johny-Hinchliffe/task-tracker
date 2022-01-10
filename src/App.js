import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctors appointment',
			day: 'Feb 5th at 2:30pm',
			reminder: true,
		},
		{
			id: 2,
			text: 'School Run',
			day: 'Feb 19th at 12:00pm',
			reminder: true,
		},
		{
			id: 3,
			text: 'Dance Class',
			day: 'Feb 7th at 5:40pm',
			reminder: true,
		},
		{
			id: 4,
			text: 'Basketball game',
			day: 'Feb 24th at 1:10pm',
			reminder: false,
		},
		{
			id: 5,
			text: 'Pick up cat',
			day: 'Feb 30th at 6:00pm',
			reminder: false,
		},
	])

	//Add Task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 100000000) + 1
		const newTask = { id, ...task }
		setTasks([...tasks, newTask])
	}

	//Delete Task List
	const deleteTask = (id) => {
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
		<div className="container">
			<Header />
			<AddTask onAdd={addTask} />
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
			) : (
				'Add a Task 😁'
			)}
		</div>
	)
}

export default App
