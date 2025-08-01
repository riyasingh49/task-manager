import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let role = '';
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError('Could not load tasks. Please login again.');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:5050/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const applySorting = (tasks) => {
    const sorted = [...tasks];
    if (sortOption === 'dueDateAsc') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === 'dueDateDesc') {
      sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else if (sortOption === 'priorityAsc') {
      const order = { low: 1, medium: 2, high: 3 };
      sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortOption === 'priorityDesc') {
      const order = { low: 1, medium: 2, high: 3 };
      sorted.sort((a, b) => order[b.priority] - order[a.priority]);
    }
    return sorted;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) => !statusFilter || task.status === statusFilter)
    .filter((task) => !priorityFilter || task.priority === priorityFilter);

  const finalTasks = applySorting(filteredTasks);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* ✅ Admin link and Create Task button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {role === 'admin' && (
          <Link to="/admin-dashboard" className="btn btn-secondary">
            Go to Admin Dashboard
          </Link>
        )}
        <Link to="/create-task" className="btn btn-success">
          + Create New Task
        </Link>
      </div>

      {/* 🔽 Filters */}
      <div className="d-flex gap-3 mb-3">
        <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select className="form-select" value={sortOption} onChange={handleSortChange}>
          <option value="">Sort</option>
          <option value="dueDateAsc">Due Date ↑</option>
          <option value="dueDateDesc">Due Date ↓</option>
          <option value="priorityAsc">Priority ↑</option>
          <option value="priorityDesc">Priority ↓</option>
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {finalTasks.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate?.slice(0, 10)}</td>
                <td>
                  <Link to={`/edit-task/${task.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                  <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No tasks available.</p>
      )}
    </div>
  );
}

export default Dashboard;
