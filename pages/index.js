import useConfig from "../hooks/useConfig";
import useUpdateConfig from "../hooks/useUpdateConfig";
import {useEffect, useState} from "react";

export default function Example() {
  const [data, setData] = useState(null);
  const { data: initialData } = useConfig();
  const { updateConfig, data: updateData } = useUpdateConfig();

  useEffect(() => {
    if (updateData) {
      setData(updateData);
    } else {
        setData(initialData);
    }
  }, [updateData, initialData])

  const handleChange = async ({ e, remote_name, id }) => {
    e.preventDefault();
    let remote_url = null
    if (remote_name === "remote1") {
      remote_url = "https://next-mf-test-remote-1.vercel.app";
    }
    if (remote_name === "remote2") {
      remote_url = "https://next-mf-test-remote-2.vercel.app";
    }
    await updateConfig({remote_name, remote_url, id});
  };
  return (
      <div className="px-4 sm:px-6 lg:px-8 py-24 max-w-6xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Solutions Component Config</h1>
            <p className="mt-2 text-sm text-gray-700">
              Configure components below
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Component Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Remote URL
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Remote Name
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((item) => (
                    <tr key={item.component}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {item.component}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.remote_url}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                            Location
                          </label>
                          <select
                              id="location"
                              name="location"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={item.remote_name}
                              onChange={(e) => {
                                handleChange({
                                  e,
                                  remote_name: e.target.value,
                                    id: item.id
                                })
                              }}
                          >
                            <option>default</option>
                            <option>remote1</option>
                            <option>remote2</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
