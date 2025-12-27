import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as backlogService from '../../services/backlogService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [backlogs, setBacklogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Game',
    status: 'backlog',
    platform: '',
    notes: '',
    priority: 1,
  });

  useEffect(() => {
    const fetchBacklogs = async () => {
      try {
        const data = await backlogService.index();
        if (Array.isArray(data)) {
          setBacklogs(data);
        } else {
          console.error('Invalid data format:', data);
          setBacklogs([]);
        }
      } catch (err) {
        console.error('Error fetching backlogs:', err);
        setBacklogs([]);
      }
    };
    if (user) fetchBacklogs();
  }, [user]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (editingId) {
        const updated = await backlogService.update(editingId, formData);
        setBacklogs(backlogs.map((backlog) => 
          backlog._id === editingId ? updated : backlog
        ));
        setEditingId(null);
      } else {
        const newBacklog = await backlogService.create(formData);
        setBacklogs([...backlogs, newBacklog]);
      }
      setFormData({
        name: '',
        type: 'Game',
        status: 'backlog',
        platform: '',
        notes: '',
        priority: 1,
      });
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (backlog) => {
    setEditingId(backlog._id);
    setFormData({
      name: backlog.name,
      type: backlog.type,
      status: backlog.status,
      platform: backlog.platform || '',
      notes: backlog.notes || '',
      priority: backlog.priority || 1,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'Game',
      status: 'backlog',
      platform: '',
      notes: '',
      priority: 1,
    });
  };

  const handleDelete = async (backlogId) => {
    try {
      await backlogService.deleteBacklog(backlogId);
      setBacklogs(backlogs.filter((backlog) => backlog._id !== backlogId));
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'backlog': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'dropped': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeEmoji = (type) => {
    switch(type) {
      case 'Game': return '🎮';
      case 'Movie': return '🎬';
      case 'Series': return '📺';
      default: return '📝';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user.username}!</h1>
          <p className="text-gray-600">Manage your entertainment backlog</p>
        </div>

        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
          >
            + Add New Item
          </button>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingId ? 'Edit Item' : 'Add to Backlog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='e.g., Elden Ring, Breaking Bad, The Matrix'
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor='type' className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select 
                    id='type' 
                    name='type' 
                    value={formData.type} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value='Game'>🎮 Game</option>
                    <option value='Movie'>🎬 Movie</option>
                    <option value='Series'>📺 Series</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='status' className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select 
                    id='status' 
                    name='status' 
                    value={formData.status} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value='backlog'>Backlog</option>
                    <option value='in progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                    <option value='dropped'>Dropped</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor='platform' className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <input
                  type='text'
                  id='platform'
                  name='platform'
                  value={formData.platform}
                  onChange={handleChange}
                  placeholder='e.g., PS5, Netflix, Steam'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor='notes' className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id='notes'
                  name='notes'
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder='Add notes, recommendations, or reminders...'
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor='priority' className="block text-sm font-medium text-gray-700 mb-1">
                  Priority (1 = highest)
                </label>
                <input
                  type='number'
                  id='priority'
                  name='priority'
                  value={formData.priority}
                  onChange={handleChange}
                  min='1'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  type='submit'
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition shadow-md"
                >
                  {editingId ? 'Update' : 'Add to Backlog'}
                </button>
                <button 
                  type='button'
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Backlog ({backlogs.length})</h2>
        </div>

        {backlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-gray-600 mb-2">Your backlog is empty!</p>
            <p className="text-gray-500">Add your first game, movie, or series to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backlogs.map((backlog) => (
              <div key={backlog._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getTypeEmoji(backlog.type)}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{backlog.name}</h3>
                      <p className="text-sm text-gray-500">{backlog.type}</p>
                    </div>
                  </div>
                </div>

                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 border ${getStatusColor(backlog.status)}`}>
                  {backlog.status}
                </div>

                {backlog.platform && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Platform:</span> {backlog.platform}
                  </p>
                )}

                {backlog.notes && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Notes:</span> {backlog.notes}
                  </p>
                )}

                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Priority:</span> {backlog.priority}
                </p>

                <div className="border-t pt-4 space-y-2">
                  {editingId === backlog._id ? (
                    <button 
                      onClick={() => handleDelete(backlog._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                      Delete
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(backlog)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;