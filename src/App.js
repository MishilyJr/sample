import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      addTask(voiceText);
    };

    recognition.onerror = (event) => {
      console.error("音声認識エラー:", event.error);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>音声入力Todoリスト</h1>
        <input
          type="text"
          placeholder="新しいタスクを入力"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={() => addTask(newTask)}>追加</button>
        <button onClick={handleVoiceInput}>音声入力</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
