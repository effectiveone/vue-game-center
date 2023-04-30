export default {
  async applyJob(context, payload) {
    const newRequest = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      cv: payload.cv,
      message: payload.message,
      id: payload.id,
    };

    const formData = new FormData();
    formData.append('email', newRequest.email);
    formData.append('firstName', newRequest.firstName);
    formData.append('lastName', newRequest.lastName);
    formData.append('cv', newRequest.cv);
    formData.append('id', newRequest.id);
    formData.append('message', newRequest.message);

    try {
      const response = await fetch(
        'http://localhost:5002/jobApplications/apply',
        {
          method: 'POST',
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to send request.'
        );
        throw error;
      }

      context.commit('addRequest', responseData);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to apply for job.');
    }
  },

  async fetchRequests(context) {
    const token = context.rootGetters.token;
    const response = await fetch(
      `http://localhost:5002/jobApplications/requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    console.log('responseData', responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const request of responseData) {
      requests.push({
        id: request._id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        cv: request.cv,
        message: request.message,
        createdAt: request.createdAt,
      });
    }

    context.commit('setRequests', requests);
  },
};
