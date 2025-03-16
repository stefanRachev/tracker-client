<div className="bg-gray-800 p-6 rounded-xl shadow-md">
  <h3 className="text-lg font-bold mb-4">Transaction History</h3>
  <table className="w-full text-sm text-left">
    <thead>
      <tr>
        <th className="px-4 py-2 border-b">Title</th>
        <th className="px-4 py-2 border-b">Amount</th>
        <th className="px-4 py-2 border-b">Date</th>
        <th className="px-4 py-2 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-2 border-b">Food</td>
        <td className="px-4 py-2 border-b text-red-500">-20 lv.</td>
        <td className="px-4 py-2 border-b">2025-03-07</td>
        <td className="px-4 py-2 border-b">
          <button className="text-blue-500">Edit</button>
          <button className="text-red-500 ml-4">Delete</button>
        </td>
      </tr>
      <tr>
        <td className="px-4 py-2 border-b">Transport</td>
        <td className="px-4 py-2 border-b text-red-500">-50 lv.</td>
        <td className="px-4 py-2 border-b">2025-03-06</td>
        <td className="px-4 py-2 border-b">
          <button className="text-blue-500">Edit</button>
          <button className="text-red-500 ml-4">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
