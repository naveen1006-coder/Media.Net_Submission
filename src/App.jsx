import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Landing } from './pages/Landing';
import { Workspace } from './pages/Workspace';
import { Launch } from './pages/Launch';
import { Success } from './pages/Success';
import { Dashboard } from './pages/Dashboard';

/**
 * Main App Component with Authentication and Routing
 */
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Landing />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/workspace"
                        element={
                            <ProtectedRoute>
                                <Workspace />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/launch"
                        element={
                            <ProtectedRoute>
                                <Launch />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/success"
                        element={
                            <ProtectedRoute>
                                <Success />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all - redirect to login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
