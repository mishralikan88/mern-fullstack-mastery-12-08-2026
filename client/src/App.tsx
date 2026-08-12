import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive";
}

interface EmployeeForm {
  name: string;
  email: string;
  department: string;
  role: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<EmployeeForm>({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const result = await response.json();

      setEmployees(result.data);
    } catch (error) {
      console.error("Fetch employees error:", error);
      setError("Could not load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      setForm({
        name: "",
        email: "",
        department: "",
        role: "",
      });

      await fetchEmployees();
    } catch (error) {
      console.error("Create employee error:", error);
      setError("Could not create employee");
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>

      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Department</label>

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role</label>

          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Add Employee
        </button>
      </form>

      <hr />

      <h2>Employees</h2>

      {loading && <p>Loading employees...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && employees.length === 0 && (
        <p>No employees found.</p>
      )}

      {!loading && employees.length > 0 && (
        <div>
          {employees.map((employee) => (
            <div key={employee._id}>
              <h3>{employee.name}</h3>

              <p>Email: {employee.email}</p>
              <p>Department: {employee.department}</p>
              <p>Role: {employee.role}</p>
              <p>Status: {employee.status}</p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;