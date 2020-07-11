import React from 'react'

export const Welcome = () => {
  return <div className="welcome mt-10">
    <div>
      <p className="mb-3 text-lg">Welcome to the OCC Country Grant Tracker!!</p>
      <p className="mb-3">To start using the tracker:</p>
      <ul className="m-1 pl-3">
        <li className="mt-3 list-disc list-inside">Expand the organisation unit tree</li>
        <li className="mt-3 list-disc list-inside">Select the country of your choice</li>
        <li className="mt-3 list-disc list-inside">Once the country is selected, a list of staff enrolling the program will display</li>
        <li className="mt-3 list-disc list-inside">If there are no staff listed, click on the "Register" button to register staff</li>
      </ul>
    </div>
  </div>
}