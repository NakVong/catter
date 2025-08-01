import { useState } from 'react';

const MainPage = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const addTask = () => {
        if (input.trim() !== '') {
            setTasks([...tasks, input]);
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Todo List</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="New task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
