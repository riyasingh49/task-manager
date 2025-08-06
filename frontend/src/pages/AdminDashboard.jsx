import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let role = '';
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [role, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      setError('Access denied or error fetching users.');
    }
  };

  const fetchTasksForUser = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userTasks = res.data.filter((task) => task.assignedTo === userId);
      setTasks(userTasks);
    } catch (err) {
      setError('Could not load tasks.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Select User:</label>
        <select
          className="form-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">-- Select a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && tasks.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td>{t.dueDate?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUserId && tasks.length === 0 && (
        <p>No tasks assigned to this user.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
