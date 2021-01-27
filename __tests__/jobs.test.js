import { createMocks } from 'node-mocks-http';
import fetchJobs from '../pages/api/jobs';

describe('/api/jobs', () => {
  test('returns jobs having keyword nursing director', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        search: 'nursing director',
      },
    });

    await fetchJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).count).toBe(3);
  });

  test('returns all job postings', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await fetchJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).count).toBe(120);
  });
});
