export default {
  async registerJob(context, data) {
    const token = context.rootGetters.token;
    const jobData = {
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      rate: data.rate,
      technologies: data.technologies,
      location: data.location,
      description: data.description,
      creatorId: context.rootGetters.userId,
    };

    const response = await fetch('http://localhost:5002/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to register job!'
      );
      throw error;
    }

    jobData.id = responseData.job._id;

    context.commit('registerJob', jobData);
  },

  async updateJob(context, data) {
    const token = context.rootGetters.token;

    const jobData = {
      jobTitle: data.jobTitle,
      rate: data.rate,
      technologies: data.technologies,
      location: data.location,
      description: data.description,
      companyName: data.companyName,
    };

    const jobId = data.id;

    const response = await fetch(`http://localhost:5002/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update job!');
      throw error;
    }

    context.commit('updateJob', {
      ...jobData,
      id: jobId,
    });
  },

  async loadJobs(context, payload) {
    const response = await fetch('http://localhost:5002/jobs');

    const responseData = await response.json();
    console.log('responseData', responseData);
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch jobs!');
      throw error;
    }

    const jobs = responseData.map((job) => ({
      id: job._id,
      ...job,
    }));

    context.commit('setJobs', jobs);
    context.commit('setFetchTimestamp');
  },
};
