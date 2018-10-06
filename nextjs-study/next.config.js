module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' }
      // '/p/*': {page: '/post', query: { id: 'hello-nextjs' }}
    }
  }
}