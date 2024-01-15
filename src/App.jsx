import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [work, setWork] = useState("");
  const [todo, setTodo] = useState([]);
  const handleAdd = () => {
    if (todo?.some((item) => item.id === work?.replace(/\s/g, ""))) {
      toast.warn("Công việc đã được thêm vào trước đó");
    } else {
      toast.success("success");
      setTodo((prev) => [...prev, { id: work?.replace(/\s/g, ""), job: work }]);
      setWork("");
    }
  };

  const handleDeleteJob = (id) => {
    setTodo((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-500">
        <div className=" bg-white p-5">
          <div className="flex gap-3">
            <input
              type="text"
              className="outline-none border-[2px] border-blue-600 px-4 py-2 w-[400px] rounded"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
            <button
              type="button"
              className="outline-none px-6 py-2 bg-blue-500 ml-3 rounded text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <div>
            <h3 className="font-bold text-xl flex justify-center">content</h3>
            <ul>
              {todo?.map((item) => {
                return (
                  <li key={item.id} className="flex gap-20 items-center">
                    <span className="my-4">{item.job}</span>
                    <span
                      onClick={() => handleDeleteJob(item.id)}
                      className="cursor-pointer p-2 bg-red-500 text-white"
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
}

export default App;
