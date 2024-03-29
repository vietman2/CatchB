import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function createPost(
  forum: string,
  uuid: string,
  title: string,
  content: string,
  tags: number[],
  images: number[],
  token: string
) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/posts/`,
      {
        forum,
        author_uuid: uuid,
        title,
        content,
        tags,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function getPostList(forum: string) {
  try {
    const response = await axios.get(
      `${API_LOCAL_URL}/api/community/posts/?forum=${forum}`
    );

    return {
      status: response.status,
      data: {
        posts: response.data.posts,
        tags: response.data.tags,
      },
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function getPostDetail(postId: number, token?: string) {
  try {
    const response = await axios.get(
      `${API_LOCAL_URL}/api/community/posts/${postId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function postLike(postId: number, uuid: string, token: string) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/posts/${postId}/like/`,
      {
        user_uuid: uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function postDislike(postId: number, uuid: string, token: string) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/posts/${postId}/dislike/`,
      {
        user_uuid: uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
