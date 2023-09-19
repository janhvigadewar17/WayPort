import React, { useState, useEffect } from 'react';
import './Task.css';

function Task() {
  const [posts, setPosts] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          title: `${newTask}`, 
        },
      ]);
      setNewTask('');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Posts</h1>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <h2>Add Task</h2>
      <div className="create-task">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
}

export default Task;
