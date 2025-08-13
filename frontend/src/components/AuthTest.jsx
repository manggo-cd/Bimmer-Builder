import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function AuthTest() {
    const { user, token, getValidToken } = useContext(AuthContext);
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const testProtectedEndpoint = async () => {
        setLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            // Ensure we have a fresh token
            const validToken = await getValidToken();
            if (!validToken) {
                setError('No valid token available');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:5000/api/auth/profile');
            setApiResponse(response.data);
        } catch (err) {
            console.error('API call failed:', err);
            setError(err.response?.data?.error || err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const testPublicEndpoint = async () => {
        setLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            const response = await axios.get('http://localhost:5000/api/auth/public-data');
            setApiResponse(response.data);
        } catch (err) {
            console.error('API call failed:', err);
            setError(err.response?.data?.error || err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const testUpdateProfile = async () => {
        setLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            const validToken = await getValidToken();
            if (!validToken) {
                setError('No valid token available');
                setLoading(false);
                return;
            }

            const response = await axios.post('http://localhost:5000/api/auth/update-profile', {
                displayName: 'BMW Enthusiast',
                preferences: {
                    favoriteBrand: 'BMW',
                    carYear: '2020',
                    carModel: 'M3'
                }
            });
            setApiResponse(response.data);
        } catch (err) {
            console.error('API call failed:', err);
            setError(err.response?.data?.error || err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Please log in to test authentication</div>;
    }

    return (
        <div className="auth-test">
            <h2>Authentication Test</h2>
            
            <div className="user-info">
                <h3>Current User:</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.displayName || 'N/A'}</p>
                <p><strong>UID:</strong> {user.uid}</p>
                <p><strong>Token Available:</strong> {token ? 'Yes' : 'No'}</p>
            </div>

            <div className="api-tests">
                <h3>API Tests:</h3>
                
                <div className="test-buttons">
                    <button 
                        onClick={testProtectedEndpoint}
                        disabled={loading}
                        className="test-button"
                    >
                        Test Protected Endpoint
                    </button>
                    
                    <button 
                        onClick={testPublicEndpoint}
                        disabled={loading}
                        className="test-button"
                    >
                        Test Public Endpoint
                    </button>
                    
                    <button 
                        onClick={testUpdateProfile}
                        disabled={loading}
                        className="test-button"
                    >
                        Test Update Profile
                    </button>
                </div>

                {loading && <div className="loading">Loading...</div>}
                
                {error && (
                    <div className="error">
                        <h4>Error:</h4>
                        <p>{error}</p>
                    </div>
                )}
                
                {apiResponse && (
                    <div className="response">
                        <h4>API Response:</h4>
                        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthTest;
