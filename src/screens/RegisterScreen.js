import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register as registerCompany } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ history, location }) => {
  const navigate = useNavigate()
  // const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [type, setType] = useState('Recruiter')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location ? location.search.split('=')[1] : '/profile/company/companyinformation'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [history, userInfo, redirect])

  const onSubmit = (data) => {
    // e.preventDefault()
    if (data.password !== data.confirmPassword) {
      alert('Password and confirm password does not match')
    } else {
      dispatch(
        registerCompany(data.firstName, '', data.email, data.password, type)
      )
    }
  }

  return (
    <div>
      <div className='flex flex-row text-dark'>
        <div className=' hidden lg:block bg-primary max-w-lg  '>
          <div className='h-screen coverImage'>
            <div className=' h-full flex flex-col align-end content bg-gradient-to-t from-black text-white px-6 pb-10 min-h-64 '>
              <h2 className='text-3xl  mt-auto font-bold mb-3'>
                Register as Job Seeker
              </h2>
              <p className=' '>
                ዘባርቅ እየቀደመን የፈጠራን ችሎታ ከእትዬ ለገላገሉት እንደኛው እሷ ይቻላል ጎበዝ ጎሮምሳ እና ሌላውን
                ተረት መመልከት እና ብጠይቅ እሷ ትክክል ችሎታ በመስኮት ነጥቡ ወይም የጋሪው አጠናቀቁ መጸሐፍ ለሱሪ
                ለገላገሉት ለሱሪ።
              </p>
            </div>
          </div>
        </div>

        <div className='  relative  h-screen overflow-scroll overflow-x-hidden w-full   '>
          <nav className='bg-white'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='flex justify-between'>
                <div>
                  <a href='#' className='flex items-center py-4 px-2'>
                    <img className='h-6 ' src='./assets/images/logo.svg' />{' '}
                  </a>
                </div>

                <div className='hidden md:flex items-center space-x-1'>
                  <a
                    href='#'
                    className='py-5 px-3 text-dark font-bold hover:text-gray-900'
                  >
                    Jobs
                  </a>
                  <a
                    href='#'
                    className='py-5 px-3 text-dark font-bold hover:text-gray-900'
                  >
                    How it Works
                  </a>
                  <a
                    href='#'
                    className='py-5 px-3 text-dark font-bold hover:text-gray-900'
                  >
                    Find Freelancers
                  </a>
                </div>

                <div className='hidden md:flex items-center space-x-1'>
                  <a href='' className='py-5 px-3'>
                    Sign in
                  </a>
                </div>

                <div className='md:hidden flex items-center'>
                  <button className='mobile-menu-button'>
                    <svg
                      className='w-6 h-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className='mobile-menu hidden md:hidden'>
              <a
                href='#'
                className='block py-2 px-4 text-sm text-dark font-bold hover:bg-gray-200'
              >
                Jobs
              </a>
              <a
                href='#'
                className='block py-2 px-4 text-sm text-dark font-bold hover:bg-gray-200'
              >
                How it works
              </a>
              <a
                href='#'
                className='block py-2 px-4 text-sm text-dark font-bold hover:bg-gray-200'
              >
                Find Freelancers
              </a>
            </div>
          </nav>

          <div className=' lg:ml-10 flex flex-col align-center justify-center'>
            <div className='head mx-6 my-10 text-dark'>
              <h3 className='text-lg font-semibold mb-3 '>
                Create a Molto Terfo Account
              </h3>
              <p className=' '>
                Start your journey with Molto Terfo to hire people both
                freelance & fulltime
              </p>
            </div>
            {error && <Message message={error} />}
            {loading && <Loader />}
            <form
              className='max-w-lg mt-0.5 mx-6 text-dark'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='formItem  flex flex-col mt-3 '>
                <label className='font-bold mb-3  text-dark' htmlFor='input '>
                  Company Name
                </label>
                <input
                  className='p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-2 block appearance-none leading-normal'
                  type='text'
                  placeholder='Company Name'
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <span className='text-red-500'>
                    The company name field is required
                  </span>
                )}
              </div>

              <div className='formItem flex flex-col mt-3 '>
                <label className='font-bold mb-3  text-dark' htmlFor='input '>
                  Email Address
                </label>
                <input
                  className='p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-2 block appearance-none leading-normal'
                  type='email'
                  placeholder='Email Address'
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className='text-red-500'>
                    The email field is required
                  </span>
                )}
              </div>

              <div className='formItem flex flex-col mt-3 '>
                <label className='font-bold mb-3  text-dark' htmlFor='input '>
                  Create Password
                </label>
                <input
                  className='p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-2 block appearance-none leading-normal'
                  type='password'
                  placeholder='Create Password'
                  {...register('password', { required: true })}
                />
                {errors.email && (
                  <span className='text-red-500'>
                    The password field is required
                  </span>
                )}
              </div>
              <div className='formItem flex flex-col mt-3 '>
                <label className='font-bold mb-3  text-dark' htmlFor='input '>
                  Confirm Password
                </label>
                <input
                  className='p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-2 block appearance-none leading-normal'
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confirmPassword', { required: true })}
                />
                {errors.email && (
                  <span className='text-red-500'>
                    The confirm password field is required
                  </span>
                )}
              </div>
              <div className='formItem mt-6  '>
                <button className='p-3 px-auto w-full bg-primary text-white '>
                  Sign Up
                </button>
              </div>
            </form>

            <div className='alternativeRegstration max-w-lg mt-6 w-full flex flex-col '>
              <p className='text-center  text-dark'>
                {' '}
                Already have account?{' '}
                <Link className='text-primary ' to='/login'>
                  Login
                </Link>
              </p>
              <p className='my-6 text-center font-bold  text-dark '>
                Continue with
              </p>
              <div className=' flex flex-row justify-between w-full'>
                <button className='flex border border-gray-300 m-3 block rounded-sm font-bold py-2 px-3 flex items-center justify-between'>
                  <img
                    src='./assets/images/google_logo.png'
                    width='30px'
                    className='mr-3'
                    alt=''
                    srcSet=''
                  />
                  <span className=' text-dark'>Google</span>
                </button>
                <button className='flex border border-gray-300 m-3 block rounded-sm font-bold py-2 px-3 flex items-center justify-between'>
                  <img
                    src='./assets/images/Facebook-logo.png '
                    width='40px '
                    height='30px '
                    className='mr-3 '
                    alt=' '
                    srcSet=' '
                  />
                  <span className=' text-dark '>Facebook</span>
                </button>
                <button className='flex border border-gray-300 m-3 block rounded-sm font-bold py-2 px-3 flex items-center justify-between'>
                  <img
                    src='./assets/images/linked_in.png '
                    width='30px '
                    className='mr-3 '
                    alt=' '
                    srcSet=' '
                  />
                  <span className=' text-dark whitespace-nowarp'>
                    linked In
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
