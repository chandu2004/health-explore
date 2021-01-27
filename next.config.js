const dev = process.env.NODE_ENV !== 'production';
module.exports = {
    env: {
      // base_url: 'https://health-explore-olive.vercel.app/',
      base_url: dev ? 'http://localhost:3000/' : 'https://health-explore-olive.vercel.app/',
    },
}
  