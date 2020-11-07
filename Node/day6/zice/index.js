require('ajax').Ajax({
    url: '/getData',
    type: 'post',
    data: { name: 'zs', pwd: '123' },
    success: function(data) {

    }
})