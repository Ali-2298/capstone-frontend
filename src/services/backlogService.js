const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/backlogs`;

const index = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const show = async (backlogId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${backlogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (backlogData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backlogData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (backlogId, backlogData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${backlogId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backlogData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteBacklog = async (backlogId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${backlogId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { index, show, create, update, deleteBacklog };