import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      jobs: [
        {
          id: 'j1',
          jobTitle: 'Frontend Developer',
          technologies: [
            { name: 'React', level: 'Advanced' },
            { name: 'Vue', level: 'Intermediate' },
            { name: 'CSS', level: 'Expert' },
          ],
          description:
            'We are looking for a frontend developer to join our team and help us build amazing user interfaces!',
          rate: 40,
          locations: ['Remote', 'New York'],
        },
        {
          id: 'j2',
          jobTitle: 'Backend Developer',
          technologies: [
            { name: 'Node.js', level: 'Advanced' },
            { name: 'MongoDB', level: 'Intermediate' },
            { name: 'AWS', level: 'Intermediate' },
          ],
          description:
            'Join our team of backend developers and work on exciting projects!',
          rate: 50,
          locations: ['San Francisco', 'Remote'],
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
