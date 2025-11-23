import axios from 'axios';

// In Next.js, we can use the same base URL or a proxy
// For now, we'll point directly to the Go API
export const api = axios.create({
    baseURL: 'http://localhost:8080/api/v2',
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    return config;
});

export const apiV3 = axios.create({
    baseURL: 'http://localhost:8080/api/v3',
});

apiV3.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiV1 = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

apiV1.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
