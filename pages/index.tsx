import Head from 'next/head'
import { Listbox, Transition } from '@headlessui/react'
import { GetStaticProps } from 'next'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'
import { FormEvent, Fragment, useState } from 'react'

const Home = ({
  occupations,
  states,
}: {
  occupations: string[]
  states: any[]
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedState, setSelectedState] = useState({ name: '' })
  const [selectedOccupation, setSelectedOccupation] = useState('')
  const [isShowing, setIsShowing] = useState(false)

  function handleClick() {
    setIsShowing(!isShowing)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selectedOccupation === '') {
      return alert('You must select an occupation!')
    }

    if (selectedState.name === '') {
      return alert('You must select a state!')
    }

    const data = {
      name,
      email,
      password,
      state: selectedState,
      occupation: selectedOccupation,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://frontend-take-home.fetchrewards.com/form'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    alert(`Welcome ${result.name}! Your account has been created 🙌`)

    setName('')
    setEmail('')
    setPassword('')
    setSelectedOccupation('')
    setSelectedState({ name: '' })
  }

  return (
    <div className="max-w-md px-0 py-4 mt-12 mx-auto mb-24 ">
      <Head>
        <title>User sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="px-12 py-4 text-4xl  text-gray-700">
        Create your account!
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <div className="px-12 py-4">
            <label
              htmlFor="name"
              className="block text-sm leading-5 font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded-md w-72 p-1"
              value={name}
              onChange={({ target }) => setName(target.value)}
              required
            />
          </div>

          <div className="px-12 py-4">
            <label
              htmlFor="email"
              className="block text-sm leading-5 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-md w-72 p-1"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </div>

          <div className="px-12 py-4">
            <label
              htmlFor="password"
              className="block text-sm leading-5 font-medium text-gray-700 relative"
            >
              Password
              <span
                onClick={handleClick}
                className="inline absolute top-6 left-60 pt-1 text-sm leading-5 font-medium text-gray-700 cursor-pointer"
              >
                {isShowing ? 'hide' : 'show'}
              </span>
            </label>
            <input
              type={isShowing ? 'text' : 'password'}
              id="password"
              name="password"
              className="border rounded-md w-72 p-1"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center px-12 py-4 w-96 z-10">
            <div className="w-full max-w-xs mx-auto">
              <Listbox
                as="div"
                className="space-y-1"
                value={selectedOccupation}
                onChange={setSelectedOccupation}
              >
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                      Choose your occupation
                    </Listbox.Label>
                    <div className="relative">
                      <span className="inline-block w-full rounded-md shadow-sm">
                        <Listbox.Button className="cursor-default relative w-full h-8 rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                          <span className="block truncate">
                            {selectedOccupation}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5" />
                          </span>
                        </Listbox.Button>
                      </span>

                      <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                      >
                        <Listbox.Options
                          static
                          className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                        >
                          {occupations.map((occupation) => (
                            <Listbox.Option key={occupation} value={occupation}>
                              {({ selected, active }) => (
                                <div
                                  className={`${
                                    active
                                      ? 'text-white bg-blue-600'
                                      : 'text-gray-900'
                                  } cursor-default select-none relative py-2 pl-8 pr-4`}
                                >
                                  <span
                                    className={`${
                                      selected ? 'font-semibold' : 'font-normal'
                                    } block truncate`}
                                  >
                                    {occupation}
                                  </span>
                                  {selected && (
                                    <span
                                      className={`${
                                        active ? 'text-white' : 'text-blue-600'
                                      } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                    >
                                      <CheckIcon className="h-5 w-5" />
                                    </span>
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className="flex items-center justify-center px-12 py-4 w-96">
            <div className="w-full max-w-xs mx-auto">
              <Listbox
                as="div"
                className="space-y-1"
                value={selectedState}
                onChange={setSelectedState}
              >
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                      Choose your state
                    </Listbox.Label>
                    <div className="relative">
                      <span className="inline-block w-full rounded-md shadow-sm">
                        <Listbox.Button className="cursor-default relative w-full h-8 rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                          <span className="block truncate">
                            {selectedState.name}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5" />
                          </span>
                        </Listbox.Button>
                      </span>

                      <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                      >
                        <Listbox.Options
                          static
                          className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 "
                        >
                          {states.map((state) => (
                            <Listbox.Option key={state.name} value={state}>
                              {({ selected, active }) => (
                                <div
                                  className={`${
                                    active
                                      ? 'text-white bg-blue-600'
                                      : 'text-gray-900'
                                  } cursor-default select-none relative py-2 pl-8 pr-4`}
                                >
                                  <span
                                    className={`${
                                      selected ? 'font-semibold' : 'font-normal'
                                    } block truncate`}
                                  >
                                    {state.name}
                                  </span>
                                  {selected && (
                                    <span
                                      className={`${
                                        active ? 'text-white' : 'text-blue-600'
                                      } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                    >
                                      <CheckIcon className="h-5 w-5" />
                                    </span>
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>

          <button
            type="submit"
            className="ml-12 px-6 mt-4 bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://frontend-take-home.fetchrewards.com/form')
  const { occupations, states } = await res.json()

  return {
    props: {
      occupations,
      states,
    },
  }
}

export default Home
