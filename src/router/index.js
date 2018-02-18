import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import MeetUps from '@/components/meetup/meetups'
import CreateMeetup from '@/components/meetup/createMeetup'
import Profile from '@/components/user/profile'
import Signup from '@/components/user/signup'
import Signin from '@/components/user/signin'
import Meetup from '@/components/meetup/meetup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'MeetUps',
      component: MeetUps
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
