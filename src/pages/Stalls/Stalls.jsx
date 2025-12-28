import { useState, useEffect } from 'react';
import { 
  getAllStalls, 
  addStall, 
  updateStall, 
  deleteStall, 
  toggleStallVerification 
} from '../../services/stallService';
import DashboardLayout from '../Dashboard/DashboardLayout';

const Stalls = () => {
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStall, setEditingStall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false); // New: track form submission

  useEffect(() => {
    loadStalls();
  }, []);

  const loadStalls = async () => {
    try {
      setLoading(true);
      const data = await getAllStalls();
      setStalls(data);
    } catch (err) {
      setError('Failed to load stalls');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);

      if (editingStall) {
        await updateStall(editingStall.id, formData);
        setSuccess('Stall updated successfully!');
      } else {
        await addStall(formData);
        setSuccess('Stall added successfully!');
      }
      await loadStalls();
      setFormData({ name: '', email: '' });
      setShowModal(false);
      setEditingStall(null);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Operation failed');
      console.error(err);
    } finally {
      setSubmitting(false); 
    }
  };

  const handleEdit = (stall) => {
    setEditingStall(stall);
    setFormData({
      name: stall.name,
      email: stall.email,
    });
    setShowModal(true);
    setError('');
  };

  const handleDelete = async (stallId) => {
    if (!window.confirm('Are you sure you want to delete this stall?')) {
      return;
    }

    try {
      await deleteStall(stallId);
      setSuccess('Stall deleted successfully!');
      await loadStalls();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete stall');
      console.error(err);
    }
  };

  const handleToggleVerification = async (stall) => {
    try {
      await toggleStallVerification(stall.id, stall.isVerified);
      setSuccess(`Stall ${stall.isVerified ? 'unverified' : 'verified'} successfully!`);
      await loadStalls();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update verification status');
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingStall(null);
    setFormData({ name: '', email: '' });
    setShowModal(true);
    setError('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-800">Stalls Management</h1>
            <p className="text-gray-600 mt-1">Manage food stalls and their verification status</p>
          </div>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Stall
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-shake">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stalls List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : stalls.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No stalls yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first food stall</p>
            <button
              onClick={openAddModal}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Your First Stall
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stalls.map((stall) => (
              <div
                key={stall.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{stall.name}</h3>
                    <p className="text-sm text-gray-600">{stall.email}</p>
                  </div>
                  <button
                    onClick={() => handleToggleVerification(stall)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      stall.isVerified
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {stall.isVerified ? '✓ Verified' : 'Unverified'}
                  </button>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <p>Created: {new Date(stall.createdAt).toLocaleDateString()}</p>
                  <p>By: {stall.createdBy}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(stall)}
                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stall.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingStall ? 'Edit Stall' : 'Add New Stall'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stall Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="North Canteen"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stall Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="stall@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This email will be used for stall owner login
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingStall(null);
                      setFormData({ name: '', email: '' });
                      setError('');
                    }}
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingStall ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>{editingStall ? 'Update' : 'Add'} Stall</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Stalls;