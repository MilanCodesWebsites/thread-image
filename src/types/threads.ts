export interface ThreadsPostData {
  text: string;
  username: string;
  profile_image_url: string;
  image_post_url: string;
}

export interface ThreadsApiResponse {
  success: boolean;
  data: ThreadsPostData;
}

export interface ThreadsApiError {
  message: string;
  errors?: {
    threads_url?: string[];
  };
}

export interface ApiState {
  loading: boolean;
  data: ThreadsPostData | null;
  error: string | null;
}