import axios from "axios";

import { API_LOCAL_URL } from "../";

export async function createComment(
  postId: number,
  content: string,
  uuid: string,
  token: string
) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/comments/`,
      {
        post: postId,
        content,
        commenter_uuid: uuid,
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

export async function getCommentList(postId: number, token: string) {
  try {
    const response = await axios.get(
      `${API_LOCAL_URL}/api/community/comments/`, {
        params: {
          post_id: postId,
        },
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

export async function commentLike(
  commentId: number,
  uuid: string,
  token: string
) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/comments/${commentId}/like/`,
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

export async function commentDislike(
  commentId: number,
  uuid: string,
  token: string
) {
  try {
    const response = await axios.post(
      `${API_LOCAL_URL}/api/community/comments/${commentId}/dislike/`,
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
