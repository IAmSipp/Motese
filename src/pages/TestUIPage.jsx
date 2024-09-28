import React from 'react';
import Form from '../components/form.jsx';

export const TestUIPage = () => {
  return (
    <div className='w-screen flex flex-col items-center justify-center min-h-screen space-y-4'>
      <form>  
        <Form placeholder="TEST" name="testInput" size="96" text_size="5/6"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>  
      </form>
    </div>
  );
}

export default TestUIPage;
