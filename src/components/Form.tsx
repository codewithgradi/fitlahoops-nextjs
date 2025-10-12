'use client'
import React, { useState } from 'react';

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

const Form = () => {
  const [formdata, setFormdata] = useState({
    fullName: '',
    email: '',
    role: '',
    reason: '',
  })
  const [isVolunteer, setVolunteer] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const url = isVolunteer ? '/api/volunteers' : '/api/partners';

    const formDataToSend = new FormData();

    // Map frontend keys to backend expected keys
    formDataToSend.append('fullname', formdata.fullName);
    formDataToSend.append('email', formdata.email);

    if (isVolunteer) {
      formDataToSend.append('role', formdata.role);
      formDataToSend.append('reason', formdata.reason); // optional if backend expects
    }

    // Log entries to verify
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await fetch(url, {
      method: 'POST',
      body: formDataToSend,
    });

    if (!res.ok) {
      // const errorData = await res.json();
      // console.error("Backend error:", errorData);
      alert('Submission failed. Check console.');
      return;
    }

    // const data = await res.json();
    // console.log('Success:', data);
    alert('Form submitted successfully!');
    setFormdata({ fullName: '', email: '', role: '', reason: '' });

  } catch (err) {
    console.error('Network error:', err);
    alert('Network error, try again later.');
  }
};


  const handleLabelClick = () => setVolunteer(!isVolunteer);

  const handleChangeForAll = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div id='connect' className="flex justify-center items-center p-2 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-orange-700">
          {isVolunteer ? 'Volunteer With Us' : 'Work with us'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join our team and help make a difference!
        </p>

        <div className="space-y-6">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
            name="fullName"
            value={formdata.fullName}
            onChange={handleChangeForAll}
            required
          />

          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
            name="email"
            value={formdata.email}
            onChange={handleChangeForAll}
            required
          />

          {isVolunteer && (
            <>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-orange-500 focus:border-indigo-500 transition duration-150"
                name="role" 
                value={formdata.role}
                onChange={handleChangeForAll}
                required
              >
                <option value="" disabled hidden>Select your preferred role</option>
                <option value="REFEREE">Referee</option>
                <option value="PHOTOGRAPHER">Photographer</option>
                <option value="LOGISTICS">Logistics</option>
                <option value="FIRST_AID">First AID</option>
                <option value="TECH_SUPPORT">Tech Support</option>
              </select>

              <textarea 
                placeholder="Why do you want to volunteer? (Tell us a little about yourself!)" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none h-32"
                name="reason"
                value={formdata.reason}
                onChange={handleChangeForAll}
                required
              ></textarea>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-200 shadow-md shadow-indigo-300/50"
          >
            {isVolunteer ? 'Submit Application' : 'Connect'}
          </button>

          <p
            onClick={handleLabelClick}
            className='font-bold text-sm text-center underline text-blue-400 hover:cursor-pointer transform hover:scale-105'
          >
            {isVolunteer ? 'Become a sponsor or partner instead' : 'Volunteer with us instead'}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
