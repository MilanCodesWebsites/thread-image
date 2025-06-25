import { useState } from 'react';
import { ApiState, ThreadsApiResponse, ThreadsApiError } from '../types/threads';

const API_URL = 'https://threadimage-api.laravel.cloud/api/threads-post';

export const useThreadsApi = () => {
  const [state, setState] = useState<ApiState>({
    loading: false,
    data: null,
    error: null,
  });

  const fetchThreadsData = async (threadsUrl: string) => {
    setState({ loading: true, data: null, error: null });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threads_url: threadsUrl }),
      });

      if (response.status === 422) {
        setState({
          loading: false,
          data: null,
          error: 'Invalid Threads URL. Please try again.',
        });
        return;
      }

      if (response.status === 500) {
        setState({
          loading: false,
          data: null,
          error: 'Something went wrong while processing the Threads link.',
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ThreadsApiResponse = await response.json();

      if (result.success && result.data) {
        setState({
          loading: false,
          data: result.data,
          error: null,
        });
      } else {
        setState({
          loading: false,
          data: null,
          error: 'Failed to process the Threads URL.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setState({
        loading: false,
        data: null,
        error: 'Network error. Please check your connection and try again.',
      });
    }
  };

  const clearData = () => {
    setState({ loading: false, data: null, error: null });
  };

  return {
    ...state,
    fetchThreadsData,
    clearData,
  };
};