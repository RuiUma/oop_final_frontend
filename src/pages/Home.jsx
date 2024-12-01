import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Academic Exchange Platform</h1>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Register
          </button>
        </Link>
      </div>
    </div>
    )
}

export default Home