import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside
            className="bg-Deep-navy-blue h-lvh w-1/5"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-Deep-navy-blue">
                <ul className="space-y-2">
                   <Link to='/editor/edit'>
                    <li className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-Steel-blue hover:text-Deep-navy-blue">
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                            </svg>
                            <span className="ml-3 text-Pure-white text-lg capitalize">Watermark Editor</span>
                    </li>
                    </Link>

                    <Link to='/editor/files'>

                    <li className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-Steel-blue hover:text-Deep-navy-blue">
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 50 50">
                                <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"></path>
                            </svg>

                            <span className="ml-3 text-Pure-white text-lg capitalize">Uploaded fIles</span>
                    </li>

                    </Link>

                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
