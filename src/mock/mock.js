import Mock from 'mockjs'

Mock.mock('/user',{
    'name':'@name',
    'email':'@email',
    'age|1-20':5
});

Mock.mock('/menu',{
    'id':'@increment',
    'name':'menu',
    'order|1-20':10
});

Mock.mock('/login',{
    'id':'@increment',
    'name':'menu',
    'order|1-20':10
});
