module.exports = [
  {
    path: '/',
    title: 'Home'
  },
  {
    path: '/days',
    title: 'Days'
  },
  {
    path: '/dynamic',
    title: 'Dynamic',
  },
  {
    path: '/days/:id',
    title: 'Day',
    template: 'Day'
  },
  {
    path: '/days/:id/read',
    title: 'Day',
    template: 'Read'
  },
  {
    path: '*',
    title: 'Not Found',
    template: '404',
    altPath: '/not-found'
  }
]
