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
    path: '/days/:id/:method',
    title: 'Day',
    template: 'Day'
  },
  {
    path: '*',
    title: 'Not Found',
    template: '404',
    altPath: '/not-found'
  }
]
